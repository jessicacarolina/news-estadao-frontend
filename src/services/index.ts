import type { NewsResponse } from '@/types/news';
import axios from 'axios';

export const getAllNews = async (url: string): Promise<NewsResponse> => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw err;
  }
};
