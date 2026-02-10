const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    return (
        <div className="flex justify-center my-8 flex-wrap gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-2 rounded-md transition ${
                        currentPage === i + 1
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
