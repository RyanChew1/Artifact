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
import ProductIdTable from "@/components/products/ProductByIdTable";
import FileUploader from "@/components/FileUploader";

const Sell = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UploadProductValidation>>({
    resolver: zodResolver(UploadProductValidation),
    defaultValues: {
      title: "",
      description: "",
      price: 0.0,
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
        productInfo.price,
        productInfo.imageUrl
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
    <div className="flex flex-col justify-center mt-10 max-w-[100vw]">
      <div className="flex flex-row justify-center ">
        <Card className="w-[80%]  bg-gray-300 dark:bg-gray-700 border-none py-10 px-5">
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
                          Product Title (*)
                        </h1>
                      </FormLabel>
                      <FormControl>
                        <Input className="text-black" {...field} />
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
                          Short description of product
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
                          Upload Product Image (*)
                        </h1>
                      </FormLabel>
                      <FormControl>
                        <FileUploader
                          fieldChange={field.onChange}
                          mediaUrl={""}
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
      <div className="mb-10 self-center sm:ml-0 sm:pl-0">
        <h1 className="text-4xl font-bold mt-5 ml-10 sm:ml-0 self-center text-center">
          Your Products
        </h1>
        {user ? <ProductIdTable id={user.id} /> : <></>}
      </div>
    </div>
  );
};

export default Sell;
