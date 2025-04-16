import CreateNewsForm from '@/components/CreateNewsForm';

export default function CreateNewsPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 pb-20 gap-8 sm:p-20">
      <CreateNewsForm />
    </div>
  );
}
