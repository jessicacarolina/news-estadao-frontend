'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface NewsData {
  title?: string;
  subtitle?: string;
  section?: string;
  url?: string;
  publicationDateTime?: string;
  image?: string;
  imageThumb?: string;
  content?: string;
}

export default function NewsForm({ initialData = {} as NewsData, onSubmit, isEditing = false }: { initialData?: NewsData; onSubmit: (data: NewsData) => Promise<void>; isEditing?: boolean }) {
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [section, setSection] = useState('');
  const [url, setUrl] = useState('');
  const [publicationDateTime, setPublicationDateTime] = useState('');
  const [image, setImage] = useState('');
  const [imageThumb, setImageThumb] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && initialData) {
      setTitle(initialData.title || '');
      setSubtitle(initialData.subtitle || '');
      setSection(initialData.section || '');
      setUrl(initialData.url || '');
      setPublicationDateTime(initialData.publicationDateTime?.slice(0, 16) || '');
      setImage(initialData.image || '');
      setImageThumb(initialData.imageThumb || '');
      setContent(initialData.content || '');
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const isoDate = new Date(publicationDateTime).toISOString().replace(/\.\d{3}Z$/, 'Z');
    const newsData = {
      title,
      subtitle,
      section,
      url,
      publicationDateTime: isoDate,
      image,
      imageThumb,
      content,
    };

    try {
      await onSubmit(newsData);
    } catch (err) {
      setError('Erro ao enviar os dados. Tente novamente.');
    }

    setLoading(false);
  };

  return (
    <div className="w-full md:w-[60%] mx-auto px-4 py-6 bg-gray-50 shadow-md rounded-lg mt-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Editar Notícia' : 'Criar Nova Notícia'}
      </h2>
      {error && (
        <div className="text-center text-red-600 border border-red-300 bg-red-50 p-4 rounded-lg shadow-sm mb-6">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
            Subtítulo
          </label>
          <input
            type="text"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="section" className="block text-sm font-medium text-gray-700">
            Seção
          </label>
          <input
            type="text"
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="publicationDateTime" className="block text-sm font-medium text-gray-700">
            Data de Publicação
          </label>
          <input
            type="datetime-local"
            id="publicationDateTime"
            value={publicationDateTime}
            onChange={(e) => setPublicationDateTime(e.target.value)}
            required
            min={new Date().toISOString().slice(0, 16)}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Imagem (URL)
          </label>
          <input
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="imageThumb" className="block text-sm font-medium text-gray-700">
            Thumb Imagem (URL)
          </label>
          <input
            type="url"
            id="imageThumb"
            value={imageThumb}
            onChange={(e) => setImageThumb(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Conteúdo
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6 md:col-span-2">
          <button
            type="button"
            onClick={() => router.push('/admin/news')}
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-400 transition-all duration-300 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-300 cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Enviando...' : isEditing ? 'Salvar Alterações' : 'Criar Notícia'}
          </button>
        </div>
      </form>
    </div>
  );
}
