'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import NewsForm from '@/components/NewsForm';

export default function EditNewsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_URL_API}/news/${id}`)
      .then((res) => setInitialData(res.data))
      .catch((err) => console.error('Erro ao carregar notícia', err));
  }, [id]);

  const handleUpdate = async (data: any) => {
    await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/admin/news/${id}`, data);
    router.push('/admin/news');
  };

  if (!initialData) return <p>Carregando...</p>;

  return <NewsForm initialData={initialData} onSubmit={handleUpdate} isEditing />;
}
