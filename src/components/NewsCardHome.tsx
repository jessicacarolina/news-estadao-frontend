import Image from 'next/image';
import { MessageCircle, Bookmark, Share2 } from 'lucide-react';
import Link from 'next/link';

type NewsItem = {
  id: string;
  title: string;
  subtitle: string;
  section: string;
  imageThumb: string;
  url: string;
  updatedAt: string;
};

interface NewsCardHomeProps {
  news: NewsItem;
}

export default function NewsCardHome({ news }: NewsCardHomeProps) {
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');
      
  const slug = slugify(news.title);
  return (
    <Link href={`/${slug}?id=${news.id}`}>
      <article className="flex flex-col border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition duration-300">
        <Image
          src={news.imageThumb}
          alt={news.title}
          width={600}
          height={300}
          className="w-full h-48 object-cover"
        />

        <div className="p-4 flex flex-col flex-grow">
          <span className="text-xs text-gray-500 uppercase">{news.section}</span>

          <h3 className="text-lg font-semibold text-gray-800 mt-2">{news.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{news.subtitle}</p>

          <hr className="my-4 border-gray-200" />

          <div className="flex justify-end gap-4 text-gray-500">
            <button className="hover:text-blue-600">
              <Share2 size={18} />
            </button>
            <button className="hover:text-blue-600">
              <MessageCircle size={18} />
            </button>
            <button className="hover:text-blue-600">
              <Bookmark size={18} />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
