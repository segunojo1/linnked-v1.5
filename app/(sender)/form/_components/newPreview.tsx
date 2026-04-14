"use client";

import { useState } from "react";
import { useFormStore } from "@/store/form.store";
import Image from "next/image";
import SignatureCanvas from "./signature-canvas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { iconOptions } from "@/lib/data";
import { toast } from "sonner";
import axios from "axios";

type IconCategory = keyof typeof iconOptions;

const NewPreview = () => {
  const {
    message,
    headerIcons,
    setHeaderIcons,
    signature,
    setSignature,
    backgroundImage,
    messageTitle
  } = useFormStore();
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);
  const [isSignatureUploading, setIsSignatureUploading] = useState(false);
  // const [signature, setSignature] = useState<string>("");
  const [isIconEditorOpen, setIsIconEditorOpen] = useState(false);
  const [selectedIconIndex, setSelectedIconIndex] = useState<number | null>(
    null,
  );
  const [editorTab, setEditorTab] = useState("note");
  const [iconTab, setIconTab] = useState<IconCategory>("flowers");

  const selectedIcon =
    selectedIconIndex !== null ? headerIcons[selectedIconIndex] : null;

  const openIconEditor = (index: number) => {
    setSelectedIconIndex(index);
    setIsIconEditorOpen(true);
    setEditorTab("note");
  };

  const updateSelectedIconNote = (note: string) => {
    if (selectedIconIndex === null) return;

    setHeaderIcons((prev) =>
      prev.map((icon, idx) =>
        idx === selectedIconIndex ? { ...icon, note } : icon,
      ),
    );
  };

  const updateSelectedIconImage = (src: string) => {
    if (selectedIconIndex === null) return;

    setHeaderIcons((prev) =>
      prev.map((icon, idx) =>
        idx === selectedIconIndex ? { ...icon, src } : icon,
      ),
    );
  };

  const uploadSignatureToCloudinary = async (signatureData: string) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    // Keep current behavior when Cloudinary is not configured.
    if (!cloudName || !uploadPreset) {
      return signatureData;
    }

    const blob = await fetch(signatureData).then((res) => res.blob());
    const formData = new FormData();
    formData.append("file", blob, `signature-${Date.now()}.png`);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "linnked/signatures");

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
    );

    if (data.error) {
      throw new Error("Failed to upload signature image");
    }

    // const uploaded = (await uploadResponse.json()) as { secure_url?: string };
    if (!data.secure_url) {
      throw new Error("Missing uploaded signature URL");
    }

    return data.secure_url;
  };

  const handleSignatureChange = async (signatureData: string) => {
    // Show immediate preview even before upload completes.
    setSignature(signatureData);

    try {
      setIsSignatureUploading(true);
      const uploadedSignatureUrl =
        await uploadSignatureToCloudinary(signatureData);
      setSignature(uploadedSignatureUrl);

      if (uploadedSignatureUrl !== signatureData) {
        toast.success("Signature uploaded");
      }
    } catch (error) {
      toast.error("Signature upload failed. Using local signature preview.");
      console.error("Failed to upload signature", error);
    } finally {
      setIsSignatureUploading(false);
    }
  };

  return (
    <section className="relative w-full flex flex-col items-center gap-12.5 h-full max-h-screen overflow-hidden">
      {backgroundImage ? (
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-white/10" />
        </div>
      ) : null}
      <h1 className="text-[42.12px]/[100%] mt-11.25 font-normal -tracking-[2%] font-pp-mondwest">
        {messageTitle}
      </h1>

      <div className="flex items-center gap-6.25">
        {headerIcons.map((icon, index) => (
          <button
            key={`${icon.alt}-${index}`}
            type="button"
            onClick={() => openIconEditor(index)}
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
                Click to Edit -&gt;
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

      <div className="w-full max-w-118 bg-white  h-fit  rounded-lg p-8 shadow-md flex flex-col justify-between ">
        <div className="text-[16px] leading-6 font-neuemontreal max-h-[360px] overflow-y-scroll font-medium text-stone-800 whitespace-pre-wrap mb-5">
          {message}
        </div>
        <div className="">
          <div className="flex flex-col gap-6 items-start">
            {signature ? (
              <img src={signature} alt="signature" className="w-32 h-20" />
            ) : (
              <Button
                onClick={() => setIsSignatureOpen(true)}
                disabled={isSignatureUploading}
              >
                {isSignatureUploading ? "Uploading..." : "Add Signature"}
              </Button>
            )}
          </div>

          <Image
            src="/assets/yesnoo.svg"
            alt="yes or no"
            height={34.9}
            width={81.5}
            className="justify-self-end mt-2"
            draggable={false}
          />
        </div>
      </div>

      <Dialog open={isSignatureOpen} onOpenChange={setIsSignatureOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign Here</DialogTitle>
          </DialogHeader>
          <SignatureCanvas
            onSignatureChange={handleSignatureChange}
            onClose={() => setIsSignatureOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Sheet open={isIconEditorOpen} onOpenChange={setIsIconEditorOpen}>
        <SheetContent className="w-full z-9999999 border-l border-stone-200 bg-[#f3f3f3] p-0 sm:max-w-190">
          <SheetHeader className="flex-row items-center justify-between border-b border-stone-200 px-6 py-5">
            <SheetTitle className="text-[20px] font-medium text-stone-900">
              Edit Icon
            </SheetTitle>
            <Button
              variant="outline"
              onClick={() => setIsIconEditorOpen(false)}
            >
              Close
            </Button>
          </SheetHeader>

          <div className="px-6 py-5">
            <Tabs value={editorTab} onValueChange={setEditorTab}>
              <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger value="note">Add Note</TabsTrigger>
                <TabsTrigger value="change">Change Icon</TabsTrigger>
              </TabsList>

              <TabsContent value="note" className="mt-3 space-y-6">
                <div className="flex justify-center">
                  {selectedIcon && (
                    <Image
                      src={selectedIcon.src}
                      alt={selectedIcon.alt}
                      width={90}
                      height={90}
                    />
                  )}
                </div>

                <div className="mx-auto whitespace-pre-wrap wrap-break-word w-full max-w-full rounded-[18px] border border-stone-200 bg-[#f8f8f8] p-2 text-[30px]/[100%] font-neuemontreal text-stone-900">
                  {selectedIcon?.note ||
                    ""}
                </div>

                <div className="rounded-[18px] border border-stone-200 bg-white p-4">
                  <Textarea
                    value={selectedIcon?.note || ""}
                    onChange={(e) => updateSelectedIconNote(e.target.value)}
                    placeholder="Type your note"
                    className="min-h-37.5 resize-none border-none p-0 text-[36px]/[100%] font-neuemontreal shadow-none focus-visible:ring-0"
                  />
                  <div className="mt-2 flex justify-end">
                    <Button onClick={() => setIsIconEditorOpen(false)}>
                      Save
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="change" className="mt-6 space-y-6">
                <Tabs
                  value={iconTab}
                  onValueChange={(value) => setIconTab(value as IconCategory)}
                >
                  <TabsList className="grid w-full max-w-107.5 grid-cols-4">
                    <TabsTrigger value="flowers">Flowers</TabsTrigger>
                    <TabsTrigger value="glass">Glass</TabsTrigger>
                    <TabsTrigger value="sticker">Sticker</TabsTrigger>
                    <TabsTrigger value="shapes">Shapes</TabsTrigger>
                  </TabsList>

                  {(Object.keys(iconOptions) as IconCategory[]).map(
                    (category) => (
                      <TabsContent
                        key={category}
                        value={category}
                        className="mt-6"
                      >
                        <div className="grid grid-cols-6 gap-6">
                          {iconOptions[category].map((src, idx) => (
                            <button
                              key={`${category}-${idx}`}
                              type="button"
                              onClick={() => {
                                updateSelectedIconImage(src);
                                setIsIconEditorOpen(false);
                              }}
                              className="flex h-14 w-14 items-center justify-center rounded-full border border-transparent transition hover:border-stone-300"
                            >
                              <Image
                                src={src}
                                alt={`${category} option ${idx + 1}`}
                                width={44}
                                height={44}
                              />
                            </button>
                          ))}
                        </div>
                      </TabsContent>
                    ),
                  )}
                </Tabs>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default NewPreview;
