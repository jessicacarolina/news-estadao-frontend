type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  success: boolean;
};

export default function DeleteModal({ isOpen, onClose, onConfirm, loading, success }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      ></div>
  
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {!success ? (
          <>
            <h2 className="text-lg font-semibold mb-4">Tem certeza que deseja excluir esta notícia?</h2>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? 'Excluindo...' : 'Confirmar'}
              </button>
            </div>
          </>
        ) : (
          <div className="text-green-600 text-center font-semibold">Notícia excluída com sucesso!</div>
        )}
      </div>
    </div>
  );
  
}
