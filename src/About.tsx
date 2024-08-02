import Navbar from "./components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const About = () => {
  return (
    <ThemeProvider>
      <div className="w-full px-[10vw] flex flex-col justify-center">
        <Navbar />
        <h1 className="text-4xl font-bold text-center text-primary-900 dark:text-primary-400">
          About Us
        </h1>
        <p className="mt-10 font-semibold leading-loose text-xl  w-[30vw] self-center">
          Artifact is a platform for students by students. So many students lack
          opportunities because of their lack of materials. Whether that be a
          textbook, a calculator, or a laptop. We've all heard that one man's
          trash is another man's treasure. Which is why we encourage students to
          donate their old materials to help those who need it. After you're
          done with your AP Calculus textbook, go ahead and donate it to others
          and maybe even make some money off of it. Artifact allows all students
          regardless of background to have educational resources because we
          believe that students shouldn't be limited by a situation out of their
          control.
        </p>
      </div>
    </ThemeProvider>
  );
};

export default About;
