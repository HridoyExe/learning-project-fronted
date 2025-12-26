import defaultImage from "../../assets/default_product.jpg";


const ProductItems = ({ product }) => {
  return (
    // Product Card Container with Hover Effects
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 w-full max-w-sm">

      {/* Product Image Section */}
      <figure className="relative w-full h-60 overflow-hidden rounded-t-xl">
        <img
          // Displays the first product image, or a default image if none are available
          src={product.images?.[0]?.image || defaultImage}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Product Information Section */}
      <div className="p-4 flex flex-col items-center text-center">
        {/* Product Name (Truncated for long names) */}
        <h2 className="text-lg md:text-xl font-semibold truncate">
          {product.name}
        </h2>

        {/* Product Price (Formatted to 2 decimal places) */}
        <h3 className="text-red-600 font-bold text-lg md:text-xl mt-1">
          ${parseFloat(product.price).toFixed(2)}
        </h3>

        {/* Product Description (Limited to 2 lines) */}
        <p className="text-gray-600 text-sm md:text-base line-clamp-2 mt-2">
          {product.description}
        </p>

        {/* Buy Now Button */}
        <button className="btn btn-secondary mt-4 w-full md:w-auto">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductItems;