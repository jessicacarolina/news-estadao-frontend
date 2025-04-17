export type Meta = {
  page: number,
  totalPages: number,
  totalItems: number
};

export type NewsItem = {
  id: string;
  title: string;
  subtitle: string;
  section: string;
  imageThumb: string;
  url: string;
  updatedAt: string;
};

export type NewsResponse = {
  meta: Meta;
  data: NewsItem[];
};
