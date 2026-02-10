import { useEffect, useState } from "react";
import ProductItems from "./ProductItems";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import ErrorAlert from "../ErrorAlert";
import apiClient from "../../services/api-client";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/products/")
      .then((res) => setProducts(res.data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Trending Products
            </h2>
            <p className="text-gray-600 mt-2">
              Discover our most popular items
            </p>
          </div>

          <Link
            to="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All Products →
          </Link>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-24">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {/* Error */}
        {error && <ErrorAlert error={error} />}

        {/* Products Slider */}
        {!isLoading && !error && products.length > 0 && (
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            navigation
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="h-auto">
                <ProductItems product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Empty */}
        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-24 text-gray-500">
            No products available
          </div>
        )}
      </div>
    </section>
  );
};

export default Product;
