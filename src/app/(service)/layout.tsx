import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
          >
            ← 홈으로
          </Link>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
