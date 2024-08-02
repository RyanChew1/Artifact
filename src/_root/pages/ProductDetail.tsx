import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { getUserWithId } from "@/lib/supabase/api";
import { getProductById } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const numToCurrency = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { user } = useAuth();

  const [product, setProduct] = useState({
    id: 0,
    title: "Product Title",
    description: "Product Description",
    price: 0.0,
    imageUrl: "",
    isSold: false,
    sellerId: "",
  });

  const {
    isLoading,
    data: response,
    error,
  } = useQuery(["productDetails", id], ({ queryKey }) => {
    const productId = queryKey[1];
    return getProductById(productId ?? "default-id");
  });

  if (error) {
    toast({
      title: "Error Loading Product",
      variant: "destructive",
    });
  }

  useEffect(() => {
    if (response) {
      setProduct(response[0]);
    }
  }, [response]);

  const [seller, setSeller] = useState({
    avatarUrl: "",
    username: "",
    id: "",
  });

  useEffect(() => {
    const seller = getUserWithId(product.sellerId);
    seller.then((response) => {
      setSeller({
        avatarUrl: response.imageUrl,
        username: response.username,
        id: response.id,
      });
    });
  });

  if (isLoading) return <Loader />;

  return (
    <div className="w-full h-full flex flex-row justify-center">
      <div className="flex flex-col justify-center">
        <div>
          <button onClick={() => navigate(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="#449DD1"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </div>

        <h1 className="text-5xl font-extrabold">{product.title}</h1>
        <Link to={`/profile/${product.sellerId}`}>
          <div className="flex flex-row">
            {/* Avatar */}
            <Avatar>
              <AvatarImage src={seller.avatarUrl} />
              <AvatarFallback className="text-white rounded-full bg-slate-500">
                {user?.user_metadata.first_name.charAt(0)}
                {user?.user_metadata.last_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-2xl font-bold ml-5 mt-1">
              {seller.username}
            </span>
          </div>
        </Link>
        <h1 className="text-lg font-semibold mt-3">Description:</h1>
        <h1 className="text-lg font-medium mb-5">{product.description}</h1>
        <img
          src={product.imageUrl}
          className=" w-[30vh] max-h-[60vh] aspect-auto mb-5 object-contain"
        />
        <div>
          {product.price == 0 ? (
            <p className="font-bold text-3xl self-end">Free</p>
          ) : (
            <p className="font-bold text-3xl self-end">
              {numToCurrency(product.price)}
            </p>
          )}
        </div>
        <div>
          {product.isSold ? (
            <div className="font-bold text-xl self-end w-fit bg-red px-10 py-3 rounded-xl mt-3 text-white">
              Sold
            </div>
          ) : (
            <div className="flex flex-col">
              <button className="font-bold text-xl w-fit bg-primary-400 px-10 py-3 rounded-xl mt-3 text-white">
                Buy
              </button>
              <Link to={`/message/${seller.id}`}>
                <button className="font-bold text-xl bg-gray-500 px-10 py-3 rounded-xl mt-3 text-white">
                  Message
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
