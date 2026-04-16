"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFormStore } from "@/store/form.store";
import Image from "next/image";
import confetti from "canvas-confetti";
import { formatMessage } from "@/helpers/format-message";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";

const Share = () => {
  const { formDone } = useFormStore();

  switch (formDone) {
    case false:
      return <ShareFirst />;
      break;
    case true:
      return <ShareSecond />;
      break;
    default:
      break;
  }
};

export default Share;

const ShareFirst = () => {
  const {
    template,
    recipientFirstName,
    senderFirstName,
    messageTitle,
    message,
    setFormDone,
  } = useFormStore();

  const submitMessage = () => {
    // setSteps(steps + 1);
    setFormDone(true);
  };
  return (
    <section className="flex flex-col items-center gap-[50px]">
      <div className="flex md:flex-row flex-col mt-20 items-center gap-[50px]">
        <h2 className={` text-[45px]/[83px] font-semibold `}>{messageTitle}</h2>
        <div className="py-[7px] px-[13px] gap-[14px] bg-[#f6cfcf59] rounded-[6px] items-center cursor-pointer flex">
          <Image
            src="/icons/info-square.svg"
            alt="info"
            width={15}
            height={15}
            className="cursor-pointer"
          />
          <p className="text-[10px] noto-sans">Use AI</p>
        </div>
      </div>
      <article className="max-w-[805px] relative w-full  bg-white md:pt-[60px] pt-[30px] pb-[60px] flex flex-col h-fit">
        <div className="flex mb-[25px] items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/star.svg"
              alt="star"
              className="group-hover:rotate-12 transition-all"
              width={44}
              height={44}
            />
            <p className="text-[#1e1e1ebf] text-[22px]/[30px] font-bold">
              Heyy {recipientFirstName},
            </p>
          </div>
          <Image
            src="/assets/circlee.svg"
            alt="circle"
            className="group-hover:rotate-12 transition-all"
            width={24}
            height={24}
          />
        </div>
        <Image
          src="/assets/purplecircle.svg"
          alt="circle"
          className="group-hover:rotate-12 transition-all absolute left-6 top-0 bottom-0 my-auto"
          width={24}
          height={24}
        />
        <Image
          src="/assets/yellowcircle.svg"
          alt="circle"
          className="group-hover:rotate-12 transition-all absolute bottom-56 right-7"
          width={24}
          height={24}
        />
        <div className="bg-[#FFF3F3] h-full md:p-[70px] p-[30px] flex flex-col items-center">
          <p className="text-[15px]/[21px] font-medium noto-sans">
            {formatMessage(message).map((para, index) => (
              <p key={index} className="mb-3">
                {para}
              </p>
            ))}
          </p>

          <p className="text-[73px]/[87px] font-normal -rotate-[7deg] mt-[32px] indie-flower">
            {senderFirstName}
          </p>
        </div>
        <Image
          src="/assets/yesno.svg"
          alt="circle"
          className="group-hover:rotate-12 transition-all self-center md:self-end mt-[37px]"
          width={243}
          height={40}
        />
      </article>
      <Button
        onClick={submitMessage}
        disabled={template == ""}
        className="text-black mx-auto mb-[42px] hover:text-white w-[107px] bg-[#d3c2c2] py-[10px] px-5 flex items-center gap-[10px]"
      >
        Enter{" "}
        <Image
          src="/icons/arrow-up.svg"
          alt="arrow"
          className="group-hover:rotate-12 transition-all"
          width={20}
          height={20}
        />
      </Button>
    </section>
  );
};

export const ShareSecond = () => {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });
  }, []);
  const { link } = useFormStore();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://linnked.vercel.app${link}`);
      setCopied(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const captureRef = useRef<HTMLElement | null>(null);

  const { recipientFirstName, senderFirstName, message } = useFormStore();
  const [download, setDownload] = useState(false);
  const handleDownload = async () => {
    if (!captureRef.current) return;

    try {
      setDownload(true);

      const exportNode = captureRef.current;
      const previousInlineStyle = exportNode.getAttribute("style") ?? "";

      // Keep the node renderable for DOM-to-image while still hidden from the user.
      exportNode.style.left = "0";
      exportNode.style.top = "0";
      exportNode.style.position = "fixed";
      exportNode.style.zIndex = "-1";
      exportNode.style.opacity = "1";
      exportNode.style.pointerEvents = "none";

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const imagesInNode = Array.from(exportNode.querySelectorAll("img"));
      await Promise.all(
        imagesInNode.map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) {
                resolve();
                return;
              }

              const done = () => resolve();
              img.addEventListener("load", done, { once: true });
              img.addEventListener("error", done, { once: true });
            }),
        ),
      );

      const image = await toPng(exportNode, {
        cacheBust: true,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        backgroundColor: "#ffffff",
        skipAutoScale: true,
        canvasWidth: 850,
        canvasHeight: 1200,
      });

      const linkEl = document.createElement("a");
      linkEl.href = image;
      linkEl.download = `${recipientFirstName || "message"}.png`;
      document.body.appendChild(linkEl);
      linkEl.click();
      document.body.removeChild(linkEl);

      exportNode.setAttribute("style", previousInlineStyle);
    } catch (error) {
      console.error("Failed to download image:", error);
    } finally {
      if (captureRef.current) {
        captureRef.current.style.left = "-9999px";
        captureRef.current.style.top = "0";
        captureRef.current.style.position = "fixed";
        captureRef.current.style.zIndex = "";
        captureRef.current.style.opacity = "1";
      }
      setDownload(false);
    }
  };

  const images = [
    {
      src: "/assets/lovee.svg",
      alt: "love",
      className: "md:top-[26%] top-[15%] md:left-2 left-5 md:w-[59px] w-[45px]",
      width: 59,
      height: 48,
    },
    {
      src: "/assets/maill.svg",
      alt: "mail",
      className: "top-[13%] left-[35%] md:w-[71px] w-[42px]",
      width: 71,
      height: 71,
    },
    {
      src: "/assets/link.svg",
      alt: "link",
      className:
        "md:top-[15%] top-[85%] md:right-[30%] right-[80%] md:w-[65px] w-[51px] ",
      width: 65,
      height: 65,
    },
    {
      src: "/assets/beaa.svg",
      alt: "bea",
      className:
        "md:top-[10%] top-[85%] md:right-[10%] right-[15%] md:w-[99px] w-[48px] ",
      width: 99,
      height: 195,
    },
    {
      src: "/assets/heartt.svg",
      alt: "heartt",
      className: "md:top-[30%] top-[10%] md:right-[5%] right-[10%]",
      width: 59,
      height: 48,
    },
  ];

  return (
    <section className="relative flex h-full w-full flex-col px-3 overflow-hidden">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center pt-10">
        <h1 className="text-[42px]/[100%] font-normal z-[999999] relative text-black font-pp-mondwest">
          Your Message for{" "}
          <span className="font-pp-neuebit text-[50px] font-bold">
            {recipientFirstName}
          </span>{" "}
          is ready
        </h1>
        <p className="mt-6 max-w-[547px] text-[30px]/[100%] font-bold noto-sans">
          Now it’s time to send it and make their day a little sweeter. Copy and
          send your personalized Valentine’s message to them.
        </p>
        {/* <p className='mt-4 text-[18px] md:text-[25px] font-semibold text-center text-black/70 break-all'>
                    {link}
                </p> */}
      </div>

      <div className="mx-auto mt-10 flex  w-full items-center justify-center max-w-6xl gap-5 md:grid-cols-2">
        <button
          type="button"
          onClick={handleDownload}
          disabled={download}
          className="group w-[300px] relative overflow-hidden rounded-[24px] border border-[#ead7d7] bg-[#FFF7F7] p-5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.08)] disabled:cursor-not-allowed disabled:opacity-80"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.9),transparent_45%)]" />
          <div className="relative flex h-[180px] flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/80 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.18em] text-black/60">
                Export
              </span>
              <Image src="/assets/disk.svg" alt="" width={62} height={62} />
            </div>
            <div>
              <p className="text-[28px]/[100%] font-pp-neuebit text-black">
                {download ? "Downloading…" : "Download Image"}
              </p>
              <p className="mt-2 max-w-[260px] text-[14px]/[20px] font-medium text-black/60">
                Creates a clean PNG of the final card for sharing or saving.
              </p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="group w-[300px] relative overflow-hidden rounded-[24px] border border-[#ead7d7] bg-[#FFF7F7] p-5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.08)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.9),transparent_45%)]" />
          <div className="relative flex h-[180px] flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/80 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.18em] text-black/60">
                Share
              </span>
              <Image src="/assets/link.svg" alt="" width={62} height={62} />
            </div>
            <div>
              <p className="text-[28px]/[100%] font-pp-neuebit text-black">
                {copied ? "Copied!" : "Copy Link"}
              </p>
              <p className="mt-2 max-w-[260px] text-[14px]/[20px] font-medium text-black/60">
                Copy the share link and send it directly.
              </p>
            </div>
          </div>
        </button>
      </div>

      <section
        ref={captureRef}
        data-capture-root
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: "850px",
          minHeight: "1200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "16px",
          paddingRight: "16px",
          backgroundImage: "url('/assets/bg3.webp')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          color: "#111827",
          pointerEvents: "none",
          fontFamily: "American Typewriter, serif",
        }}
        aria-hidden="true"
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            style={{
              position: "absolute",
              ...Object.fromEntries(
                img.className
                  .split(" ")
                  .map((token) => token.trim())
                  .filter(Boolean)
                  .flatMap((token) => {
                    if (token.startsWith("md:")) return [];
                    if (token.startsWith("top-["))
                      return [["top", token.slice(5, -1)]];
                    if (token.startsWith("left-["))
                      return [["left", token.slice(6, -1)]];
                    if (token.startsWith("right-["))
                      return [["right", token.slice(7, -1)]];
                    if (token.startsWith("bottom-["))
                      return [["bottom", token.slice(8, -1)]];
                    if (token.startsWith("md:w-[") || token.startsWith("w-["))
                      return [
                        ["width", token.slice(token.indexOf("[") + 1, -1)],
                      ];
                    return [];
                  }),
              ),
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              style={{ animation: "none", transition: "none" }}
              draggable={false}
              loading="eager"
              decoding="sync"
            />
          </div>
        ))}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "50px",
            width: "100%",
            paddingLeft: "40px",
            paddingRight: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              marginTop: "80px",
              alignItems: "center",
              gap: "50px",
            }}
          >
            <h2
              style={{
                fontSize: "45px",
                lineHeight: "83px",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Message
            </h2>
          </div>
          <article
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "805px",
              paddingLeft: "30px",
              paddingRight: "30px",
              paddingTop: "60px",
              paddingBottom: "30px",
              background: "#ffffff",
              boxShadow: "0 10px 25px rgba(0,0,0,0.14)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                marginBottom: "25px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <img
                  src="/assets/star.svg"
                  alt="star"
                  width={44}
                  height={44}
                  draggable={false}
                  loading="eager"
                  decoding="sync"
                />
                <p
                  style={{
                    color: "#1e1e1ebf",
                    fontSize: "22px",
                    lineHeight: "30px",
                    fontWeight: 700,
                  }}
                >
                  Heyy {recipientFirstName},
                </p>
              </div>
              <img
                src="/assets/circlee.svg"
                alt="circle"
                width={24}
                height={24}
                draggable={false}
                loading="eager"
                decoding="sync"
              />
            </div>
            <img
              src="/assets/purplecircle.svg"
              alt="circle"
              width={24}
              height={24}
              draggable={false}
              loading="eager"
              decoding="sync"
              style={{
                position: "absolute",
                left: "24px",
                top: "0",
                bottom: "0",
                margin: "auto",
              }}
            />
            <img
              src="/assets/yellowcircle.svg"
              alt="circle"
              width={24}
              height={24}
              draggable={false}
              loading="eager"
              decoding="sync"
              style={{ position: "absolute", right: "28px", bottom: "224px" }}
            />
            <div
              style={{
                background: "#FFF3F3",
                height: "100%",
                padding: "70px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "15px",
                  lineHeight: "21px",
                  fontWeight: 500,
                  fontFamily: "Noto Sans, sans-serif",
                }}
              >
                {formatMessage(message).map((para, index) => (
                  <p key={index} style={{ marginBottom: "12px" }}>
                    {para}
                  </p>
                ))}
              </div>

              <p
                style={{
                  fontSize: "73px",
                  lineHeight: "87px",
                  fontWeight: 400,
                  transform: "rotate(-7deg)",
                  marginTop: "32px",
                  fontFamily: "Indie Flower, cursive",
                }}
              >
                {senderFirstName}
              </p>
            </div>
          </article>
        </div>
      </section>

      <p className="text-[30px] text-center mt-9">{`https://linnked.vercel.app${link}`}</p>
      {/* <Image src='/assets/done.svg' alt='' width={174} height={174} className='cursor-pointer absolute top-96 right-48' /> */}

      <Image
        src="/assets/abstract.svg"
        alt=""
        width={241}
        height={259}
        className="cursor-pointer absolute  bottom-0 right-0"
      />
    </section>
  );
};
