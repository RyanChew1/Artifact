import MessageTable from "@/components/messages/MessageTable";

const MessageHome = () => {
  return <div className="ml-20">
    <h1 className="text-5xl font-bold mt-5 mb-10">Messages</h1>
    <MessageTable />
  </div>;
};

export default MessageHome;
