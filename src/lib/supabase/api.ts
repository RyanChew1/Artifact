import { supabase } from "@/lib/supabase/config";

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

  const user = addNewUserToDB(data.user?.id,email,username)

  if (!user) throw Error;

  return data;
}

export async function addNewUserToDB(
  id?:string,
  email?: string,
  username?: string,
) {
  const { data, error } = await supabase
  .from('users')
  .insert([
    { id: id, email: email, username:username },
  ])
  .select()

  if (error) throw Error;

  if (!data) throw Error;

  return data;
}

export async function signInWithEmail(email?: string, password?: string) {
  try {
    if (email && password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw Error;

      return data;

    } else throw Error;
  } catch (error) {
    console.log(error);
  }
}

// export async function getUserWithId(id?: string) {
//   try {
//     let { data: products, error } = await supabase.auth
//       .select("*")
//       .eq("id", id);

//     if (error) throw Error;
//     return products;
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function getUserWithSession() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

