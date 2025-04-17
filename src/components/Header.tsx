"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  let showBackButton = false;
  let backTo = "/";

  if (pathname?.startsWith("/admin/news/create") || pathname?.startsWith("/admin/news/update")) {
    showBackButton = true;
    backTo = "/admin/news";
  } else if (pathname !== "/") {
    showBackButton = true;
    backTo = "/";
  }

  return (
    <header className="bg-blue-700 text-white py-4 shadow-sm w-full mx-auto min-w-[375px]">
      <div className="w-[90%] md:w-[60%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton ? (
            <button
              onClick={() => router.push(backTo)}
              className="flex items-center gap-1 hover:underline transition-all text-lg font-bold"
            >
              <ArrowLeft size={18} />
              Voltar
            </button>
          ) : (
            <h1 className="text-2xl font-bold">Estadão News</h1>
          )}
        </div>

        <Link
          href="/admin/news"
          className="flex items-center gap-1 hover:underline transition-all text-lg font-bold"
        >
          Admin
          <ArrowRight size={18} />
        </Link>
      </div>
    </header>
  );
}
