'use client';

import { useEffect, useState } from 'react';
import NewsCards from '@/components/NewsCards';
import AdminNewsHeader from '@/components/AdminNewsHeader';
import Pagination from '@/components/Pagination';
import { getAllNews } from '@/services';
import type { Meta, NewsItem } from '@/types/news';

export type NewsSummary = Pick<NewsItem, 'id' | 'title' | 'url' | 'updatedAt'>;

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<Meta>({ totalItems: 0, totalPages: 1, page: 1 });
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await getAllNews(`${process.env.NEXT_PUBLIC_URL_API}/news?page=${currentPage}`);
        if (response) {
          setNews(response.data);
          setMeta(response.meta);
        }
        setLoading(false);
      } catch (error) {
        setError(true);
      }
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
            <NewsCards data={news} error={error} />
            {news.length > 0 && (
              <Pagination
               currentPage={currentPage}
               totalPages={meta.totalPages || 1}
               onPageChange={setCurrentPage}
             />
            )}
          </>
        )}
      </div>
    </div>
  );
}
