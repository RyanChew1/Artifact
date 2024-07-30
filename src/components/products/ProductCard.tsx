import { IProductCard } from '@/types';


const ProductCard = ({ product }: { product: IProductCard }) => {
  return (
    <div className={`flex justify-between items-center rounded-xl`}>
      <div className="flex gap-2 mr-5">
        {/* Title */}
        <p className="small-medium lg:base-medium">{product.title}</p>
        {/* Image */}
        <img src={product.image} className="h-10 w-10" />
        {/* Price */}
        <p>{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;