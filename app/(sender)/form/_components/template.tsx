import Image from "next/image";
import { useFormStore } from "@/store/form.store";
import { Button } from "@/components/ui/button";

const Template = () => {
  const { template, setSteps, steps } = useFormStore();

  return (
    <section className="flex flex-col items-center gap-[50px] h-full max-h-screen mt-[45px]">
      <h2 className="text-[50px]/[100%] font-normal font-pp-mondwest">
        Choose a <span className="font-bold font-pp-neuebit">Template</span>
      </h2>
      <div className="flex gap-[17px]">
        <SinglePageTemplate comingSoon />
        <MultiPageTemplate comingSoon />
        <NewTemplate />
      </div>
      <Button
        onClick={() => setSteps(steps + 1)}
        disabled={template == ""}
        className="text-black mx-auto hover:text-white w-[107px] bg-[#FFF3F3] py-[10px] px-5 flex items-center gap-[10px]"
      >
        Enter
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

export default Template;

const SinglePageTemplate = ({
  comingSoon = false,
}: {
  comingSoon?: boolean;
}) => {
  const { template, setTemplate, senderFirstName } = useFormStore();
  return (
    <div
      className={[
        "relative rounded-xl",
        template == "singlepage" && !comingSoon
          ? "border-[4px] border-black p-3"
          : "",
      ].join(" ")}
      onClick={() => {
        if (!comingSoon) setTemplate("singlepage");
      }}
    >
      <div
        className={[
          "flex flex-col gap-[10px] max-w-[345px]",
          comingSoon ? "cursor-not-allowed opacity-90" : "cursor-pointer",
        ].join(" ")}
      >
        <div className="p-2 bg-[#FAF9F5] flex rounded-[14.55px] min-h-[388px] h-full ">
          <div className=" p-5 flex flex-col justify-between rounded-[14.55px] bg-[#d9d9d928] min-h-full border border-[#ffffff]">
            <div className="bg-[url('/assets/love2.png')] bg-[#FFF3F3] bg-contain bg-no-repeat h-fit pt-[31px] px-[51px]">
              <h3 className="text-[8px]/[16px] font-semibold text-center">
                A Little Something for You… 💌
              </h3>
              <article className="px-[15px] bg-white pt-[30px] pb-[11px] flex flex-col min-h-full">
                <div className="flex mb-[5px] items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src="/assets/star.svg"
                      alt="star"
                      className="group-hover:rotate-12 transition-all"
                      width={9}
                      height={9}
                    />
                    <p className="text-[#1e1e1ebf] text-[4.45px] font-bold">
                      Heyy Love,
                    </p>
                  </div>
                  <Image
                    src="/assets/circlee.svg"
                    alt="circle"
                    className="group-hover:rotate-12 transition-all"
                    width={5}
                    height={5}
                  />
                </div>
                <div className="bg-[#FFF3F3] h-full p-[15px] flex flex-col items-center">
                  <p className="text-[3px] font-medium noto-sans">
                    I never expected you. I never planned for this. But somehow,
                    you walked into my life, and suddenly, everything felt
                    different—better, brighter, warmer. <br />
                    There’s a kind of magic in the way you exist, effortlessly
                    turning ordinary moments into something worth remembering.{" "}
                    <br />
                    The way you laugh, the way your eyes light up when you talk
                    about something you love—I notice all of it. And every time
                    I do, I feel grateful. Because in a world of billions, I get
                    to know you, and that alone feels like a gift. <br />
                    I don’t always have the perfect words to explain how much
                    you mean to me. But if I could bottle up the way you make me
                    feel, I’d never run out of reasons to smile. Even the quiet
                    moments with you feel like they matter more. <br />
                    And maybe that’s why I’m writing this now—because I don’t
                    want to let another moment pass without telling you how
                    special you are. Some things in life deserve to be said out
                    loud, and this is one of them. <br />I don’t know what
                    tomorrow holds, but I do know what I want right now. So,
                    here goes… Will you be my Valentine? 💕
                  </p>

                  <p className="text-[14px/[120%] font-normal -rotate-12 mt-[6px] indie-flower">
                    {senderFirstName}
                  </p>
                </div>
                <Image
                  src="/assets/yesno.svg"
                  alt="circle"
                  className="group-hover:rotate-12 transition-all self-end mt-[7px]"
                  width={48}
                  height={7}
                />
              </article>
            </div>

            <h2 className="text-[42px]/[100%] mt-[13px] font-normal font-pp-mondwest -tracking-[4%]">
              One Pager (Love)
            </h2>
          </div>
        </div>
      </div>
      {comingSoon ? (
        <div className="absolute inset-0 z-30 rounded-xl bg-black/35 backdrop-blur-[2px] flex items-center justify-center">
          <div className="bg-[#FFF3F3] text-black font-pp-neuebit font-bold text-[22px]/[100%] px-4 py-2 rounded-full">
            Coming Soon
          </div>
        </div>
      ) : null}
    </div>
  );
};

const MultiPageTemplate = ({
  comingSoon = false,
}: {
  comingSoon?: boolean;
}) => {
  const { template, setTemplate, senderFirstName } = useFormStore();
  return (
    <div
      className={[
        "relative rounded-xl",
        template == "multipage" && !comingSoon
          ? "border-[4px] border-black p-3"
          : "",
      ].join(" ")}
      onClick={() => {
        if (!comingSoon) setTemplate("multipage");
      }}
    >
      <div
        className={[
          "flex flex-col gap-[10px] max-w-[343px]",
          comingSoon ? "cursor-not-allowed opacity-90" : "cursor-pointer",
        ].join(" ")}
      >
        <div className="p-2 bg-[#FAF9F5] rounded-[14.55px] flex min-h-[388px] h-full">
          <div className=" p-5 px-[38px] flex flex-col justify-between border-[#ffffff] border  rounded-[14.55px] bg-[#d9d9d928]">
            <article className="px-[25px] bg-white pt-[30px] pb-[11px] flex flex-col h-fit">
              <div className="flex mb-[5px] items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src="/assets/star.svg"
                    alt="star"
                    className="group-hover:rotate-12 transition-all"
                    width={9}
                    height={9}
                  />
                  <p className="text-[#1e1e1ebf] text-[4.45px] font-bold">
                    Heyy Love,
                  </p>
                </div>
                <Image
                  src="/assets/circlee.svg"
                  alt="circle"
                  className="group-hover:rotate-12 transition-all"
                  width={5}
                  height={5}
                />
              </div>
              <div className="bg-[#FFF3F3] h-full p-[20px] flex flex-col items-center">
                <p className="text-[4px]/[6px] font-medium noto-sans">
                  I never expected you. I never planned for this. But somehow,
                  you walked into my life, and suddenly, everything felt
                  different—better, brighter, warmer. <br /> <br />
                  There’s a kind of magic in the way you exist, effortlessly
                  turning ordinary moments into something worth remembering.{" "}
                  <br /> <br />
                  The way you laugh, the way your eyes light up when you talk
                  about something you love—I notice all of it. And every time I
                  do, I feel grateful. Because in a world of billions, I get to
                  know you, and that alone feels like a gift. <br /> <br />
                  I don’t always have the perfect words to explain how much you
                  mean to me. But if I could bottle up the way you make me feel,
                  I’d never run out of reasons to smile. Even the quiet moments
                  with you feel like they matter more. <br /> <br />
                  And maybe that’s why I’m writing this now—because I don’t want
                  to let another moment pass without telling you how special you
                  are. Some things in life deserve to be said out loud, and this
                  is one of them. <br /> <br />I don’t know what tomorrow holds,
                  but I do know what I want right now. So, here goes… Will you
                  be my Valentine? 💕
                </p>

                <p className="text-[14px/[120%] font-normal -rotate-12 mt-[6px] indie-flower">
                  {senderFirstName}
                </p>
              </div>
              <Image
                src="/assets/yesno.svg"
                alt="circle"
                className="group-hover:rotate-12 transition-all self-end mt-[7px]"
                width={48}
                height={7}
              />
            </article>

            <h2 className="text-[42px]/[100%] mt-[13px] font-normal font-pp-mondwest -tracking-[4%]">
              Multi-Paged
            </h2>
          </div>
        </div>
      </div>
      {comingSoon ? (
        <div className="absolute inset-0 z-30 rounded-xl bg-black/35 backdrop-blur-[2px] flex items-center justify-center">
          <div className="bg-[#FFF3F3] text-black font-pp-neuebit font-bold text-[22px]/[100%] px-4 py-2 rounded-full">
            Coming Soon
          </div>
        </div>
      ) : null}
    </div>
  );
};

const NewTemplate = () => {
  const { template, setTemplate, senderFirstName } = useFormStore();
  return (
    <div
      className={
        template == "new" ? "border-[4px] border-black rounded-xl p-3" : ""
      }
      onClick={() => setTemplate("new")}
    >
      <div className="flex flex-col gap-[10px] max-w-[378px]  cursor-pointer">
        <div className="p-2 bg-[#FAF9F5] rounded-[14.55px] flex min-h-[388px] h-full">
          <div className=" p-5  flex flex-col items-center justify-between border-[#ffffff] border  rounded-[14.55px] bg-[#d9d9d928]">
            <Image
              src="/assets/newtemplate.svg"
              alt="new template"
              width={187}
              height={267}
            />

            <h2 className="text-[42px]/[100%] mt-[13px] font-normal font-pp-mondwest -tracking-[4%]">
              One Pager (Subtle)
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
