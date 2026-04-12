"use client";
import { useRecipientStore } from "@/store/recipient.store";
import WelcomeScreen from "./_components/welcome-screen";
import MainMessage from "./_components/main_message";
import { AnimatePresence, motion } from "motion/react";
import Yes from "./_components/yes";
import NoPage from "./_components/no";

const LinnkPage = () => {
  const { steps } = useRecipientStore();

  const renderSteps = () => {
    switch (steps) {
      case 1:
        return <WelcomeScreen />
      case 2:
        return <MainMessage />
      case 3:
        return <Yes />
      case 4:
         return <NoPage />
      default:
        return null;
    }
  }

  return (
    <section className="">
      <AnimatePresence mode="wait">
        <motion.div
          key={steps}
          initial={{ opacity: 0, y: 8}}
          animate={{ opacity: 1, y: 0}}
          exit={{ opacity: 0, y: -8}}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {renderSteps()}
        </motion.div>
      </AnimatePresence>
    </section>
  )
};

export default LinnkPage;
