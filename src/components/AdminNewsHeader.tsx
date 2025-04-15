import Link from 'next/link';

export default function AdminNewsHeader() {
  return (
    <div className="m-16 mb-4 flex w-full max-w-4xl items-center justify-center">
      <h2 className="text-3xl font-semibold mr-6">Administração de Notícias</h2>
      <Link
        href="/admin/news/create"
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 ml-auto"
      >
        Nova Notícia
      </Link>
    </div>
  );
}
