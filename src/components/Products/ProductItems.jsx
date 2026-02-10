import { Link } from "react-router";
import defaultImage from "../../assets/default_product.jpg";

const ProductItems = ({ product }) => {
  return (
    <Link to={`${product.id}`} className="block h-full">
      <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden h-full shadow-sm hover:shadow-lg transition-shadow duration-300">

        {/* Product Image */}
        <figure className="relative w-full h-64 bg-gray-100 overflow-hidden">
          <img
            src={product.images?.[0]?.image || defaultImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </figure>

        {/* Product Information */}
        <div className="p-4 flex flex-col h-[calc(100%-16rem)]">
          {/* Name */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-2 mb-1">
            <span className="text-xl font-bold text-blue-600">
              ${parseFloat(product.price).toFixed(2)}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 flex-grow">
            {product.description || "Quality product with excellent features."}
          </p>

          {/* CTA */}
          <button className="mt-4 w-full rounded-lg bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductItems;
