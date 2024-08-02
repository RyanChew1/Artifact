import Loader from "@/components/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { getUserWithId } from "@/lib/supabase/api";
import { deleteProduct, getProductById, sell } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
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
    id: "",
    title: "Product Title",
    description: "Product Description",
    price: 0.0,
    imageUrl: "",
    sold: false,
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
    if (response?.length! > 0 && response) {
      setProduct(response[0]);
      console.log(response);
    }
  }, [response]);

  const [seller, setSeller] = useState({
    avatarUrl: "",
    username: "",
    id: "",
    first: "",
    last: "",
  });

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

  const handleBuy = async () => {
    const data = await sell(product.id, user?.id!);
    if (data) {
      toast({
        title: "Product Sold",
        variant: "green",
      });
    } else {
      toast({
        title: "Error Selling Product",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      toast({
        title: "Product Deleted Succesfully",
        variant: "green",
      });
      navigate(-1);
    } catch (error) {
      toast({
        title: "Error Deleting Product",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <Loader />;

  console.log(product.id);

  if (product.id == "")
    return (
      <div className="flex flex-col justify-center w-full">
        <h1 className="text-center font-bold text-3xl text-primary-400 dark:text-secondary-500 mt-[30vh]">
          Product Not Found :(
        </h1>
        <Link className="self-center bg-primary-400 px-3 py-2 mt-3 rounded-xl font-bold text-xl" to="/browse">
          Return to Browsing
        </Link>
      </div>
    );

  if (product.sellerId == user?.id)
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
                  {seller.first.charAt(0)}
                  {seller.last.charAt(0)}
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
          <button
            onClick={handleDelete}
            className="bg-red rounded-xl px-3 py-2 mt-3 w-fit font-bold"
          >
            Delete
          </button>
        </div>
      </div>
    );

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
                {seller.first.charAt(0)}
                {seller.last.charAt(0)}
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
          {product.sold ? (
            <div className="font-bold text-xl self-end w-fit bg-red px-10 py-3 rounded-xl mt-3 text-white">
              Sold
            </div>
          ) : (
            <div className="flex flex-col">
              <Drawer>
                <DrawerTrigger className="font-bold text-xl w-fit bg-primary-400 px-10 py-3 rounded-xl mt-3 text-white">
                  Buy
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle className="text-center text-2xl">
                      Purchase: {product.title}
                    </DrawerTitle>
                    <DrawerDescription className="text-center font-bold text-xl">
                      {numToCurrency(product.price)}
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button
                      onClick={handleBuy}
                      className="bg-primary-400 w-fit self-center"
                    >
                      Submit
                    </Button>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
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
