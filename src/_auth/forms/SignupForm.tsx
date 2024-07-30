import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignupValidation } from "@/lib/validation";
import { signUpNewUser } from "@/lib/supabase/api";
import { useState } from "react";
import Loader from "@/components/Loader";
import { useToast } from "@/components/ui/use-toast";

const SignupForm = () => {
  const {toast} = useToast()
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      first: "",
      last: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (newUser: z.infer<typeof SignupValidation>) => {

    setIsLoading(true);
    try {
      const response = await signUpNewUser(
        newUser.email,
        newUser.password,
        newUser.username,
        newUser.first,
        newUser.last
      );

      console.log(response);
      if (!response) throw Error;
      
      setIsLoading(false)
      form.reset();
      navigate("/");
    } catch (error) {
      setIsLoading(false)
      toast({
        variant: "destructive",
        title: "Error creating account",
        description: "Please try again, make sure this email address has not been used before.",
      });
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="bg-gray-400 bg-opacity-30 w-[50vw]">
        <CardHeader className="flex justify-center text-center">
          <CardTitle className="text-3xl font-bold text-primary-400">
            Sign Up{" "}
          </CardTitle>
          <CardDescription className="text-lg font-medium text-black">
            Join Artifact Today for Free
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row h-fit text-black">
          <div className="w-[60%]  mx-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-[0.6rem]"
              >
                <FormField
                  control={form.control}
                  name="first"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <h1 className="font-semibold text-base">First Name</h1>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage className="text-red text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <h1 className="font-semibold text-base">Last Name</h1>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage className="text-red text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <h1 className="font-semibold text-base">Username</h1>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <FormMessage className="text-red text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <h1 className="font-semibold text-base">Email</h1>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="user@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage className="text-red text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <h1 className="font-semibold text-base">
                          Create Password
                        </h1>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage className="text-red text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <h1 className="font-semibold text-base">
                          Confirm Password
                        </h1>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage className="text-red text-[10px]" />
                    </FormItem>
                  )}
                />
                <Button
                  className="bg-primary-400 text-white font-bold w-[30%] py-3"
                  type="submit"
                >
                  {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
                </Button>
              </form>
            </Form>
          </div>
          <div className="inline-block w-0.5 self-stretch bg-neutral-100 dark:bg-white/10 mx-10"></div>
          <div className="w-fit flex flex-col justify-center">
            <ul className="flex flex-col h-fit space-y-10 font-bold text-md justify-center align-middle">
              <h1 className="text-center text-xl text-primary-200">
                Why Artifact?
              </h1>
              <li className="flex">
                <h1>1.&nbsp; </h1>{" "}
                <p className="font-medium">
                  Sell or donate unused educational materials
                </p>
              </li>
              <li className="flex">
                <h1>2.&nbsp; </h1>{" "}
                <p className="font-medium">
                  Buy or get for free educational materials
                </p>
              </li>
              <li className="flex">
                <h1>3.&nbsp; </h1>{" "}
                <p className="font-medium">
                  Build connections with your community
                </p>
              </li>
              <li className="flex">
                <h1>4.&nbsp; </h1>{" "}
                <p className="font-medium">
                  Provide educational experiences for all
                </p>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-small-regular text-black text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-400 text-small-bold font-bold ml-1"
            >
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupForm;
