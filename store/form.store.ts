import { create } from "zustand";

interface FormType {
    steps: number;
    loading: boolean;
    senderFirstName: string;
    senderEmail: string;
    recipientFirstName: string;
    template: string;
    message: string;
    messageTitle: string;
    aiGenerated: boolean;
    setAiGenerated: (value: boolean) => void;
    setMessageTitle: (messageTitle: string) => void;
    setMessage: (message: string) => void;
    setTemplate: (template: string) => void;
    setSenderFirstName: (senderFirstName: string) => void;
    setSenderEmail: (senderEmail: string) => void;
    setRecipientFirstName: (recipientFirstName: string) => void;
    setSteps: (steps: number) => void;
    setLoading: (loading: boolean) => void;
}

export const useFormStore = create<FormType>((set) => (
    {
        steps: 1,
        loading: false,
        senderFirstName: "",
        senderEmail: "",
        recipientFirstName: "",
        template: "",
        message: "",
        messageTitle: "Title",
        aiGenerated: false,
        setAiGenerated: (aiGenerated: boolean) => set({ aiGenerated }),
        setMessageTitle: (messageTitle: string) => set({ messageTitle }),
        setMessage: (message: string) => set({ message }),
        setTemplate: (template: string) => set({ template }),
        setSenderFirstName: (senderFirstName: string) => set({ senderFirstName }),
        setSenderEmail: (senderEmail: string) => set({ senderEmail }),
        setRecipientFirstName: (recipientFirstName: string) => set({ recipientFirstName }),
        setSteps: (steps: number) => set({ steps }),
        setLoading: (loading: boolean) => set({ loading }),
    }
))