import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import { useAuth } from "@/context/AuthContext";
import OrderRow from "./orderRow";
import { getPurchasesById } from "@/services/apiPurchases";
import { IPurchase } from "@/types";

const OrderTable = () => {
  const { user } = useAuth();

  const userId = user?.id

  const {
    data: purchases,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["purchases", userId],
    queryFn: () => getPurchasesById(userId!),
  });

  if (error) {
    console.log(error);
  }

  if (isLoading) return <Loader />;

  if (purchases?.length == 0) return <><h1 className="text-bold text-2xl text-center mt-[30vh]">
     No Purchases
    </h1></>

    
  return (
    <div className=" grid grid-cols-1 gap-5 justify-center w-screen self-center">
      {purchases?.map((purchase:IPurchase) => (
        <OrderRow purchase={purchase} />
      ))}
    </div>
  );
};

export default OrderTable;