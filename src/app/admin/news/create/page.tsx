'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import NewsForm from '@/components/NewsForm';

export default function CreateNewsPage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/admin/news`, data);
    router.push('/admin/news');
  };

  return <NewsForm onSubmit={handleCreate} />;
}
