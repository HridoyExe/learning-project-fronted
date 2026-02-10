import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchProduct = (
  currentPage,
  priceRange = [0, 10000],
  selectedCategory = "",
  searchQuery = "",
  ordering = ""
) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // Construct URL safely
      const url = `products/?price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&page=${currentPage}&category_id=${selectedCategory}&search=${encodeURIComponent(
        searchQuery
      )}&ordering=${ordering}`;

      try {
        const response = await apiClient.get(url);
        const data = response.data;

        setProducts(data.results || []);
        setTotalPages(
          data.results?.length ? Math.ceil(data.count / data.results.length) : 0
        );
      } catch (error) {
        console.log("Error fetching products:", error);
        setProducts([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, priceRange, selectedCategory, searchQuery, ordering]);

  return { products, loading, totalPages };
};

export default useFetchProduct;
