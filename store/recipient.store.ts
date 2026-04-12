import { create } from "zustand";

interface RecipientType {
    steps: number;
    setSteps: (steps: number) => void;
}

export const useRecipientStore = create<RecipientType>((set) => ({
    steps: 1,
    setSteps: (steps: number) => set({ steps }),
}))