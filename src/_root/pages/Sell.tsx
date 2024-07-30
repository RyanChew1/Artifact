import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { UploadProductValidation } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { getUserWithSession } from "@/lib/supabase/api";
import { useEffect, useState } from "react";
import { addProduct } from "@/services/apiProducts";
import { useToast } from "@/components/ui/use-toast";

const Sell = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UploadProductValidation>>({
    resolver: zodResolver(UploadProductValidation),
    defaultValues: {
      title: "",
      description: "",
      price: 0.0,
      imageUrl: "",
    },
  });

  interface User {
    id: string;
  }
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserWithSession()
      .then((response) => setUser(response))
      .catch(console.error);
  }, []);

  const onSubmit = async (
    productInfo: z.infer<typeof UploadProductValidation>
  ) => {
    if (user) {
      const newProduct = addProduct(
        user.id,
        productInfo.title,
        productInfo.description,
        productInfo.price
      );
      if (!newProduct) throw Error;
      console.log(newProduct);
    } else throw Error;

    try {
      toast({
        variant: "green",
        title: "Product Succesfully Uploaded",
        description: productInfo.title,
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Uploading Product",
        description: "Please try again later",
      });
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center mt-10">
      <div className="flex flex-row justify-center ">
        <Card className="w-[80%] bg-gray-300 py-10 px-5 dark:text-black">
          <CardTitle className="text-3xl font-bold mb-5">
            List a Product
          </CardTitle>
          <CardContent>
            {/* List New */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <h1 className="font-semibold text-base">
                          Product Title
                        </h1>
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <h1 className="font-semibold text-base">
                          Short description of product (include condition)
                        </h1>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" className="text-black" />
                      </FormControl>
                      <FormMessage className="text-red text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <h1 className="font-semibold text-base">Price</h1>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" className="text-black" />
                      </FormControl>
                      <FormMessage className="text-red text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <h1 className="font-semibold text-base">
                          Upload Product Image
                        </h1>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="file"
                          className="text-black bg-primary-500 bg-opacity-50"
                        />
                      </FormControl>
                      <FormMessage className="text-red text-[10px]" />
                    </FormItem>
                  )}
                />

                <Button
                  className="bg-primary-400 text-white text-2xl font-bold w-full py-7 justify-self-center"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Your Products */}
      <div>
        <h1 className="text-3xl font-bold mt-5 ml-10">Your Products</h1>
      </div>
    </div>
  );
};

export default Sell;
