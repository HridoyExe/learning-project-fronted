import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import AddToCartButton from "../components/ProductDetail/AddToCartButton";
import ProductImageGallery from "../components/ProductDetail/ProductImageGallery";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import ReviewSection from "../Reviews/ReviewSection";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiClient.get(`products/${productId}/`)
      .then(res => setProduct(res.data))
      .catch(err => {
        console.error(err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (!product)
    return (
      <div className="text-center py-10 text-lg text-red-500">
        Product Not Found...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/shop" className="inline-flex items-center text-sm hover:text-blue-600">
          <FaArrowLeft className="mr-2" /> Back to products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <ProductImageGallery images={product.images} ProductName={product.name} />

        <div className="flex flex-col h-full">
          <div>
            <div className="badge badge-outline mb-3">Category {product.category}</div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold">${product.price}</span>
              <span className="text-sm text-gray-500">(${product.price_with_tax} incl. tax)</span>
            </div>
            <p className="text-sm text-gray-600 mb-6">{product.description}</p>
            <div className="mb-8">
              <span className="block text-sm mb-2">Availability:</span>
              {product.stock > 0 ? (
                <span className="badge badge-success">In stock ({product.stock})</span>
              ) : (
                <span className="badge badge-error">Out of stock</span>
              )}
            </div>
          </div>
          <div className="mt-auto">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <ReviewSection />
    </div>
  );
};

export default ProductDetail;
