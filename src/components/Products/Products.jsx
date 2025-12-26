import { useEffect, useState } from "react";
import ProductItems from "./ProductItems";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import ErrorAlert from "../ErrorAlert";
import apiClient from "../../services/api-client"; // Assuming API client setup

/**
 * Renders the section for 'Trending Products' as a carousel.
 * Fetches product data from the API upon component mount.
 */
const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Data fetching effect
  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/products/") // Adjust endpoint as needed
      .then((res) => setProducts(res.data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            Trending Products
          </h2>
          <a
            href="#" // Placeholder link for "View All"
            className="btn btn-secondary px-6 py-3 rounded-full text-lg hover:scale-105 transition-transform duration-200"
          >
            View All
          </a>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-xl text-secondary"></span>
          </div>
        )}

        {/* Error Alert */}
        {error && <ErrorAlert error={error} />}

        {/* Product Carousel (Swiper) */}
        {!isLoading && !error && products.length > 0 && (
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            breakpoints={{ // Responsive settings for number of slides
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="mt-6"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="flex justify-center">
                {/* Wrapper div for consistent sizing inside SwiperSlide */}
                <div className="w-full max-w-xs"> 
                  <ProductItems product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Empty State Message */}
        {!isLoading && !error && products.length === 0 && (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No Products Available
          </p>
        )}
      </div>
    </section>
  );
};

export default Product;