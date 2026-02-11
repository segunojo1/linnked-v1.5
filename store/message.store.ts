import { create } from "zustand";

interface MessageType {
    senderFirstName: string,
    receiverFirstName: string,
    customMessage: string,
    link: string;
    multiPage: boolean;
    setMultiPage: (multiPage: boolean) => void;
    setSenderFirstName: (senderFirstName: string) => void;
    setReceiverFirstName: (recipientFirstName: string) => void;
    setCustomMessage: (customMessage: string) => void;
    setLink: (link: string) => void;
}

export const useMessageStore = create<MessageType>((set) => (
    {
        senderFirstName: "",
        receiverFirstName: "",
        customMessage: "",
        link: "",
        multiPage: false,
        setMultiPage:  (multiPage: boolean) => set({ multiPage }),
        setSenderFirstName: (senderFirstName: string) => set({ senderFirstName }),
        setCustomMessage: (customMessage: string) => set({ customMessage }),
        setReceiverFirstName: (receiverFirstName: string) => set({ receiverFirstName }),
        setLink: (link: string) => set({ link }),
    }
))