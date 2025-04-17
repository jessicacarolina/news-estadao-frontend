import Image from 'next/image';
import { MessageCircle, Bookmark, Share2 } from 'lucide-react';
import Link from 'next/link';
import type { NewsItem } from '@/types/news';

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
      <article className="flex flex-col border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition duration-300 w-full h-full">
        <Image
          src={news.imageThumb}
          alt={news.title}
          width={600}
          height={300}
          className="w-full h-48 object-cover"
        />

        <div className="flex flex-col flex-grow p-4">
          <div className="flex-grow">
            <span className="text-xs text-gray-500 uppercase">{news.section}</span>

            <h3 className="text-lg font-semibold text-gray-800 mt-2">{news.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{news.subtitle}</p>
          </div>

          <hr className="my-4 border-gray-200" />

          <div className="flex justify-end gap-4 text-gray-500">
            <button className="hover:text-blue-600 cursor-pointer">
              <Share2 size={18} />
            </button>
            <button className="hover:text-blue-600 cursor-pointer">
              <MessageCircle size={18} />
            </button>
            <button className="hover:text-blue-600 cursor-pointer">
              <Bookmark size={18} />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
