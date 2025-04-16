import Link from 'next/link';

export default function AdminNewsHeader() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 shadow-md rounded-lg mb-6 flex flex-col sm:flex-row items-center justify-between md:gap-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0 sm:text-4xl">
        Administração de Notícias
      </h2>
      <Link
        href="/admin/news/create"
        className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
      >
        Nova Notícia
      </Link>
    </div>
  );
}
