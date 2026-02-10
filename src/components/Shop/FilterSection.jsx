const FilterSection = ({ 
    priceRange,
    handlePriceChange,
    categories,
    selectedCategory,
    handleChangeCategory,
    searchQuery,
    handleSearchQuery,
    order,
    handleSortOrder
}) => {
    return (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Price Range */}
            <div className="bg-white rounded-lg shadow p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex items-center space-x-4">
                    <input
                        type="number"
                        min="0"
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                        className="border rounded-md p-2 w-20"
                    />
                    <input
                        type="range"
                        min="0"
                        max={priceRange[1]}
                        step="10"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                <div className="flex items-center space-x-4 mt-2">
                    <input
                        type="number"
                        min={priceRange[0]}
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                        className="w-20 p-2 border rounded-md"
                    />
                    <input
                        type="range"
                        min={priceRange[0]}
                        max="1000"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-lg shadow p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                    className="w-full border rounded-md p-2"
                    value={selectedCategory}
                    onChange={(e) => handleChangeCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full p-2 border rounded-md"
                />
            </div>

            {/* Sort */}
            <div className="bg-white rounded-lg shadow p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By Price</label>
                <select
                    className="w-full border p-2 rounded-md"
                    value={order}
                    onChange={(e) => handleSortOrder(e.target.value)}
                >
                    <option value="">Default</option>
                    <option value="price">Low to High</option>
                    <option value="-price">High to Low</option>
                </select>
            </div>

        </div>
    );
};

export default FilterSection;
