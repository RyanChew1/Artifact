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

export const markSold = async () => {
  try {
  } catch (error) {}
};

export const getProductById = async (id: string) => {
  try {
    let { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id);

    if (error) throw Error;
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsBySeller = async (id: string) => {
  try {
    let { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("sellerId", id);

    if (error) throw Error;

    return products;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    let { data, error } = await supabase.from("products").delete().eq("id", id);

    if (error) throw Error;

    return data;
  } catch (error) {
    console.log(error);
    return 'error';
  }
};
