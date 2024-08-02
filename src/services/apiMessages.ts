import { supabase } from "@/lib/supabase/config";

export const getMessages = async (id: string) => {
  try {
    let { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .or(`userIdOne.eq.${id},userIdTwo.eq.${id}`);

    if (error) throw Error;

    return messages;
  } catch (error) {
    console.log(error);
  }
};

export const getMessageConvo = async (id: string, id2:string) => {
  try {
    let { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .or(`userIdOne.eq.${id},userIdTwo.eq.${id}`)
      .or(`userIdOne.eq.${id2},userIdTwo.eq.${id2}`);

    if (error) throw Error;

    return messages;
  } catch (error) {
    console.log(error);
  }
};

export const createMessage = async (id1: string, id2: string) => {
  try {
    let { data: messages, error } = await supabase
      .from("messages")
      .insert({
        userIdOne: id1,
        userIdTwo: id2,
        messageContent: "Start of Messages",
        sender: 0,
      })
      .select("*");

    if (error) throw Error;

    return messages;
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (
  id1: string,
  id2: string,
  sender: number,
  messageContent: string
) => {
  try {
    let { data: messages, error } = await supabase
      .from("messages")
      .insert({
        userIdOne: id1,
        userIdTwo: id2,
        messageContent: messageContent,
        sender: sender,
      })
      .select("*");

    if (error) throw Error;

    return messages;
  } catch (error) {
    console.log(error);
  }
};
