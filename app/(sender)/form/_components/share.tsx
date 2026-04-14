'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useFormStore } from '@/store/form.store';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { formatMessage } from '@/helpers/format-message';
import html2canvas from 'html2canvas';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';


const Share = () => {
    const { formDone } = useFormStore();

    switch (formDone) {
        case false:
            return (<ShareFirst />)
            break;
        case true:
            return (<ShareSecond />)
            break;
        default:
            break;
    }
}

export default Share

const ShareFirst = () => {
    const { template, recipientFirstName, senderFirstName, messageTitle, message, setFormDone } = useFormStore();

    const submitMessage = () => {
        // setSteps(steps + 1);
        setFormDone(true);
    }
    return (
        <section className='flex flex-col items-center gap-[50px]'>
            <div className='flex md:flex-row flex-col mt-20 items-center gap-[50px]'>
                <h2 className={` text-[45px]/[83px] font-semibold `}>{messageTitle}</h2>
                <div className='py-[7px] px-[13px] gap-[14px] bg-[#f6cfcf59] rounded-[6px] items-center cursor-pointer flex'>
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
            <article className='max-w-[805px] relative w-full  bg-white md:pt-[60px] pt-[30px] pb-[60px] flex flex-col h-fit'>
                <div className='flex mb-[25px] items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Image src='/assets/star.svg' alt='star' className='group-hover:rotate-12 transition-all' width={44} height={44} />
                        <p className='text-[#1e1e1ebf] text-[22px]/[30px] font-bold'>Heyy {recipientFirstName},</p>
                    </div>
                    <Image src='/assets/circlee.svg' alt='circle' className='group-hover:rotate-12 transition-all' width={24} height={24} />
                </div>
                <Image src='/assets/purplecircle.svg' alt='circle' className='group-hover:rotate-12 transition-all absolute left-6 top-0 bottom-0 my-auto' width={24} height={24} />
                <Image src='/assets/yellowcircle.svg' alt='circle' className='group-hover:rotate-12 transition-all absolute bottom-56 right-7' width={24} height={24} />
                <div className='bg-[#FFF3F3] h-full md:p-[70px] p-[30px] flex flex-col items-center'>

                    <p className='text-[15px]/[21px] font-medium noto-sans'>{formatMessage(message).map((para, index) => (
                        <p key={index} className="mb-3">{para}</p>
                    ))}</p>

                    <p className='text-[73px]/[87px] font-normal -rotate-[7deg] mt-[32px] indie-flower'>{senderFirstName}</p>
                </div>
                <Image src='/assets/yesno.svg' alt='circle' className='group-hover:rotate-12 transition-all self-center md:self-end mt-[37px]' width={243} height={40} />
            </article>
            <Button onClick={submitMessage} disabled={template == ''} className='text-black mx-auto mb-[42px] hover:text-white w-[107px] bg-[#d3c2c2] py-[10px] px-5 flex items-center gap-[10px]'>Enter <Image src='/icons/arrow-up.svg' alt='arrow' className='group-hover:rotate-12 transition-all' width={20} height={20} /></Button>
        </section>
    )
}

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

    const captureRef = useRef(null);
    useEffect(() => {
        console.log("CaptureRef in ShareSecond:", captureRef?.current);
    }, [captureRef]);


    const { recipientFirstName, senderFirstName, message } = useFormStore();
    const [download, setDownload] = useState(false);
    const handleDownload = async () => {

        if (captureRef?.current) {
            setDownload(true);
            const canvas = await html2canvas(captureRef.current);
            const image = canvas.toDataURL("image/png");
            
            const link = document.createElement("a");
            link.href = image;
            link.download = `${recipientFirstName}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setDownload(false);
        }
    };

    const images = [
        { src: "/assets/lovee.svg", alt: "love", className: "md:top-[26%] top-[15%] md:left-2 left-5 md:w-[59px] w-[45px]", width: 59, height: 48 },
        { src: "/assets/maill.svg", alt: "mail", className: "top-[13%] left-[35%] md:w-[71px] w-[42px]", width: 71, height: 71 },
        { src: "/assets/linkk.svg", alt: "link", className: "md:top-[15%] top-[85%] md:right-[30%] right-[80%] md:w-[65px] w-[51px] ", width: 65, height: 65 },
        { src: "/assets/beaa.svg", alt: "bea", className: "md:top-[10%] top-[85%] md:right-[10%] right-[15%] md:w-[99px] w-[48px] ", width: 99, height: 195 },
        { src: "/assets/heartt.svg", alt: "heartt", className: "md:top-[30%] top-[10%] md:right-[5%] right-[10%]", width: 59, height: 48 },
    ];

    const imageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" }, // Staggered delay
        }),
    };

    return (
        <section className='flex flex-col px-3  h-full'>
            <h1 className='text-[42px]/[100%] font-normal mb-[95px] z-[999999] relative text-black mt-10 text-center font-pp-mondwest'>Your Message for <span className='font-pp-neuebit text-[50px] font-bold'>{recipientFirstName}</span> is ready</h1>
            <p className='text-[30px]/[100%] noto-sans font-bold max-w-[547px]  mb-[50px] text-center '>Now, it’s time to send it and make their day a little sweeter. Copy and send your personalized Valentine’s message to them. Let’s see if they say yes! Goodluck!!</p>
            <p className='md:text-[25px] text-[18px] font-semibold text-center'>{link}</p>
            <div className='flex items-center gap-[10px] mx-auto relative overflow-hidden'>
                <Dialog>
                    <DialogTrigger>
                        <div onClick={handleDownload} className='focus:border-[#fdadad] focus:border-2 bg-[#FFF3F3] flex flex-col gap-[17px] items-center justify-center p-5 rounded-[10px] w-[214px] h-[140px] cursor-pointer'>
                            <Image src='/assets/disk.svg' alt='' width={70} height={70} />
                            <p className='text-[20px]/[100%]'>Download Image </p>
                        </div>
                    </DialogTrigger>
                    <DialogContent className='flex flex-col !max-w-[800px] md:px-[85px]'>
                        <article className='font-american max-w-[805px] relative w-full  bg-white md:pt-[60px] pt-[30px] pb-[30px] flex flex-col min-h-full'>
                            <div className='flex mb-[25px] items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Image src='/assets/star.svg' alt='star' className='group-hover:rotate-12 transition-all' width={44} height={44} />
                                    <p className='text-[#1e1e1ebf] text-[22px]/[30px] font-bold'>Heyy {recipientFirstName},</p>
                                </div>
                                <Image src='/assets/circlee.svg' alt='circle' className='group-hover:rotate-12 transition-all' width={24} height={24} />
                            </div>
                            <Image src='/assets/purplecircle.svg' alt='circle' className='group-hover:rotate-12 transition-all absolute left-6 top-0 bottom-0 my-auto' width={24} height={24} />
                            <Image src='/assets/yellowcircle.svg' alt='circle' className='group-hover:rotate-12 transition-all absolute bottom-56 right-7' width={24} height={24} />
                            <div className='bg-[#FFF3F3] h-full md:p-[70px] p-[30px] flex flex-col items-center'>

                                <p className='text-[15px]/[21px] font-medium noto-sans'>{formatMessage(message).map((para, index) => (
                                    <p key={index} className="mb-3">{para}</p>
                                ))}</p>

                                <p className='text-[73px]/[87px] font-normal -rotate-[7deg] mt-[32px] indie-flower'>{senderFirstName}</p>
                            </div>
                        </article>
                        <div onClick={handleDownload} className='focus:border-[#fdadad] self-center md:self-end focus:border-2 bg-[#FFF3F3] flex flex-col gap-[17px] items-start justify-end p-5 rounded-[10px] w-[170px] h-[113px] cursor-pointer'>
                            <Image src='/assets/disk.svg' alt='' width={33} height={33} />
                            <p className='text-base/[auto]'>{download ? 'Downloading..' : 'Download Image'}</p>
                        </div>
                    </DialogContent>
                </Dialog>
                <div onClick={handleCopy} className='focus:border-[#fdadad] focus:border-2 bg-[#FFF3F3] flex flex-col gap-[17px] items-center justify-center p-5 rounded-[10px] w-[214px] h-[140px]  cursor-pointer'>
                    <Image src='/assets/link.svg' alt='' width={80} height={80} />
                    <p className="text-[20px]/[100%]">
                        {copied ? "Copied!" : "Copy Link"}
                    </p>
                </div>


                <section ref={captureRef} className="font-american min-w-[850px] absolute left-[1999px] top-[1999px]  flex px-4 bg-cover bg-no-repeat flex-col bg items-center  text-black justify-center bg-[url('/lovebg.svg')] ">
                    {images.map((img, i) => (
                        <motion.div
                            key={img.src}
                            className={`absolute ${img.className}`}
                            custom={i}
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ ease: "easeOut", type: "spring", duration: 0.3, damping: 90 }}
                            drag
                            dragTransition={{ power: 0.1 }}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={img.width}
                                height={img.height}
                                className="group-hover:rotate-12 transition-all animate-pulse"
                                draggable={false}
                            />
                        </motion.div>
                    ))}
                    <div className='font-american  flex flex-col items-center gap-[50px] w-full px-[40px]'>
                        <div className='flex mt-20 items-center gap-[50px]'>
                            <h2 className={` text-[45px]/[83px]  font-semibold text-center md:text-start `}>Valentine&apos;s Message</h2>
                        </div>
                        <article className='z-[999999] font-american max-w-[805px] relative w-full px-[30px] shadow-lg bg-white md:pt-[60px] pt-[30px] pb-[30px] flex flex-col min-h-full'>
                            <div className='flex mb-[25px] items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Image src='/star.svg' alt='star' className='group-hover:rotate-12 transition-all' width={44} height={44} />
                                    <p className='text-[#1e1e1ebf] text-[22px]/[30px] font-bold'>Heyy {recipientFirstName},</p>
                                </div>
                                <Image src='/circlee.svg' alt='circle' className='group-hover:rotate-12 transition-all' width={24} height={24} />
                            </div>
                            <Image src='/purplecircle.svg' alt='circle' className='group-hover:rotate-12 transition-all absolute left-6 top-0 bottom-0 my-auto' width={24} height={24} />
                            <Image src='/yellowcircle.svg' alt='circle' className='group-hover:rotate-12 transition-all absolute bottom-56 right-7' width={24} height={24} />
                            <div className='bg-[#FFF3F3] h-full p-[70px] flex flex-col items-center'>

                                <p className='text-[15px]/[21px] font-medium noto-sans'>{formatMessage(message).map((para, index) => (
                                    <p key={index} className="mb-3">{para}</p>
                                ))}</p>

                                <p className='text-[73px]/[87px] font-normal -rotate-[7deg] mt-[32px] indie-flower'>{senderFirstName}</p>
                            </div>
                        </article>
                    </div>
                </section>
            </div >
            <p className='text-[30px]'>{`https://linnked.vercel.app${link}`}</p>
            <Image src='/assets/done.svg' alt='' width={174} height={174} className='cursor-pointer absolute top-96 right-48' />

            <Image src='/assets/abstract.svg' alt='' width={241} height={259} className='cursor-pointer absolute  bottom-0 right-0' />
        </section >
    )
}
