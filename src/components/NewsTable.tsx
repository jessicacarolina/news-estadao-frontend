'use client';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import axios from 'axios';

type NewsItem = {
  id: string;
  title: string;
  url: string;
  updatedAt: string;
};

interface NewsTableProps {
  data: NewsItem[];
  error?: boolean;
}

export default function NewsTable({ data, error }: NewsTableProps) {
  const router = useRouter();
  const deleteNews = async (id: string) => {
    const confirmed = window.confirm('Tem certeza que deseja excluir esta notícia?');
    if (!confirmed) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/admin/news/${id}`);
      alert('Notícia excluída com sucesso!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir. Tente novamente.');
    }
  };
  
  const handleEdit = (id: string) => {
    router.push(`/admin/news/update/${id}`);
  };

  return (
    <section className="mt-2 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Lista de Notícias</h2>

      {error && (
        <div className="text-center text-red-600 border border-red-300 bg-red-50 p-4 rounded-lg shadow-sm">
          Erro ao buscar dados. Por favor, tente novamente mais tarde.
        </div>
      )}

      {!error && data.length === 0 && (
        <div className="text-center text-gray-600 border border-gray-200 bg-gray-50 p-4 rounded-lg shadow-sm">
          Não existem notícias cadastradas.
        </div>
      )}

      {!error && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((news, index) => (
            <article
              key={index}
              className="flex flex-col justify-between p-5 border border-gray-200 rounded-2xl bg-white shadow-md hover:shadow-lg transition duration-300"
            >
              <header className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 leading-snug mb-2">
                  {news.title}
                </h3>
                <p className="text-left text-gray-500 text-xs mt-2">
                  Atualização: {format(new Date(news.updatedAt), "dd/MM/yyyy '|' HH'h'mm", { locale: ptBR })}
                </p>
              </header>

              <div className="mb-6">
                <span className="block text-sm font-medium text-gray-500 uppercase mb-1">URL</span>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline break-words"
                >
                  {news.url}
                </a>
              </div>

              <footer className="flex flex-col gap-3 mt-auto pt-4 border-t border-gray-100 text-sm text-gray-600">
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => handleEdit(news.id)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => deleteNews(news.id)}
                    className="text-red-600 hover:underline font-medium">Excluir</button>
                </div>
              </footer>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
