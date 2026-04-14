"use client";
import { useRecipientStore } from "@/store/recipient.store";
import WelcomeScreen from "./_components/welcome-screen";
import MainMessage from "./_components/main_message";
import { AnimatePresence, motion } from "motion/react";
import Yes from "./_components/yes";
import NoPage from "./_components/no";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { LoaderIcon } from "lucide-react";

const LinnkPage = () => {
  const { steps, setMessageDetails, loading, setLoading } = useRecipientStore();

  const {id} = useParams();

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

  useEffect(() => {
    const fetchLinnkDetails = async () => {
      try {
        setLoading(true);
        const {data} = await axios.get(`/api/linnks/${id}`);
        console.log(data);
        setMessageDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch linnk details", error);
        setLoading(false);
      }
    }

    fetchLinnkDetails();
  }, [id])

  return (
    <section className="">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <LoaderIcon className="animate-spin"/>
        </div>
      ) : (
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
      )}
    </section>
  )
};

export default LinnkPage;
