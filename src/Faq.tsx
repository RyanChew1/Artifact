import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "./components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Link } from "react-router-dom";

const Faq = () => {
  return (
    <ThemeProvider>
      <div className="w-full px-[10vw] flex flex-col justify-center">
        <Navbar />

        <h1 className="text-4xl font-bold text-center text-primary-900 dark:text-primary-400">
          Frequently Asked Questions
        </h1>
        <Accordion type="single" collapsible className="w-full ">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold text-2xl">
              What can I list?
            </AccordionTrigger>
            <AccordionContent className="text-lg font-medium">
              Anything that a student could benefit from having. Textbooks,
              notebooks, calculators and anything you can think of.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold text-2xl">
              How are products shipped?
            </AccordionTrigger>
            <AccordionContent className="text-lg font-medium">
              Sellers negotiate with buyers to manage shipping and delivery of
              items. We do intend on adding a shipping feature to our platform
              in the near future.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold text-2xl">
              What's the sign up cost?
            </AccordionTrigger>
            <AccordionContent className="text-lg font-medium">
              The platform is free to use, sign up with your email. Click the button below to sign up now! 
              <Link to="/sign-up">
              <div className="bg-primary-400 w-fit px-3 py-2 rounded-xl mt-3 text-white">
                Sign Up
              </div>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ThemeProvider>
  );
};

export default Faq;
