import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const BestSeller = () => {
  const products = useSelector((state) => state?.product?.products);
  const cart = useSelector((state) => state?.cart?.cart);
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product?._id}
            cart={cart?.items}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
