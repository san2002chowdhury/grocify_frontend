import { useDispatch, useSelector } from "react-redux";
import { API_URL_BASE } from "../constants/api";
import { currencySign } from "../assets/asset";
import {
  getEveryProducts,
  updateProductStock,
} from "../redux/features/product/productThunk";

const ProductList = () => {
  const dispatch = useDispatch();

  const { products, page, hasMore, loading } = useSelector(
    (state) => state.product,
  );

  const loadMore = () => {
    if (hasMore && !loading) {
      dispatch(getEveryProducts({ page: page + 1, limit: 10 }));
    }
  };

  const handleStock = (e, id) => {
    dispatch(updateProductStock({ id: id, inStock: e.target.checked }));
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>

        <div className="max-w-4xl w-full rounded-md bg-white border border-gray-500/20">
          <div className="max-h-[70vh] overflow-y-auto">
            <table className="w-full">
              <thead className="text-gray-900 text-sm text-left sticky top-0 bg-white z-10">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold hidden md:block">
                    Selling Price
                  </th>
                  <th className="px-4 py-3 font-semibold">In Stock</th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-500">
                {products.map((product) => (
                  <tr key={product._id} className="border-t border-gray-500/20">
                    <td className="px-4 py-3 flex items-center space-x-3">
                      <div className="border border-gray-300 rounded overflow-hidden">
                        <img
                          src={`${API_URL_BASE}${product.images[0]}`}
                          alt="Product"
                          className="w-16"
                          loading="lazy"
                        />
                      </div>

                      <span className="truncate max-sm:hidden w-full">
                        {product.name}
                      </span>
                    </td>

                    <td className="px-4 py-3">{product.category?.name}</td>

                    <td className="px-4 py-3 max-sm:hidden">
                      {currencySign}
                      {product.offerPrice}
                    </td>

                    <td className="px-4 py-3">
                      <label className="relative inline-flex items-center cursor-pointer gap-3">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={product.inStock}
                          onChange={(e) => handleStock(e, product?._id)}
                        />

                        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-primary transition-colors"></div>

                        <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {hasMore && (
          <div className="text-center mt-4">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-primary text-white rounded"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
