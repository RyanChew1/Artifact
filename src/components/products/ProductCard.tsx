const ProductCard = (productId: string) => {

    return (
        <div
          className={`flex justify-between items-center rounded-xl`}>
          <div className="flex gap-2 mr-5">
            {/* Title */}
            <p className="small-medium lg:base-medium">{productId}</p>
            {/* Image */}
            <img src="" className="h-10 w-10"/>
            {/* Price */}
            <p>{productId}</p>
          </div>
        </div>
      );
}

export default ProductCard
