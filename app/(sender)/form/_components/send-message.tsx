"use client";

import {
  aiMessageFormDef,
  aiMessageValidationSchema,
  messageFormDef,
  messageValidationSchema,
} from "@/models/validations/message.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Image from "next/image";
import { useFormStore } from "@/store/form.store";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignatureCanvas from 'react-signature-canvas';
import { ArrowRight, ArrowRightCircle, Download, PenLine, PenTool } from "lucide-react";

const SendMessage = () => {
  const { steps, setSteps, aiGenerated, setAiGenerated, setMessage, template } =
    useFormStore();

  const userForm = useForm<messageFormDef>({
    resolver: zodResolver(messageValidationSchema),
    defaultValues: {
      message: "",
    },
  });
  const aiForm = useForm<aiMessageFormDef>({
    resolver: zodResolver(aiMessageValidationSchema), // You can modify this schema later
    defaultValues: {
      message: "",
    },
  });
  const userMessage = userForm.watch("message");
  const aiMessage = aiForm.watch("message");

  function onSubmitUser(values: messageFormDef) {
    setMessage(values.message);
    console.log("User message:", values);
    setSteps(steps + 1);
  }

  function onSubmitAI(values: aiMessageFormDef) {
    setMessage(values.message);
    console.log("AI message:", values);
  }

  const [showInfo, setShowInfo] = useState(false);




  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [mainLetterText, setMainLetterText] = useState("");
  const [aiPromptText, setAiPromptText] = useState("");
  const [includeSignature, setIncludeSignature] = useState(false);
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sigCanvasRef = useRef<SignatureCanvas>(null);


  // --- HANDLERS ---

  // Handle Background Image Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Saving Signature from Canvas
  const handleSaveSignature = () => {
    if (sigCanvasRef.current) {
      // Get image data URL from canvas (trimmed whitespace)
      const dataURL = sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png');
      setSignatureImage(dataURL);
      setIncludeSignature(true); // Auto-enable the switch if they saved a signature
      setIsSignatureDialogOpen(false);
    }
  };

  // Clear Signature Canvas
  const handleClearSignature = () => {
    sigCanvasRef.current?.clear();
  };

  // Render different UI for "new" template
  if (template === "new") {
    return (
      <div 
      className="min-h-screen w-full transition-all duration-300 ease-in-out bg-cover bg-center flex flex-col"
      style={{ 
        // If an image is uploaded, use it. Otherwise use plain white.
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundColor: backgroundImage ? 'none' : '#ffffff'
      }}
    >
      {/* Overlay to ensure text readability if bg image is dark */}
      {/* <div className={`flex-1 flex flex-col ${backgroundImage ? 'bg-white/80 backdrop-blur-sm' : ''}`}> */}
        
        {/* --- HEADER --- */}
          <h1 className="text-[42px] text-center mt-10 font-normal font-pp-mondwest text-black">
            A little something for you Bae ;)
          </h1>

          {/* <div className="flex absolute right-24 top-10 items-center gap-4">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />

            <Button 
              variant="outline" 
              className="rounded-full bg-stone-100 border-stone-200 hover:bg-stone-200 text-stone-700 gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              Add background image
              <Download size={16} />
            </Button>
            
            <Button 
              className="rounded-full bg-stone-100 hover:bg-stone-200 text-stone-900 gap-2 px-6 font-semibold"
              onClick={() => {
                setMessage(mainLetterText);
                setSteps(steps + 1);
              }}
              disabled={!mainLetterText.trim()}
            >
              Next
              <ArrowRight size={18} />
            </Button>
          </div> */}

        <main className="flex-1 flex flex-col items-center justify-start pt-8 pb-20 px-4 gap-8">
          
          <div className="w-full max-w-[487px] bg-white rounded-[11px] shadow-xl shadow-stone-200/50 p-5 min-h-[500px] flex flex-col relative z-20">
           
            <Textarea 
              value={mainLetterText}
              onChange={(e) => setMainLetterText(e.target.value)}
              placeholder="Hey Babe&#10;&#10;" // &#10; is a line break in placeholder
              className="flex-1 w-full resize-none border-none outline-none text-3xl font-pp-neuebit placeholder:text-stone-300  p-2 bg-transparent leading-relaxed font-"
              spellCheck={false}
            />
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-stone-100">
              
              <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="bg-[#FAF9F5] font-pp-neuebit hover:bg-stone-200 text-[22px] font-bold text-stone-600 gap-2 rounded-[9px] h-12 px-6">
                    <PenTool size={18} className="rotate-270"/>
                    {signatureImage ? "Change Signature" : "Draw Signature"}
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="">
                  <DialogHeader>
                    <DialogTitle>Draw your signature</DialogTitle>
                    <DialogDescription>
                      Sign in the box below. You can clear and retry.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="border-2 border-dashed border-stone-300 rounded-md mt-4 bg-stone-50 touch-none">
                    <SignatureCanvas 
                      ref={sigCanvasRef}
                      penColor="black"
                      canvasProps={{
                        width: 450, 
                        height: 200, 
                        className: 'signature-canvas cursor-crosshair'
                      }} 
                    />
                  </div>

                  <DialogFooter className="flex gap-2 sm:justify-between">
                    <Button type="button" variant="outline" onClick={handleClearSignature}>Clear</Button>
                    <Button type="button" onClick={handleSaveSignature} className="bg-red-500 hover:bg-red-600">Save Signature</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>


              <div className="flex items-center gap-3 bg-stone-100 p-1 rounded-full">
                <Switch 
                  id="sign-mode" 
                  checked={includeSignature}
                  onCheckedChange={setIncludeSignature}
                  className="data-[state=checked]:bg-red-500"
                />
                <Label htmlFor="sign-mode" className="text-sm font-medium text-stone-600 pr-2 cursor-pointer">
                  {includeSignature ? "Yes" : "No"}
                </Label>
              </div>
            </div>

            {includeSignature && signatureImage && (
              <div className="absolute bottom-28 left-12 pointer-events-none">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={signatureImage} alt="Signature" className="h-16 opacity-80" />
              </div>
            )}

          </div>

          <div className="w-full max-w-4xl bg-[#FAF9F5] rounded-[26px] p-3 relative z-10 -mt-10 pt-16">
            
            <Tabs defaultValue="ai-help" className="w-full flex flex-col items-center">
              
              <TabsList className="bg-white rounded-full p-1 h-auto shadow-sm mb-6">
                <TabsTrigger value="write-yourself" className="rounded-full px-6 py-2.5 data-[state=active]:bg-stone-800 data-[state=active]:text-white">
                  Write Yourself
                </TabsTrigger>
                <TabsTrigger value="ai-help" className="rounded-full px-6 py-2.5 data-[state=active]:bg-stone-800 data-[state=active]:text-white">
                  Let AI help
                </TabsTrigger>
              </TabsList>

              <TabsContent value="write-yourself" className="w-full max-w-[471px]">
                  <div className="text-center text-stone-500 py-8">Manual writing mode active above.</div>
              </TabsContent>

              <TabsContent value="ai-help" className="w-full relative flex items-center justify-center">
                 <div className="bg-[#F8F7F4] rounded-[12px] border max-w-[471px] border-stone-200 p-1">
                   <Textarea 
                      value={aiPromptText}
                      onChange={(e) => setAiPromptText(e.target.value)}
                      placeholder="Tell us about them! Are they kind, funny, always there for you? Do they make your heart race? Just describe how you feel, and we'll craft a heartfelt message for you!"
                      className="min-h-[120px]  border-none resize-none bg-transparent shadow-none focus-visible:ring-0 text-stone-600 placeholder:text-stone-400 text-sm leading-relaxed p-4"
                   />
                   
                   <div className="flex justify-end i p-2">
                     <Button 
                       variant="ghost" 
                       className="bg-white rounded-full text-stone-800 text-[20px] font-bold gap-1"
                       onClick={() => {
                         if (aiPromptText.trim()) {
                           setMessage(aiPromptText);
                           setMainLetterText(aiPromptText);
                         }
                      }}
                       disabled={!aiPromptText.trim()}
                     >
                       New
                       <ArrowRight size={20} />
                     </Button>
                   </div>
                 </div>
              </TabsContent>

            </Tabs>

          </div>

        </main>
      {/* </div> */}
    </div>
    );
  }

  // Original UI for "singlepage" and "multipage" templates
  return (
    <div className="max-w-[345px] pb-[45px] transition-all duration-200 ease-in-out">
      <h2 className="text-[45px]/[83px] font-semibold ">Send a message</h2>
      <motion.div
        animate={{
          height: aiGenerated ? "0px" : "300px",
          display: aiGenerated ? "none" : "block",
        }}
        className="transition-all duration-200 ease-in-out"
      >
        <Form {...userForm}>
          <form
            onSubmit={userForm.handleSubmit(onSubmitUser)}
            className="relative space-y-[17px]  text-[15px] font-normal"
          >
            <FormField
              control={userForm.control}
              name="message"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Write Your Own</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Textarea
                        placeholder="Max 130 word"
                        className="w-[345px] h-[145px] resize-none bg-[#d9d9d913] rounded-md focus:border-black"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      className="absolute bottom-[6px] right-3 rounded-full p-2"
                    >
                      {" "}
                      <Image
                        src="/icons/send.svg"
                        alt="send"
                        className="group-hover:rotate-12 transition-all"
                        width={20}
                        height={20}
                      />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex justify-between items-center mt-[17px]">
          <div className="flex items-center gap-[10px] h-fit">
            <Image
              src="/icons/info-square.svg"
              alt="info"
              width={15}
              height={15}
              onClick={() => setShowInfo(true)}
              className="cursor-pointer"
            />
            <div
              className="flex items-center gap-[10px] group"
              onClick={() => setAiGenerated(true)}
            >
              <p className="text-[16px]/[18px] cursor-pointer =">Let AI help</p>
              <Image
                src="/icons/arrow-up.svg"
                alt="info"
                width={20}
                height={20}
                className="group-hover:rotate-12"
              />
            </div>
            {/* <div className='py-[7px] px-[13px] flex gap-[14px] items-start bg-[#f6cfcf59] rounded-[6px]'>
            <Image src='/icons/info-square.svg' alt='info' width={15} height={15} />
            <p className='text-[10px] noto-sans'>Tell us about them! Are they kind, funny, always there for you? Do they make your heart race? Just describe how you feel, and we’ll craft a heartfelt message for you!</p>
          </div> */}
          </div>
          <Button
            onClick={userForm.handleSubmit(onSubmitUser)}
            disabled={!!!userMessage?.trim() || !userForm.formState.isValid}
            type="submit"
            className="text-black   hover:text-white w-[107px] bg-[#FFF3F3] py-[10px] px-5 flex items-center gap-[10px]"
          >
            Next{" "}
            <Image
              src="/icons/arrow-up.svg"
              alt="arrow"
              className="group-hover:rotate-12 transition-all"
              width={20}
              height={20}
            />
          </Button>
        </div>
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="py-[7px] mt-6 px-[13px] gap-[14px] items-start bg-[#f6cfcf59] rounded-[6px] flex"
            >
              <Image
                src="/icons/x-square-contained.svg"
                alt="info"
                width={15}
                height={15}
                onClick={() => setShowInfo((prev) => !prev)}
                className="cursor-pointer"
              />
              <p className="text-[10px] noto-sans">
                Tell us about them! Are they kind, funny, always there for you?
                Do they make your heart race? Just describe how you feel, and
                we’ll craft a heartfelt message for you!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        animate={{
          height: aiGenerated ? "300px" : "0px",
          display: aiGenerated ? "block" : "none",
        }}
        className=""
      >
        <Form {...aiForm}>
          <form
            onSubmit={aiForm.handleSubmit(onSubmitAI)}
            className="relative space-y-[17px] mt-[17px]  text-[15px] font-normal"
          >
            <FormField
              control={aiForm.control}
              name="message"
              render={({ field }) => (
                <FormItem className="relative">
                  <div>
                    <FormLabel>Let AI Help!</FormLabel>
                    <div className="py-[7px] px-[13px] flex gap-[14px] items-start bg-[#f6cfcf59] rounded-[6px]">
                      <Image
                        src="/icons/info-square.svg"
                        alt="info"
                        width={15}
                        height={15}
                      />
                      <p className="text-[10px] noto-sans">
                        Tell us about them! Are they kind, funny, always there
                        for you? Do they make your heart race? Just describe how
                        you feel, and we’ll craft a heartfelt message for you!
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <FormControl>
                      <Textarea
                        placeholder="Max 130 word"
                        className="w-[345px] h-[145px] resize-none bg-[#d9d9d913] rounded-md focus:border-black"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      className="absolute bottom-[6px] right-3 rounded-full p-2"
                    >
                      {" "}
                      <Image
                        src="/icons/send.svg"
                        alt="send"
                        className="group-hover:rotate-12 transition-all"
                        width={20}
                        height={20}
                      />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <div className="flex justify-between items-center mt-[17px]">
          <div className="flex items-center gap-[10px] h-fit">
            <div
              className="flex items-center gap-[10px] group"
              onClick={() => setAiGenerated(false)}
            >
              <p className="text-[16px]/[18px] cursor-pointer =">
                Write yourself
              </p>
              <Image
                src="/icons/arrow-up.svg"
                alt="info"
                width={20}
                height={20}
                className="group-hover:rotate-12"
              />
            </div>
            {/* <div className='py-[7px] px-[13px] flex gap-[14px] items-start bg-[#f6cfcf59] rounded-[6px]'>
            <Image src='/icons/info-square.svg' alt='info' width={15} height={15} />
            <p className='text-[10px] noto-sans'>Tell us about them! Are they kind, funny, always there for you? Do they make your heart race? Just describe how you feel, and we’ll craft a heartfelt message for you!</p>
          </div> */}
          </div>
          <Button
            onClick={() => setSteps(steps + 1)}
            disabled={!!!aiMessage?.trim() || !aiForm.formState.isValid}
            type="submit"
            className="text-black   hover:text-white w-[107px] bg-[#FFF3F3] py-[10px] px-5 flex items-center gap-[10px]"
          >
            Next{" "}
            <Image
              src="/icons/arrow-up.svg"
              alt="arrow"
              className="group-hover:rotate-12 transition-all"
              width={20}
              height={20}
            />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SendMessage;
