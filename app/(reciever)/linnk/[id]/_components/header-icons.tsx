import { useRecipientStore } from '@/store/recipient.store'
import Image from 'next/image'
import React from 'react'

const HeaderIcons = () => {
    const { messageDetails } = useRecipientStore();
    
  return (
    <div className="flex items-center gap-6.25">
            {messageDetails?.icons.map((icon, index) => (
              <button
                key={`${icon.position}-${index}`}
                type="button"
                className="relative group"
              >
                <Image
                  src={icon.iconSrc}
                  alt={icon.iconNote || `icon-${index}`}
                  height={80}
                  width={80}
                />
                <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 flex -translate-x-1/2 flex-col items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  {icon.iconNote ? (
                    <span className="max-w-56 rounded-[10px] border-[.5px] border-[#E5E5E5] bg-[#FFFFFF1A] px-3 py-2 text-center text-[18px] leading-[1.05] text-stone-900 shadow-sm whitespace-pre-wrap wrap-break-word">
                      {icon.iconNote}
                    </span>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
  )
}

export default HeaderIcons