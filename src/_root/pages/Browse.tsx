import ProductTable from "@/components/products/ProductTable";

const Browse = () => {
  return (
    <div className="flex justify-center min-w-full h-full">
      <div className="flex flex-col justify-center h-full">
        <h1 className="text-3xl font-bold text-center mb-5">Browse Products</h1>
        <ProductTable />
      </div>
    </div>
  );
};

export default Browse;
