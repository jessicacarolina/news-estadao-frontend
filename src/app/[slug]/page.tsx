'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NewsDetail({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [news, setNews] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    axios.get(`${process.env.NEXT_PUBLIC_URL_API}/news/${id}`)
      .then(res => setNews(res.data))
      .catch(() => alert('Erro ao carregar notícia'));
  }, [id]);

  if (!news) return <div>Carregando...</div>;

  const formattedDate = new Date(news.updatedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-3xl w-full mx-auto min-w-[375px] px-4 sm:px-6 py-10">
      <p className="text-blue-600 text-xs font-bold uppercase text-start mb-6">
        {news.section}
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold text-start mb-4">
        {news.title}
      </h1>
      <h2 className="text-gray-500 text-base sm:text-lg text-start mb-6">
        {news.subtitle}
      </h2>
      <div className="text-sm text-gray-500 text-start mb-6">
        <div>
          <span className="font-semibold">Redação, O Estado de S.Paulo</span>
        </div>
        <div>
          <span>{formattedDate}</span>
        </div>
        <div>
          <span>5 minutos de leitura</span>
        </div>
      </div>
      <img
        src={news.image}
        alt={news.title}
        className="w-full h-auto rounded-xl mb-8 object-cover"
      />
      <div
        className="prose prose-state max-w-none prose-img:rounded-xl prose-a:text-blue-600 prose-a:underline"
        dangerouslySetInnerHTML={{
          __html: news.content,
        }}
      />
    </div>
  );
}
