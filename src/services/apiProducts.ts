import { supabase } from "@/lib/supabase/config";

export const getProducts = async () => {
  try {
    let { data: products, error } = await supabase.from("products").select("*");

    if (error) throw Error;

    return products;
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (
  sellerId: string,
  title: string,
  description: string,
  price: number
) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          sellerId: sellerId,
          title: title,
          description: description,
          price: price,
        },
      ])
      .select();

    if (error) throw Error;

    console.log(data);
    return data;
  } catch (error) {
    console.log("err");
    console.log(error);
  }
};
