import { useState } from "react";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import useFetchProduct from "../../hooks/useFetchProducts";
import FilterSection from "./FilterSection";
import useFetchCategory from "../../hooks/useFetchCategory";

const ShopPage = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortOrder, setSortOrder] = useState("")

    const { products, loading, totalPages } = useFetchProduct(
        currentPage,
        priceRange,
        selectedCategory,
        searchQuery,
        sortOrder
    )

    const categories = useFetchCategory();

    const handlePriceChange = (index, value) => {
        setPriceRange((prev) => {
            const newRange = [...prev];
            newRange[index] = value;
            return newRange;
        })
        setCurrentPage(1)
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Shop Our Products</h1>

            <FilterSection
                priceRange={priceRange}
                handlePriceChange={handlePriceChange}
                categories={categories}
                selectedCategory={selectedCategory}
                handleChangeCategory={setSelectedCategory}
                searchQuery={searchQuery}
                handleSearchQuery={setSearchQuery}  
                sortOrder = {sortOrder}
                handleSortOrder = {setSortOrder}
            />


            <ProductList products={products} loading={loading} />

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={setCurrentPage}
            />
        </div>
    );
};

export default ShopPage;



/* const fetchProducts = ()=> {
     setLoading(true)
     apiClient
         .get("/products/")
         .then((res)=> {
             console.log(res.data)
             setProducts(res.data.results);
             setTotalPages(Math.ceil(res.data.count / res.data.results.length));
 
         })
         .catch((error)=> console.log(error))
         .finally(()=> setLoading(false))
 
 }
 */