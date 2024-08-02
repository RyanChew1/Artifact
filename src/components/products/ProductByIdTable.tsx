import { deleteProduct, getProductsBySeller } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import ProductCard from "./ProductCard";
import { IProductCard } from "@/types";
import { useToast } from "../ui/use-toast";
import { useAuth } from "@/context/AuthContext";

const ProductIdTable = (id: any) => {
  const { toast } = useToast();

  const { user } = useAuth();



  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["productsBySeller", id.id],
    queryFn: () => getProductsBySeller(id.id),
    refetchInterval: 30 * 1000, // 30 seconds
  });

  if (error) {
    console.log(error);
  }
  if (isLoading) return <Loader />;

  const handleSubmit = async (productId: string) => {
    const response = await deleteProduct(productId);
    if (response == "error") {
      toast({
        variant: "destructive",
        title: "Error deleting product",
        description: "Please try again",
      });
    } 
  };

  return (
    <div className="grid grid-cols-1 ss:grid-cols-2 md:grid-cols-3 rg:grid-cols-3 lg:grid-cols-4 gap-5 ml-10 mt-3 overflow-x-hidden">
      {products?.map((product: IProductCard) => (
        <div>
          <div className="flex flex-col">
            {(user?.id ==product?.sellerId) ?  <button
              className="self-start bg-red p-3 rounded-xl my-2 relative top-[4rem] left-2"
              onClick={() => {
                handleSubmit(product.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button> : <></> }
           
          </div>
          <ProductCard key={product.id} product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductIdTable;
