'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import NewsTable from '@/components/NewTable';
import AdminNewsHeader from '@/components/AdminNewsHeader';
import Pagination from '@/components/Pagination';

type NewsItem = {
  id: string;
  title: string;
  url: string;
  updatedAt: string;
};

type Meta = {
  totalItems: number;
  totalPages: number;
};

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<Meta>({ totalItems: 0, totalPages: 1 });
  const [error, setError] = useState(false);

  const fetcher = (url: string) =>
    axios.get(url).then(res => res.data).catch(err => {
      setError(true);
      return null;
    });

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

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <AdminNewsHeader />

      <div className="w-full max-w-4xl">
        {loading ? (
          <p className="text-center py-10">Carregando notícias...</p>
        ) : (
          <>
            <NewsTable data={news} error={error} />
            {news.length > 0 && (
              <Pagination
               currentPage={currentPage}
               totalPages={meta.totalPages}
               onPageChange={setCurrentPage}
             />
            )}
          </>
        )}
      </div>
    </div>
  );
}
