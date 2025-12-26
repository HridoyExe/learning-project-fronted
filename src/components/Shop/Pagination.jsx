const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    return (
        <div className="flex justify-center">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    className={`rounded mx-1 px-3 py-2 mb-6 btn ${currentPage === i + 1 ? "bg-secondary text-white" : "bg-gray-200"}`}
                    onClick={() => handlePageChange(i + 1)}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
