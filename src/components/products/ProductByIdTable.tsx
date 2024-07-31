import { deleteProduct, getProductsBySeller } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import ProductCard from "./ProductCard";
import { IProductCard } from "@/types";
import { useToast } from "../ui/use-toast";

const ProductIdTable = (id: any) => {
    const {toast} = useToast();

  const { data:products, error, isLoading } = useQuery({
    queryKey: ['productsBySeller', id.id],
    queryFn: () => getProductsBySeller(id.id),
    refetchInterval: 15*1000 // 15 seconds
  });

  if (error) {
    console.log(error);
  }
  if (isLoading) return <Loader />;

  const handleSubmit = async(productId:string) => {
    const response = await deleteProduct(productId)
    if (response == 'error'){
        toast({
            variant: "destructive",
            title: "Error deleting product",
            description: "Please try again",
          });
    } else {
       window.location.reload()
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 ml-10 mt-3">
        
      {products?.map((product: IProductCard) => (
        <div>
            <div className="flex flex-col">
            <button className="self-start bg-red p-3 rounded-xl my-2" onClick={() => {handleSubmit(product.id)}}>Delete</button>
            </div>
        <ProductCard key={product.id} product={product} />
        </div>
      ))}
    
    </div>
  );
};

export default ProductIdTable;
