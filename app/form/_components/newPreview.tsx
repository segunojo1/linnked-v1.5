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

type HeaderIconItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  note: string;
};

const initialHeaderIcons: HeaderIconItem[] = [
  {
    src: "/assets/preview1.svg",
    alt: "first preview image",
    width: 66,
    height: 90,
    note: "",
  },
  {
    src: "/assets/preview2.svg",
    alt: "flower",
    width: 80,
    height: 80,
    note: "",
  },
  {
    src: "/assets/preview3.svg",
    alt: "third preview image",
    width: 89,
    height: 76,
    note: "",
  },
  {
    src: "/assets/preview4.svg",
    alt: "fourth preview image",
    width: 90,
    height: 90,
    note: "",
  },
  {
    src: "/assets/preview7.svg",
    alt: "fifth preview image",
    width: 90,
    height: 88,
    note: "",
  },
  {
    src: "/assets/preview6.svg",
    alt: "sixth preview image",
    width: 76,
    height: 76,
    note: "",
  },
];

const iconOptions = {
  flowers: [
    "/flowers/regular-shape/1.svg",
    "/flowers/regular-shape/1-1.svg",
    "/flowers/regular-shape/1-2.svg",
    "/flowers/regular-shape/2.svg",
    "/flowers/regular-shape/2-1.svg",
    "/flowers/regular-shape/3.svg",
    "/flowers/regular-shape/4.svg",
    "/flowers/regular-shape/5.svg",
    "/flowers/regular-shape/6.svg",
    "/flowers/regular-shape/7.svg",
  ],
  glass: [
    "/glass/regular-shape/png.svg",
    "/glass/regular-shape/png-1.svg",
    "/glass/regular-shape/png-2.svg",
    "/glass/regular-shape/png-3.svg",
    "/glass/regular-shape/png-4.svg",
    "/glass/regular-shape/png-5.svg",
    "/glass/regular-shape/png-6.svg",
    "/glass/regular-shape/png-7.svg",
    "/glass/regular-shape/png-8.svg",
    "/glass/regular-shape/png-9.svg",
  ],
  sticker: [
    "/stickers/regular-shape/100.svg",
    "/stickers/regular-shape/Airplane.svg",
    "/stickers/regular-shape/Apple.svg",
    "/stickers/regular-shape/April.svg",
    "/stickers/regular-shape/Ball.svg",
    "/stickers/regular-shape/Bee.svg",
    "/stickers/regular-shape/Book.svg",
    "/stickers/regular-shape/Camera.svg",
    "/stickers/regular-shape/Crown.svg",
    "/stickers/regular-shape/Flower 1.svg",
  ],
  shapes: [
    "/shapes/regular-shape/A1.svg",
    "/shapes/regular-shape/A2.svg",
    "/shapes/regular-shape/A3.svg",
    "/shapes/regular-shape/A4.svg",
    "/shapes/regular-shape/B1.svg",
    "/shapes/regular-shape/B2.svg",
    "/shapes/regular-shape/B3.svg",
    "/shapes/regular-shape/B4.svg",
    "/shapes/regular-shape/C1.svg",
    "/shapes/regular-shape/C2.svg",
  ],
} as const;

type IconCategory = keyof typeof iconOptions;

const NewPreview = () => {
  const { message } = useFormStore();
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);
  const [signature, setSignature] = useState<string>("");
  const [headerIcons, setHeaderIcons] =
    useState<HeaderIconItem[]>(initialHeaderIcons);
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

  return (
    <section className="flex flex-col items-center gap-12.5 h-full max-h-screen mt-11.25">
      <h1 className="text-[42.12px]/[100%] font-normal -tracking-[2%] font-pp-mondwest">
        A little something for you ;)
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
            <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#F6EDEC] px-3 py-1 text-[20px] leading-none text-black opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
              Click to Edit -&gt;
            </span>
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl bg-white rounded-lg p-8 shadow-md">
        <div className="text-[16px] leading-6 font-neuemontreal font-medium text-stone-800 whitespace-pre-wrap mb-12">
          {message}
        </div>

        <div className="flex flex-col gap-6 items-start">
          {signature ? (
            <img src={signature} alt="signature" className="w-32 h-20" />
          ) : (
            <Button onClick={() => setIsSignatureOpen(true)}>
              Add Signature
            </Button>
          )}
        </div>

        <Image
          src="/assets/yesnoo.svg"
          alt="yes or no"
          height={34.9}
          width={81.5}
          className="justify-self-end mt-8.75"
        />
      </div>

      <Dialog open={isSignatureOpen} onOpenChange={setIsSignatureOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign Here</DialogTitle>
          </DialogHeader>
          <SignatureCanvas
            onSignatureChange={setSignature}
            onClose={() => setIsSignatureOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Sheet open={isIconEditorOpen} onOpenChange={setIsIconEditorOpen}>
        <SheetContent className="w-full border-l border-stone-200 bg-[#f3f3f3] p-0 sm:max-w-190">
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

              <TabsContent value="note" className="mt-6 space-y-8">
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

                <div className="mx-auto w-full max-w-85 rounded-[18px] border border-stone-200 bg-[#f8f8f8] p-4 text-[36px]/[100%] font-neuemontreal text-stone-900">
                  {selectedIcon?.note ||
                    "Everything about you reminds me of a pretty flower..."}
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
                              onClick={() => updateSelectedIconImage(src)}
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
