import { supabase } from "@/lib/supabase/config";

export const getPurchasesById = async (id: string) => {
    try {
      let { data: purchases, error } = await supabase
        .from("purchases")
        .select("*")
        .eq("buyerId", id);
  
      if (error) throw Error;
      return purchases;

    } catch (error) {
      
    }
  };