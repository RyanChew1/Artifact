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

  const user = addNewUserToDB(data.user?.id, email, username);

  if (!user) throw Error;

  return data;
}

export async function addNewUserToDB(
  id?: string,
  email?: string,
  username?: string
) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ id: id, email: email, username: username }])
    .select();

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

export async function getUserWithId(id: string) {
  try {
    let { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id);

    if (error) throw Error;

    let returnUser = user![0];

    return returnUser;
  } catch (error) {
  }
}

export async function getUserWithSession() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export const updateUsername = async (newUsername: string, user: any) => {
  console.log(user);
  try {
    let { data, error } = await supabase
      .from("users")
      .update({ username: newUsername })
      .eq("id", user?.id);

    if (error) throw Error;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAvatar = async (newImage: File, user: any) => {

  const imageName = `${Math.random()}-${newImage.name}`
    .replaceAll("/", "")
    .replaceAll("\\", "")
    .replaceAll(" ", "%20");

  const imagePath:string = `${
    import.meta.env.VITE_PROJECT_URL
  }/storage/v1/object/public/avatars/${imageName}`;

  try {
    let { error } = await supabase
      .from("users")
      .update({ imageUrl:  imagePath})
      .eq("id", user?.id);


    if (error) throw Error;

    const { error: errorStorage } = await supabase.storage
      .from("avatars")
      .upload(imageName, newImage);

    if (errorStorage) throw Error;

    return imagePath;
  } catch (error) {
    console.log(error);
  }
};
