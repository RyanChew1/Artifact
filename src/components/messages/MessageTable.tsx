import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import MessageRow from "./MessageRow";
import { IMessageRow } from "@/types";
import { getMessages } from "@/services/apiMessages";
import { useAuth } from "@/context/AuthContext";

const MessageTable = () => {
  const { user } = useAuth();

  const userId = user?.id

  const {
    data: messages,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["messages", userId],
    queryFn: () => getMessages(userId!),
  });

  if (error) {
    console.log(error);
  }

  if (isLoading) return <Loader />;

  console.log(messages)
  if (messages?.length == 0) return <><h1 className="text-bold text-2xl text-center mt-[30vh]">
     No Messages
    </h1></>

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {messages?.map((message: IMessageRow) => (
        <MessageRow key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageTable;