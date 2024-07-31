import { IProductCard } from "@/types";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: IProductCard }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div
        className={`flex justify-center items-center rounded-xl h-[35vh] w-[35vh] bg-gray-500 bg-opacity-25 p-1`}
      >
        <div className="flex flex-col gap-2 h-full w-full justify-evenly mx-5 py-1">
          {/* Image */}
          <img
            src={product.image}
            className="h-[60%] aspect-square object-cover self-center"
          />

          {/* Title */}
          <h1 className="text-2xl font-extrabold">{product.title}</h1>

          {/* Price */}

          <div className="flex flex-row w-full justify-end">
            <div
              className={`${
                product.isSold ? "bg-red" : "bg-primary-400"
              } text-center p-1 px-3 font-regular text-sm self-end rounded-xl mr-5`}
            >
              {product.isSold ? "Sold" : "Available"}{" "}
            </div>

            {product.price == 0 ? (
              <p className="font-bold text-xl self-end">Free</p>
            ) : (
              <p className="font-bold text-xl self-end">
                {`$` + product.price}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
