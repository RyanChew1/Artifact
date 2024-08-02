import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { getUserWithId } from "@/lib/supabase/api";
import {
  createMessage,
  getMessages,
  sendMessage,
} from "@/services/apiMessages";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Messages = () => {
  const { toast } = useToast();
  const { id } = useParams();

  const { user } = useAuth();

  const [messages, setMessages] = useState([] as any[]);

  const { refetch } = useQuery({
    queryKey: ["messages", user?.id],
    queryFn: () => getMessages(user?.id!),
  });

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getMessages(id!);
      if (response?.length === 0) {
        createMessage(user?.id!, id!);
      }
      setMessages(response as any[]);
    };
    fetchMessages();
  }, [id, user]);

  const checkIsUser = (sender: number, userOne: string, userTwo: string) => {
    if (sender == 1) {
      if (user?.id == userOne) return true;
      return false;
    }
    if (sender == 2) {
      if (user?.id == userTwo) return true;
      return false;
    }
    return false;
  };

  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (message != "") {
      const messages = sendMessage(user?.id!, id!, 1, message);
      if (!messages) {
        toast({
          title: "Error could not send message",
          variant: "destructive",
        });
      } else {
        refetch();
        setMessage("");
        window.location.reload()
      }
    }
  };

  const [seller, setSeller] = useState({
    avatarUrl: "",
    username: "",
    first: "",
    last: ""
  });

  useEffect(() => {
    const seller = getUserWithId(id!);
    seller.then((response) => {
      setSeller({
        avatarUrl: response.imageUrl,
        username: response.username,
        first: response.first,
        last: response.last
      });
    });
  });

  return (
    <div>
      <div className="flex flex-row justify-center">
            {/* Avatar */}
            <Avatar className="h-20 w-20">
              <AvatarImage src={seller.avatarUrl} />
              <AvatarFallback className="text-white rounded-full bg-slate-500 text-2xl">
                {seller.first.charAt(0)}
                {seller.last.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-3xl font-bold ml-5 mt-4">
              {seller.username}
            </span>
          </div>
      <div>
        <div className="flex flex-col justify-center w-full mt-10">
          <div className="flex flex-col self-center w-[80vw] min-h-[85vh] bg-gray-700 bg-opacity-50 rounded-xl px-5 pt-10 pb-[7rem] justify-start space-y-3">
            {messages.map((message, index) => (
              <div className="w-full">
                <p
                  className={`bg-secondary-500 p-2 rounded-xl font-bold w-fit ${
                    message.sender == 0
                      ? "w-full text-center bg-gray-600 dark:bg-dark-5 font-semibold text-white"
                      : ""
                  }${
                    checkIsUser(
                      message.sender,
                      message.userIdOne,
                      message.userIdTwo
                    )
                      ? "text-center bg-primary-200 text-white"
                      : ""
                  }`}
                  key={index}
                >
                  {message.messageContent}
                </p>
              </div>
            ))}
          </div>

          <div className="fixed bottom-10 left-0 right-0 ml-auto mr-auto w-[75vw] bg-slate-500 rounded-xl px-5 py-2 flex justify-between">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-10 resize-none bg-transparent border-0 focus:outline-none"
            />
            <button className="relative" onClick={handleSend}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
