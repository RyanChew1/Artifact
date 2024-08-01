import { getProducts } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import ProductCard from "./ProductCard";
import { IProductCard } from "@/types";

const ProductTable = () => {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
    refetchInterval: 30 * 1000, //30 seconds
  });

  if (error) {
    console.log(error);
  }

  console.log(products);

  if (isLoading) return <Loader />;

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {products?.map((product: IProductCard) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductTable;
