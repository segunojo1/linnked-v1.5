import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useFormStore } from "@/store/form.store";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Typewriter = () => {
  // const [title, setTitle] = useState("");
  const { message, setMessage, messageTitle, setMessageTitle } = useFormStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playKeySound = () => {
    if (typeof window === "undefined") return;

    if (!audioContextRef.current) {
      const AudioContextClass =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;

      if (!AudioContextClass) return;
      audioContextRef.current = new AudioContextClass();
    }

    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    if (audioContext.state === "suspended") {
      void audioContext.resume();
    }

    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(700, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.05);
  };

  useEffect(() => {
    return () => {
      void audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, []);

  return (
    <div className="h-screen flex items-center flex-col">
      <div className="mt-10 mb-9 w-full max-w-[760px] px-4">
        <div className="flex items-center justify-center gap-3">
          <span className="shrink-0 text-[42.12px] font-normal font-pp-mondwest -tracking-[2%]">
            Add a Title
          </span>
          <Input
            type="text"
            value={messageTitle}
            onChange={(e) => setMessageTitle(e.target.value)}
            placeholder="Title"
            maxLength={40}
            className="h-[50px] w-[320px] border-2 bg-transparent p-0 !text-[42px] leading-none font-bold font-pp-neuebit focus-visible:ring-0 "
          />
        </div>
      </div>
      <Tabs
        defaultValue="you"
        className="w-full h-full flex flex-col items-center justify-between"
      >
        <TabsList className="text-[20px] font-bold  font-pp-neuebit">
          <TabsTrigger value="you">Write yourself</TabsTrigger>
          {/* <TabsTrigger value="ai">Let AI help</TabsTrigger> */}
        </TabsList>
        <TabsContent
          value="you"
          className="flex flex-col items-center justify-between"
        >
          {/* <Button
            variant="secondary"
            className="bg-[#FAF9F5] mt-[107px] font-pp-neuebit hover:bg-stone-200 text-[22px] font-bold text-stone-600 gap-2 rounded-[9px] h-12 px-6"
          >
            <PenTool size={18} className="rotate-270" />
            Starting Typing.
          </Button> */}

          <div className="relative w-full flex flex-col justify-center">
            <div className="flex relative justify-end mr-[50px]">
              <Image
                src="/assets/typewriter22.png"
                width={1007}
                height={716}
                alt="typewriter back"
                className="absolute w-[1007px] -left-7 bottom-0 top-0 my-auto"
              />
              <div className="flex flex-col z-[999] relative  -bottom-10 mr-[140px] gap-[30px]  w-[559.2px] border-[#E5E5E5] bg-white rounded-2xl border-[0.5px] p-[23px] pb-[118px] font-neuemontreal text-[16px] font-medium">
                <Textarea
                  ref={textareaRef}
                  value={message}
                  placeholder=""
                  className="w-full resize-none overflow-scroll border-none outline-none shadow-none focus-visible:ring-0 bg-transparent text-[16px] leading-6 font-neuemontreal font-medium text-stone-800 p-0 h-[200px] caret-stone-800"
                  spellCheck={false}
                  onKeyDown={playKeySound}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    console.log("Message changed:", e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="bg-[#FAF9F5] rounded-t-[29.85px] min-h-[432px] flex items-end -mt-[210px]">
              <Image
                src="/assets/typewriter_transparent1.png"
                width={1025}
                height={1155}
                alt="typewriter"
                className=" z-[99999] relative right-0 "
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="ai">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Typewriter;
