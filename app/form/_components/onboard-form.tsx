"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { userFormDef, userValidationSchema } from '@/models/validations/userinfo.validation';
import { useFormStore } from '@/store/form.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image'
import { useForm } from 'react-hook-form';

const OnboardForm = () => {

    const {steps, setSteps, setSenderFirstName, setSenderEmail, setRecipientFirstName} = useFormStore();

    const form = useForm<userFormDef>({
        resolver: zodResolver(userValidationSchema),
        defaultValues: {
            senderFirstName: "",
            senderEmail: "",
            recipientFirstName: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: userFormDef) {
        console.log(values);
        setSenderFirstName(values.senderFirstName);
        setSenderEmail(values.senderEmail);
        setRecipientFirstName(values.recipientFirstName);
        setSteps(steps + 1)
    }
  return (
    <div className="flex flex-col items-center gap-8 h-full max-h-screen">
        <div className='flex flex-col gap-[50px] items-center mt-[45px]'>
            <h1 className="text-[42.12px]/[100%] font-normal -tracking-[2%] font-pp-mondwest ">Let’s send your <span className="text-[50px] font-bold font-pp-neuebit">Message.</span></h1>
            <Image src="/assets/iconsss.svg" alt="icons" width={655} height={102} className="" draggable={false} />
        </div>
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4.25 w-53.5 text-[24px]/[100%] font-bold font-pp-neuebit">
                        <FormField
                            control={form.control}
                            name="senderFirstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className='bg-[#FAF9F5] rounded-md focus:border-black border-none py-2.75 h-full px-6.5' placeholder="enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="senderEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className='bg-[#FAF9F5] rounded-md focus:border-black border-none py-2.75 h-full px-6.5' placeholder="enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="recipientFirstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className='bg-[#FAF9F5] rounded-md focus:border-black border-none py-2.75 h-full px-6.5' placeholder="enter their name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='text-black mx-auto hover:text-white w-[107px] bg-[#FFF3F3] py-[10px] px-5 flex items-center gap-[10px]'>Next <ArrowRight /> </Button>
                    </form>
                </Form> 
    
        </div>
  )
}

export default OnboardForm