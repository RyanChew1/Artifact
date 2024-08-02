import { supabase } from "@/lib/supabase/config";

export const getProducts = async () => {
  try {
    let { data: products, error } = await supabase.from("products").select("*").eq("sold", false);

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
  price: number,
  imageUrl: any
) => {
  const imageName = `${Math.random()}-${imageUrl[0].path}`
    .replaceAll("/", "")
    .replaceAll("\\", "")
    .replaceAll(" ", "%20");

  const imagePath = `${
    import.meta.env.VITE_PROJECT_URL
  }/storage/v1/object/public/productImages/${imageName}`;
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          sellerId: sellerId,
          title: title,
          description: description,
          price: price,
          imageUrl: imagePath,
        },
      ])
      .select();

    if (error) throw Error;

    console.log(imageName);

    const { error: errorStorage } = await supabase.storage
      .from("productImages")
      .upload(imageName, imageUrl[0]);

    if (errorStorage) throw Error;

    return data;
  } catch (error) {
    console.log("err");
    console.log(error);
  }
};

export const sell = async (productId:string, buyerId:string) => {
  try {
    console.log(productId)
    let { error } = await supabase
    .from("products")
    .update({ sold:  true, buyerId: buyerId})
    .eq("id",productId)
    .select()

    if (error) throw Error

    const { data, error:errorPurchase } = await supabase
    .from("purchases")
    .insert([
      {
        buyerId: buyerId,
        productId: productId
      },
    ])
    .select();

    if (errorPurchase) throw Error

    return data

  } catch (error) {
    console.log(error)
  }
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
    return "error";
  }
};
