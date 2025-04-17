import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import HomePage from './page';

jest.mock('axios');
jest.mock('@/components/NewsBanner', () => jest.fn(() => <div data-testid="news-banner" />));
jest.mock('@/components/NewsCardHome', () => jest.fn(({ news }) => <div data-testid="news-card">{news.title}</div>));

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<HomePage />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

it('renders error message when API call fails', async () => {
  (axios.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

  render(<HomePage />);

  await waitFor(() => {
      expect(screen.getByText('Erro ao carregar notícias. Tente novamente mais tarde.')).toBeInTheDocument();
  });
});

  it('renders news banner and cards when API call succeeds', async () => {
    const mockNews = [
      {
        id: '1',
        title: 'Featured News',
        subtitle: 'Subtitle',
        section: 'Section',
        imageThumb: 'image.jpg',
        url: 'url',
        updatedAt: '2023-01-01',
      },
      {
        id: '2',
        title: 'Other News 1',
        subtitle: 'Subtitle',
        section: 'Section',
        imageThumb: 'image.jpg',
        url: 'url',
        updatedAt: '2023-01-01',
      },
      {
        id: '3',
        title: 'Other News 2',
        subtitle: 'Subtitle',
        section: 'Section',
        imageThumb: 'image.jpg',
        url: 'url',
        updatedAt: '2023-01-01',
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: { data: mockNews, meta: { pageCount: 1 } },
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByTestId('news-banner')).toBeInTheDocument();
      expect(screen.getAllByTestId('news-card')).toHaveLength(2);
    });
  });
});