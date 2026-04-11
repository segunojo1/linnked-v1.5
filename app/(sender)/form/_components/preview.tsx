import Image from 'next/image'
import { useFormStore } from '@/store/form.store'
import { Button } from '@/components/ui/button';

const Preview = () => {
    const {setSteps, template, steps, recipientFirstName, setMessageTitle, setRecipientFirstName, messageTitle, message, setMessage} = useFormStore();
    const submitMessage = () => {
        setSteps(steps + 1);
        console.log(messageTitle);
        console.log(recipientFirstName, message);
        
    }
    return (
        <section className='flex flex-col items-center gap-[50px] '>
            <div className='flex mt-20 items-center gap-[50px]'>
            <h2 className={` ${
          messageTitle !== "Title" ? "text-black" : "text-[#00000077]"
        } text-[45px]/[83px] font-semibold `} contentEditable onBlur={(e) => setMessageTitle(e.currentTarget.innerText)}
                >{messageTitle}</h2>
                <div className='py-[7px] px-[13px] gap-[14px] bg-[#f6cfcf59] rounded-[6px] items-center cursor-pointer flex'>
                <Image
                src="/icons/info-square.svg"
                alt="info"
                width={15}
                height={15}
                className="cursor-pointer"
              />
                </div>
            </div>
                <article className='max-w-[805px] relative min-w-full  bg-white pt-[60px] pb-[60px] flex flex-col  h-fit'>
                    <div className='flex mb-[25px] items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Image src='/assets/star.svg' alt='star' className='group-hover:rotate-12 transition-all' width={44} height={44} />
                            <p className='text-[#1e1e1ebf] text-[22px]/[30px] font-bold'>Heyy <span contentEditable onBlur={(e) => setRecipientFirstName(e.currentTarget.innerText)}>{recipientFirstName}</span>,</p>
                        </div>
                        <Image src='/assets/circlee.svg' alt='circle' className='group-hover:rotate-12 transition-all' width={24} height={24} />
                    </div>
                    <Image src='/assets/purplecircle.svg' alt='circle' className='group-hover:rotate-12 transition-all absolute left-6 top-0 bottom-0 my-auto'  width={24} height={24}/>
                    <Image src='/assets/yellowcircle.svg' alt='circle' className='group-hover:rotate-12 transition-all absolute bottom-56 right-7' width={24} height={24}/>
                    <div className='bg-[#FFF3F3] h-full p-[70px] flex flex-col items-center'>

                        <p className='text-[15px]/[21px] font-medium noto-sans' contentEditable onBlur={(e) => setMessage(e.currentTarget.innerText)}>{message}</p>

                        <p className='text-[73px]/[87px] font-normal -rotate-[7deg] mt-[32px] indie-flower'>Segun</p>
                    </div>
                    <Image src='/assets/yesno.svg' alt='circle' className='group-hover:rotate-12 transition-all self-end mt-[37px]' width={243} height={40} />
                </article>
            <Button onClick={submitMessage}  disabled={template == ''} className='text-black mx-auto mb-[42px] hover:text-white w-[107px] bg-[#FFFFFF] py-[10px] px-5 flex items-center gap-[10px]'>Enter <Image src='/icons/arrow-up.svg' alt='arrow' className='group-hover:rotate-12 transition-all' width={20} height={20} /></Button>
        </section>
    )
}

export default Preview