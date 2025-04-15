import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type NewsItem = {
  title: string;
  url: string;
  updatedAt: string;
};

interface NewsTableProps {
  data: NewsItem[];
  error?: boolean;
}

export default function NewsTable({ data, error }: NewsTableProps) {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm mt-6">
      <table className="w-full table-auto text-left">
      <thead className="bg-gray-50 text-gray-700">
        <tr className="border-b border-gray-200">
        <th className="p-3 text-sm font-semibold">Título</th>
        <th className="p-3 text-sm font-semibold">URL</th>
        <th className="p-3 text-sm font-semibold">Última atualização</th>
        <th className="p-3 text-sm font-semibold">Ações</th>
        </tr>
      </thead>
      <tbody>
        {error && (
          <tr>
            <td colSpan={4} className="text-center py-6 text-red-500">
              Erro ao buscar dados. Por favor tente novamente mais tarde!
            </td>
          </tr>
        )}
        {!error && data.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center py-6 text-gray-500">
              Não existem notícias cadastradas.
            </td>
          </tr>
        ) : (
          data.map((news, index) => (
            <tr key={index} className="border-b border-gray-100 text-sm text-gray-800 hover:bg-gray-50 transition">
              <td className="p-3 w-[40%] break-words">{news.title}</td>
              <td className="p-3 w-[30%] break-all">{news.url}</td>
              <td className="p-3 w-[20%]">{format(new Date(news.updatedAt), "dd/MM/yyyy '|' HH'h'mm", { locale: ptBR })}</td>
              <td className="p-3 w-[10%] space-x-4">
                <button className="text-blue-600 hover:underline">Editar</button>
                <button className="text-red-600 hover:underline">Excluir</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
      </table>
    </div>
  );
}
