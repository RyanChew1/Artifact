import { IProductCard } from "@/types";
import { Link } from "react-router-dom";

const numToCurrency = (num:number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(num)
}

const ProductCard = ({ product }: { product: IProductCard }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div
        className={`flex justify-center items-center rounded-xl h-[35vh] w-[35vh] bg-gray-500 bg-opacity-25 p-1 object-scale-down`}
      >
        <div className="flex flex-col gap-2 h-full w-full justify-evenly mx-5 py-1">
          {/* Image */}
          <img
            src={product.imageUrl}
            className="h-[60%] aspect-square object-contain self-center"
          />

          {/* Title */}
          <h1 className="text-2xl font-extrabold">{product.title}</h1>

          {/* Price */}

          <div className="flex flex-row w-full justify-end">
            <div
              className={`${
                product.sold ? "bg-red" : "bg-primary-400"
              } text-center p-1 px-3 font-regular text-sm self-end rounded-xl mr-5`}
            >
              {product.sold ? "Sold" : "Available"}{" "}
            </div>

            {product.price == 0 ? (
              <p className="font-bold text-xl self-end">Free</p>
            ) : (
              <p className="font-bold text-xl self-end">
                {numToCurrency(product.price).toString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
