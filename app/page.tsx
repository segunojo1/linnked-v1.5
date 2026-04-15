import { initialHeaderIcons } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="py-[15px] px-5">
      <div className="flex border border-[#F0F0EF] rounded-[25px]">
        <Sidebar />
        <main className="w-full">
          <div className="w-full flex flex-col items-center relative">
            <Link
              href="/form"
              className="absolute right-12 z-[9999999] top-[35px] cursor-pointer flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] "
            >
              Send your Linnk
              <Image
                src="/assets/left-arrow.svg"
                alt="Back"
                width={17}
                height={17}
                className="rotate-180"
              />
            </Link>
            <h1 className="text-[50px]/[100%] font-bold font-pp-neuebit text-center mt-[46px]">
              Linnked
            </h1>
            <div className="flex flex-col items-center justify-content max-w-[656px] mt-[220px]">
              <p className="text-[50px]/[100%] -tracking-[2%] font-pp-mondwest mb-[40px] text-center">
                Send a message they’ll never forget.
              </p>
              <p className="text-[35px]/[100%] font-pp-neuebit font-bold mb-[50px] text-center">
                Send cute, romantic, or heartfelt messages through a beautiful
                interactive link. Starting with Valentine.
              </p>
              <Link
                href="/form"
                className="absolute right-12 z-[9999999] top-[35px] cursor-pointer flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] "
              >
                Send your Linnk
                <Image
                  src="/assets/left-arrow.svg"
                  alt="Back"
                  width={17}
                  height={17}
                  className="rotate-180"
                />
              </Link>
            </div>

            <Image
              src="/assets/flower.svg"
              alt="flower"
              width={153}
              height={153}
              className="absolute right-0 bottom-0"
            />
          </div>

          <div className=" bg-[url('/assets/bg-flowerss.png')] rounded-[20px] pt-[33px] pb-[48px] mx-6 mb-5 flex flex-col items-center bg-cover bg-center border border-[#F0F0EF]">
            <h2 className="text-[35px]/[100%] mb-[25px] text-white -tracking-[2%] font-normal font-pp-mondwest ">
              When love and code meets...
            </h2>
            <div className="flex items-center gap-6.25">
              {initialHeaderIcons.map((icon, index) => (
                <button
                  key={`${icon.alt}-${index}`}
                  type="button"
                  className="relative group"
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    height={icon.height}
                    width={icon.width}
                  />
                  <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 flex -translate-x-1/2 flex-col items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    <span className="whitespace-nowrap rounded-full bg-[#F6EDEC] px-3 py-1 text-[20px] leading-none text-black shadow-sm">
                      Click to Open -&gt;
                    </span>
                    {icon.note ? (
                      <span className="max-w-56 rounded-[10px] border-[.5px] border-[#E5E5E5] bg-[#FFFFFF1A] px-3 py-2 text-center text-[18px] leading-[1.05] text-stone-900 shadow-sm whitespace-pre-wrap wrap-break-word">
                        {icon.note}
                      </span>
                    ) : null}
                  </div>
                </button>
              ))}
            </div>

            <Image
              src="/assets/messagee.png"
              alt="message"
              width={393}
              height={519}
              className="mt-[67px]"
            />
          </div>

          <div className="h-[524px] border border-[#F0F0EF] flex items-center justify-center relative">
            <h2 className="text-[100px]/[100%] font-bold font-pp-neuebit">
              How it works
            </h2>
            <Image
              src="/assets/flowerr.svg"
              alt="flowerr"
              width={110}
              height={110}
              className="absolute bottom-0 right-0"
            />
            <Image
              src="/assets/maill.svg"
              alt="maill"
              width={110}
              height={110}
              className="absolute bottom-0 left-0"
            />
          </div>

          <div className="border border-[#F0F0EF] p-[25px] ">
            <div className="border border-[#F0F0EF]  rounded-[20.82px] flex h-[618px]">
              <div className="border-r relative border-[#F0F0EF] flex flex-col justify-end items-end h-full ">
                <button className=" absolute left-4 top-4 cursor-pointer z-[9999999] flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] ">
                  <Image
                    src="/assets/left-arrow.svg"
                    alt="Back"
                    width={17}
                    height={17}
                    className=""
                  />
                  Back
                </button>
                <Image
                  src="/assets/temp.svg"
                  alt="template"
                  height={1114}
                  width={163}
                  className="self-end justify-self-end ml-10 mb-4"
                />
              </div>
              <div className="w-full relative flex flex-col items-center ">
                <button className=" cursor-pointer absolute z-[9999999] right-8 top-12 flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] ">
                  Next
                  <Image
                    src="/assets/left-arrow.svg"
                    alt="Back"
                    width={17}
                    height={17}
                    className="rotate-180"
                  />
                </button>
                <h2 className="text-[35px]/[100%] mt-[37px] mb-[140px] -tracking-[2%] font-pp-mondwest mx-auto text-center">
                  Choose a{" "}
                  <span className="font-bold font-pp-neuebit">Template.</span>
                </h2>

                <div className="relative ">
                  <Image
                    src="/assets/hash.svg"
                    alt="hash"
                    width={51.6}
                    height={51.6}
                    className="absolute left-0 top-0"
                  />
                  <Image
                    src="/assets/templates.svg"
                    alt="templates"
                    width={885}
                    height={323}
                    className="z-10"
                  />
                </div>
                <Image
                  src="/assets/flower.svg"
                  alt="flower"
                  width={127}
                  height={127}
                  className="bottom-0 right-0  absolute"
                />
              </div>
            </div>
          </div>

          <div className="flex border border-[#F0F0EF] flex-col items-center justify-center relative h-[278px]">
            <h2 className="text-[100px]/[100%] font-bold -tracking-[2%] font-pp-neuebit">
              Write your message
            </h2>
            <p className="text-[20px]/[100%] font-bold -tracking-[2%]">
              With a typewriter.
            </p>
            <Image
              src="/assets/flowerr.svg"
              alt="flower"
              width={110}
              height={110}
              className="absolute bottom-0 right-0 "
            />
          </div>

          <div className="p-6 flex items-center justify-center">
            <Image
              src="/assets/write-message.svg"
              alt="flower"
              width={1167}
              height={828}
              className=""
            />
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-[100px]/[100%] font-bold font-pp-neuebit -tracking-[2%] py-[60px]">
              Let AI write for you
            </h2>
            <Image src="/assets/ai-help.svg" alt="" width={1166} height={317} />
          </div>

          <div className="flex flex-col gap-[39px] py-[77px] border border-[#F0F0EF] items-center">
            <h2 className="text-[100px]/[100%] font-bold -tracking-[2%] font-pp-neuebit">
              Customize your message
            </h2>
            <Image
              src="/assets/customize.svg"
              alt="customize"
              width={372}
              height={38}
              className=""
            />
          </div>

          <div className="flex flex-col justify-center p-6 mb-[100px]">
            <Image
              src="/assets/customize-large.svg"
              alt="customizeee"
              width={1166}
              height={827}
              className=""
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-[6.5px] py-[115px] border border-[#F0F0EF] relative">
            <h2 className="text-[100px]/[100%] -tracking-[2%] font-bold font-pp-neuebit">
              Add cute thingys
            </h2>
            <p className="text-[20px] font-pp-neuebit -tracking-[2%] font-bold">
              And extra messages.
            </p>
            <Image
              src="/assets/glass-flower.png"
              alt="cute thingys"
              width={102}
              height={102}
              className="absolute -top-10 left-0"
            />
            <Image
              src="/assets/circle.svg"
              alt="circle"
              width={102}
              height={102}
              className="absolute top-0 bottom-0 my-auto right-0"
            />
            <Image
              src="/assets/popcorn.svg"
              alt="popcorn"
              width={102}
              height={102}
              className="absolute bottom-2 left-[150px]"
            />
            <Image
              src="/assets/gaming.svg"
              alt="gaming"
              width={102}
              height={102}
              className="absolute -top-14 right-[337px]"
            />
          </div>

          <div className="flex items-center justify-center border border-[#F0F0EF] p-6">
            <Image
              src="/assets/loml.svg"
              alt=""
              width={1166}
              height={286}
              className="w-full"
            />
          </div>

          <div className="relative h-screen flex items-center justify-center">
            <span className="relative">
              <h2 className="text-[100px]/[100%] font-bold relative -tracking-[2%]">
                Share your Message
              </h2>
              <Image
                src="/assets/done.svg"
                alt="done"
                width={144}
                height={144}
                className=" absolute right-0 -bottom-16 "
              />
            </span>
          </div>

          <div className="flex items-center justify-center mt-[50px] border border-[#F0F0EF] p-6">
            <Image src="/assets/linnked-logo.svg" alt="linnked" width={691} height={140}/>

            <div className="flex flex-col bg-[url(`/assets/bg1.png`)] bg-cover bg-center h-[730px] items-center gap-[35px] ">
              <h2 className="text-[119px]/[100%] font-bold font-pp-neuebit -tracking-[2%]">Linnked was built by a small team.</h2>
              <Link
              href="/form"
              className=" z-[9999999] cursor-pointer flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] "
            >
              Meet the team.
              <Image
                src="/assets/left-arrow.svg"
                alt="Back"
                width={17}
                height={17}
                className="rotate-180"
              />
            </Link>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

const Sidebar = () => {
  return (
    <aside className="h-screen flex flex-col justify-between p-8 border-r border-[#F0F0EF] w-fit">
      <Image
        src="/assets/linnk.svg"
        alt="linnked"
        className=""
        width={160}
        height={158}
      />
      <ul className="flex flex-col text-[22.45px]/[100%] font-bold font-pp-neuebit gap-[5px]">
        <li className="bg-[#FAF9F5] py-[2.5px] px-[12.47px] rounded-[7.48px] w-fit">
          Linnked
        </li>
        <li className="bg-[#FAF9F5] py-[2.5px] px-[12.47px] rounded-[7.48px] w-fit">
          Write
        </li>
        <li className="bg-[#FAF9F5] py-[2.5px] px-[12.47px] rounded-[7.48px] w-fit">
          Customize
        </li>
        <li className="bg-[#FAF9F5] py-[2.5px] px-[12.47px] rounded-[7.48px] w-fit">
          Share
        </li>
        <li className="bg-[#FAF9F5] py-[2.5px] px-[12.47px] rounded-[7.48px] w-fit">
          Team
        </li>
        <Image
          src="/assets/stand.svg"
          alt="stand"
          className="rotate-[3.4deg] mt-[27px]"
          width={141}
          height={133}
        />
      </ul>
    </aside>
  );
};
