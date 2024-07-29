import { supabase } from "./config";

export async function signUpNewUser(email:string, password:string) {

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) throw Error

    if (!data) throw Error;

    return data
  }

  export async function signInWithEmail(email:string, password:string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) throw Error

    if (!data) throw Error;

    return data
  }