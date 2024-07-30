import { supabase } from "./config";

export async function signUpNewUser(
  email: string,
  password: string,
  username: string,
  first: string,
  last: string
) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: first,
        last_name: last,
        username: username,
      },
    },
  });

  if (error) throw Error;

  if (!data) throw Error;

  return data;
}

export async function signInWithEmail(email?: string, password?: string) {
  try {
    if (email && password){
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw Error;
      return data;
  
      if (!data) throw Error;
    } else throw Error;
    
  } catch (error) {
    console.log(error)
  }
  
}

export async function getUserWithSession() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
