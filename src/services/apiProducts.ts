import { supabase } from "@/lib/supabase/config";

export const getProducts = async () => {
  try {
    let { data: products, error } = await supabase.from("products").select("*");

    console.log(products);

    if (error) throw Error;

    return products;
  } catch (error) {
    console.log(error);
  }
};
