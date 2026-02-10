import ProductItems from "../Products/ProductItems";

const ProductList = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen">
        <span className="loading loading-spinner loading-xl text-blue-600"></span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        No Products Available
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products.map((product) => (
          <ProductItems key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
