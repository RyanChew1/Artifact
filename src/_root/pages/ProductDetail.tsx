import { getProductById } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const [product, setProduct] = useState({
    id: 0,
    title: "Product Title",
    description: "Product Description",
    price: 0.0,
    image: "",
    isSold: false,
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
    console.log(error);
  }

  useEffect(() => {
    if (response) {
      setProduct(response[0]);
    }
  }, [response]);

  console.log(product.title);

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
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
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
        <div>
          {/* Avatar */}
          <img src={""} className="h-5 w-5 aspect-square my-3" />
        </div>
        <h1 className="text-lg font-semibold">{product.description}</h1>
        <img src={product.image} className="h-[30vh] w-[30vh] aspect-square" />
        <div>
          {product.price == 0 ? (
            <p className="font-bold text-3xl self-end">Free</p>
          ) : (
            <p className="font-bold text-3xl self-end">{`$` + product.price}</p>
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
              <Link to="/">
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
