const ProductCard = () => {
  return (
    <div className="bg-card dark:bg-card-foreground text-card-foreground dark:text-card p-4 rounded-lg shadow-md max-w-xs">
      <img src="" alt="Product Image" className="w-full h-40 object-cover rounded-lg mb-2" />
      <h3 className="text-lg font-semibold mb-1">Product Title</h3>
      <p className="text-sm text-muted mb-1">Seller: Seller Name</p>
      <p className="text-base font-semibold mb-1">Price: $100</p>
      <p className="text-sm">Condition: New</p>
    </div>
  );
}
export default ProductCard;