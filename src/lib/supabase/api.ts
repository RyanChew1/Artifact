import { supabase } from "./config";

export async function signUpNewUser(email:string, password:string) {
    console.log("hihihihi")

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) throw Error

    const createdUser = await addNewUser(email)
    console.log("ehere")

    if (!data || !createdUser) throw Error;

    return data
  }


export async function addNewUser(email:string){
    const { data, error } = await supabase
  .from('users')
  .insert({
    email: email
  })
  .select()

  if (error) throw Error;
  

  return data;
}