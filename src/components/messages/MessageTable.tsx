import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import MessageRow from "./MessageRow";
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

  if (messages?.length == 0) return <><h1 className="text-bold text-2xl text-center mt-[30vh]">
     No Messages
    </h1></>

    const userIdOnes = messages?.map((message) => message.userIdOne)
    const userIdTwos = messages?.map((message) => message.userIdTwo)

    let uniqueUserIds = new Set(userIdOnes?.concat(userIdTwos))
    uniqueUserIds.delete(user?.id)

    let uniqueUserIdArray = [...uniqueUserIds]
    
  return (
    <div className=" grid grid-cols-1 gap-5 justify-center w-screen">
      {uniqueUserIdArray?.map((id:string) => (
        <MessageRow userId={id} />
      ))}
    </div>
  );
};

export default MessageTable;