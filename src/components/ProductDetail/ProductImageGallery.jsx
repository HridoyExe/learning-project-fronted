import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import defaultImage from "../../assets/images/default_product.jpg";

const ProductImageGallery = ({ images, ProductName }) => {
  const displayImages =
    images && images.length > 0
      ? images
      : [{ image: defaultImage }];

  return (
    <div className="bg-base-100 border rounded-xl overflow-hidden shadow-sm">
      <Swiper
        modules={[Navigation]}
        navigation
        className="aspect-square"
      >
        {displayImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center justify-center h-full p-6">
              <img
                src={img.image}
                alt={ProductName}
                className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageGallery;
