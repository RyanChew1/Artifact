import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import Loader from "../Loader";
import { getUserWithId } from "@/lib/supabase/api";
import { IPurchase } from "@/types";
import { getProductById } from "@/services/apiProducts";

const numToCurrency = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
};

function formatTime(timeString: string) {
    const dateTime = new Date(timeString);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const second = dateTime.getSeconds();
  
    return `${year}-${padZero(month)}-${padZero(day)} ${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;
  }
  
  function padZero(number: number) {
    return (number < 10 ? '0' : '') + number;
  }

const OrderRow = ({ purchase }: { purchase: IPurchase }) => {
  const { toast } = useToast();

  const [seller, setSeller] = useState({
    avatarUrl: "",
    username: "",
    id: "",
    first: "",
    last: "",
  });

  console.log(purchase);

  const [product, setProduct] = useState({
    id: "",
    title: "Product Title",
    description: "Product Description",
    price: 0.0,
    imageUrl: "",
    sold: false,
    sellerId: "",
  });

  const { isLoading, data: response, error: err } = useQuery(
    ["productDetails", purchase.productId],
    ({ queryKey }) => {
      const productId = queryKey[1];
      return getProductById(productId ?? "default-id");
    }
  );

  if (err) {
    toast({
      title: "Error Loading Product",
      variant: "destructive",
    });
  }

  useEffect(() => {
    if (response?.length! > 0 && response) {
      setProduct(response[0]);
      console.log(response);
    }
  }, [response]);

  useEffect(() => {
    const seller = getUserWithId(product.sellerId);
    seller.then((response) => {
      setSeller({
        avatarUrl: response.imageUrl,
        username: response.username,
        id: response.id,
        first: response.first,
        last: response.last,
      });
    });
  });

  if (isLoading) return <Loader />;

  return (
    <div className="w-screen self-center justify-center">
      <Link to={`/product/${purchase.productId}`}>
        <div className="flex flex-row w-[90vw] mx-5 bg-primary-200 dark:bg-primary-400 bg-opacity-40 px-10 py-5 rounded-xl self-center">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <h1 className="font-bold text-3xl ml-6 mt-8">{product.title}</h1>
              <div className="self-end text-3xl font-bold ml-10 text-primary-900 dark:text-gray-200">
                {numToCurrency(product.price)}
                
              </div>
              
            </div>

            <div className="flex flex-row mt-3 ml-5">
              <Avatar>
                <AvatarImage src={seller.avatarUrl} />
                <AvatarFallback className="text-white rounded-full bg-slate-500">
                  {seller.first.charAt(0)}
                  {seller.last.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-2xl ml-5 font-bold">{seller.username}</h1>
              <h2 className="text-xl font-medium ml-20">

             {`Bought On: ${formatTime(purchase.created_at)}`}
              </h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default OrderRow;
