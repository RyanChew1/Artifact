import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col align-center justify-center h-full">
      <div className="flex space-x-7 justify-center align-center  h-full mt-20 mx-20">
        <Card className="text-5xl text-black bg-secondary-500 dark:text-white dark:bg-gray-900 bg-opacity-50 w-[50%] h-fit py-10 border-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Sell Materials</CardTitle>
            <CardDescription className="text-xl">
              Donate or sell your old textbooks and educational materials to
              others!
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <Link to="/sell">
              <Button className="bg-primary-400 dark:bg-primary-900 text-3xl p-10 font-semibold ">
                Sell Now
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="text-5xl text-black bg-secondary-500 dark:text-white dark:bg-gray-900 bg-opacity-50 w-[50%] h-fit py-10 border-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Find Materials</CardTitle>
            <CardDescription className="text-xl">
              Shop for free or discounted used materials from others in your
              community!
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <Link to="/browse">
              <Button className="bg-primary-400  dark:bg-primary-900 text-3xl p-10 font-semibold border-0">
                Browse Now
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;
