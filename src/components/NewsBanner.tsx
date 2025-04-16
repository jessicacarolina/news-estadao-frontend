import Image from 'next/image';
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

interface NewsBannerProps {
  news: NewsItem;
}

export default function NewsBanner({ news }: NewsBannerProps) {
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
      <article className="relative h-72 md:h-96 w-full overflow-hidden rounded-2xl shadow-lg group">
        <Image
          src={news.imageThumb}
          alt={news.title}
          width={1200}
          height={400}
          className="object-cover object-top w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
          <span className="text-sm text-gray-200 uppercase mb-1">{news.section}</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
            {news.title}
          </h2>
          <p className="text-sm text-gray-300 mt-2">{news.subtitle}</p>
        </div>
      </article>
    </Link>
  );
}
