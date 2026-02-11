"use client"

import { useFormStore } from '@/store/form.store'
import OnboardForm from './_components/onboard-form';
import SendMessage from './_components/send-message';
import Template from './_components/template';
import Preview from './_components/preview';
import Share from './_components/share';

const FormPage = () => {
    const {steps} = useFormStore();

    const formSteps = () => {
        switch (steps) {
            case 1:
                return (
                    <OnboardForm />
                );
            case 2:
                return (
                    <Template />
                );
            case 3:
                return (
                    <SendMessage />
                );
            case 4:
                return (
                    <Preview />
                );
            case 5:
                return (
                    <Share />
                );
            default:
                return null;
        }
    };
    return (
        <section className=" flex  flex-col bg items-center relative z-[9]  justify-center   min-h-screen">
            {
                formSteps()
            }
        </section>
    )
}

export default FormPage