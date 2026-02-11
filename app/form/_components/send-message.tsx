import { aiMessageFormDef, aiMessageValidationSchema, messageFormDef, messageValidationSchema } from '@/models/validations/message.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import Image from 'next/image'
import { useFormStore } from '@/store/form.store'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const SendMessage = () => {
  const { steps, setSteps, aiGenerated, setAiGenerated, setMessage } = useFormStore();

  const userForm = useForm<messageFormDef>({
    resolver: zodResolver(messageValidationSchema),
    defaultValues: {
      message: "",
    },
  })
  const aiForm = useForm<aiMessageFormDef>({
    resolver: zodResolver(aiMessageValidationSchema), // You can modify this schema later
    defaultValues: {
      message: "",
    },
  })
  const userMessage = userForm.watch("message")
  const aiMessage = aiForm.watch("message")

  function onSubmitUser(values: messageFormDef) {
    setMessage(values.message);
    console.log("User message:", values)
    setSteps(steps + 1)
  }

  function onSubmitAI(values: aiMessageFormDef) {
    setMessage(values.message);
    console.log("AI message:", values)
  }

  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className='max-w-[345px] pb-[45px] transition-all duration-200 ease-in-out'>
      <h2 className='text-[45px]/[83px] font-semibold '>Send a message</h2>
      <motion.div animate={{
          height: aiGenerated ? "0px" : "300px",
          display: aiGenerated ? "none" : "block",
        }} className='transition-all duration-200 ease-in-out'>
        <Form {...userForm}>
          <form onSubmit={userForm.handleSubmit(onSubmitUser)} className="relative space-y-[17px]  text-[15px] font-normal">
            <FormField
              control={userForm.control}
              name="message"
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Write Your Own</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Textarea
                        placeholder="Max 130 word"
                        className="w-[345px] h-[145px] resize-none bg-[#d9d9d913] rounded-md focus:border-black"
                        {...field}
                      />
                    </FormControl>
                    <Button type="submit" className='absolute bottom-[6px] right-3 rounded-full p-2'> <Image src='/icons/send.svg' alt='send' className='group-hover:rotate-12 transition-all' width={20} height={20} /></Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className='flex justify-between items-center mt-[17px]'>

          <div className='flex items-center gap-[10px] h-fit'>
            <Image src='/icons/info-square.svg' alt='info' width={15} height={15} onClick={() => setShowInfo(true)} className='cursor-pointer' />
            <div className='flex items-center gap-[10px] group' onClick={() => setAiGenerated(true)}>
              <p className='text-[16px]/[18px] cursor-pointer ='>Let AI help</p>
              <Image src='/icons/arrow-up.svg' alt='info' width={20} height={20} className='group-hover:rotate-12' />
            </div>
            {/* <div className='py-[7px] px-[13px] flex gap-[14px] items-start bg-[#f6cfcf59] rounded-[6px]'>
            <Image src='/icons/info-square.svg' alt='info' width={15} height={15} />
            <p className='text-[10px] noto-sans'>Tell us about them! Are they kind, funny, always there for you? Do they make your heart race? Just describe how you feel, and we’ll craft a heartfelt message for you!</p>
          </div> */}
          </div>
          <Button onClick={userForm.handleSubmit(onSubmitUser)}
            disabled={!!!userMessage?.trim() || !userForm.formState.isValid} type="submit" className='text-black   hover:text-white w-[107px] bg-[#FFF3F3] py-[10px] px-5 flex items-center gap-[10px]'>Next <Image src='/icons/arrow-up.svg' alt='arrow' className='group-hover:rotate-12 transition-all' width={20} height={20} /></Button>
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
                Tell us about them! Are they kind, funny, always there for you? Do they make your heart race? Just describe how you feel, and we’ll craft a heartfelt message for you!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div animate={{
          height: aiGenerated ? "300px" : "0px",
          display: aiGenerated ? "block" : "none",
        }} className=''>
        <Form {...aiForm}>
          <form onSubmit={aiForm.handleSubmit(onSubmitAI)} className="relative space-y-[17px] mt-[17px]  text-[15px] font-normal">
            <FormField
              control={aiForm.control}
              name="message"
              render={({ field }) => (
                <FormItem className='relative'>
                  <div>
                    <FormLabel>Let AI Help!</FormLabel>
                    <div className='py-[7px] px-[13px] flex gap-[14px] items-start bg-[#f6cfcf59] rounded-[6px]'>
                      <Image src='/icons/info-square.svg' alt='info' width={15} height={15} />
                      <p className='text-[10px] noto-sans'>Tell us about them! Are they kind, funny, always there for you? Do they make your heart race? Just describe how you feel, and we’ll craft a heartfelt message for you!</p>
                    </div>
                  </div>
                  <div className='relative'>

                    <FormControl>
                      <Textarea
                        placeholder="Max 130 word"
                        className="w-[345px] h-[145px] resize-none bg-[#d9d9d913] rounded-md focus:border-black"
                        {...field}
                      />
                    </FormControl>
                    <Button type="submit" className='absolute bottom-[6px] right-3 rounded-full p-2'> <Image src='/icons/send.svg' alt='send' className='group-hover:rotate-12 transition-all' width={20} height={20} /></Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <div className='flex justify-between items-center mt-[17px]'>

          <div className='flex items-center gap-[10px] h-fit'>
            <div className='flex items-center gap-[10px] group' onClick={() => setAiGenerated(false)}>
              <p className='text-[16px]/[18px] cursor-pointer ='>Write yourself</p>
              <Image src='/icons/arrow-up.svg' alt='info' width={20} height={20} className='group-hover:rotate-12' />
            </div>
            {/* <div className='py-[7px] px-[13px] flex gap-[14px] items-start bg-[#f6cfcf59] rounded-[6px]'>
            <Image src='/icons/info-square.svg' alt='info' width={15} height={15} />
            <p className='text-[10px] noto-sans'>Tell us about them! Are they kind, funny, always there for you? Do they make your heart race? Just describe how you feel, and we’ll craft a heartfelt message for you!</p>
          </div> */}
          </div>
          <Button onClick={() => setSteps(steps + 1)}
            disabled={!!!aiMessage?.trim() || !aiForm.formState.isValid} type="submit" className='text-black   hover:text-white w-[107px] bg-[#FFF3F3] py-[10px] px-5 flex items-center gap-[10px]'>Next <Image src='/icons/arrow-up.svg' alt='arrow' className='group-hover:rotate-12 transition-all' width={20} height={20} />
          </Button>
        </div>
      </motion.div>

    </div>
  )
}

export default SendMessage