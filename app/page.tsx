import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="py-[15px] px-5">
      <div className="flex border border-[#F0F0EF] rounded-[25px]">
        <Sidebar />
        <div className="w-full flex flex-col items-center">
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
        </div>
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
