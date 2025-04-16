'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import NewsBanner from '@/components/NewsBanner';
import NewsCardHome from '@/components/NewsCardHome';

type NewsItem = {
  id: string;
  title: string;
  subtitle: string;
  section: string;
  imageThumb: string;
  url: string;
  updatedAt: string;
};

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [meta, setMeta] = useState({ pageCount: 1 });

  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      console.error(err);
      setError(true);
      return null;
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const response = await fetcher(`${process.env.NEXT_PUBLIC_URL_API}/news?page=${currentPage}`);
      if (response) {
        setNews(response.data);
        setMeta(response.meta);
      }
      setLoading(false);
    };

    fetchNews();
  }, [currentPage]);

  const [featured, ...others] = news;

  return (
    <section className="w-full max-w-6xl mx-auto min-w-[375px] px-4 sm:px-6 lg:px-8 py-6">
      {loading && <p className="text-center text-gray-600">Carregando...</p>}

      {error && (
        <div className="text-center text-red-600 border border-red-300 bg-red-50 p-4 rounded-lg shadow-sm">
          Erro ao carregar notícias. Tente novamente mais tarde.
        </div>
      )}

      {!loading && !error && news.length > 0 && (
        <>
          <NewsBanner news={featured} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {others.map(item => (
              <NewsCardHome key={item.id} news={item} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
