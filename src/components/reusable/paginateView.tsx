interface PaginationProps {
  totalPages: number;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  handlePageSelect: (page: number) => void;
  pageCount: number;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
}

export const MobilePaginateView = ({
  setPageCount,
  totalPages,
  pageNumber,
  setPageNumber,
  handlePageSelect,
  pageCount,
}: PaginationProps) => {
  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1, 2];

    if (pageNumber > 4) {
      pages.push("...");
    }

    const start = Math.max(3, pageNumber - 1);
    const end = Math.min(totalPages - 2, pageNumber + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (pageNumber < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages - 1, totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col md:hidden items-center gap-4 mt-8">
      <div className="flex gap-2">
        {getVisiblePages().filter(page => typeof page === 'number').map((page, i) => (
          <button
            key={i}
            onClick={() => typeof page === 'number' && handlePageSelect(page)}
            className={`px-2 md:px-4 2 rounded-md ${
              page === pageNumber ? "text-[#AB28B2] " : "text-black "
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center gap-8 mt-4">
        <div className="flex gap-2">
          <button
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber === 1}
            className={`text-[12px] px-2 py-1 rounded-md ${
              pageNumber === 1 ? "bg-gray-300" : "bg-[#AB28B2] text-white"
            }`}
          >
            Previous
          </button>

          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber === totalPages}
            className={`text-[12px] px-2 py-1 rounded-md ${
              pageNumber === totalPages
                ? "bg-gray-300"
                : "bg-[#AB28B2] text-white"
            }`}
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="pageCount" className="text-black font-medium"></label>
          <select
            id="pageCount"
            value={pageCount}
            onChange={(e) => setPageCount(Number(e.target.value))}
            className=" rounded-md border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {[50, 100, 150, 200].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
