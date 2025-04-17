type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="mt-6 flex justify-center gap-2">
      <button
        className="px-3 py-1 rounded border text-sm hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 cursor-pointer"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border text-sm hover:bg-gray-100 cursor-pointer ${
            currentPage === page
              ? 'bg-blue-600 text-white border-blue-600'
              : 'text-gray-800 border-gray-300'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        className="px-3 py-1 rounded border text-sm hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 cursor-pointer"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Próxima
      </button>
    </div>
  );
}
