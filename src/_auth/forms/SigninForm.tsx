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
import { SigninValidation } from "@/lib/validation";
import { signInWithEmail } from "@/lib/supabase/api";

const SigninForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (userSignin: z.infer<typeof SigninValidation>) => {
    try {
      const response = await signInWithEmail(
        userSignin.email,
        userSignin.password
      );

      if (!response) throw Error;

      form.reset();
      navigate("/");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <Card className="bg-gray-400 bg-opacity-30 w-[40vw]">
        <CardHeader className="flex justify-center text-center">
          <CardTitle className="text-3xl font-bold text-primary-400">
            Log In{" "}
          </CardTitle>
          <CardDescription className="text-lg font-medium">
            Log In To Your Account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row h-fit justify-center">
          <div className="w-[60%]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <h1 className="font-semibold text-base">Email</h1>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <h1 className="font-semibold text-base">Password</h1>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" className="text-black"/>
                      </FormControl>
                      <FormMessage className="text-red text-[10px]" />
                    </FormItem>
                  )}
                />
                <Button
                  className="bg-primary-400 text-white font-bold w-[30%] py-3 justify-self-center"
                  type="submit"
                >
                  Log In
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-small-regular text-black text-center mt-2">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-primary-400 text-small-bold font-bold ml-1"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SigninForm;
