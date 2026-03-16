import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-bold text-primary-500 mb-4">404</p>
        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-neutral-500 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 transition-colors px-6 py-3 rounded-2xl"
        >
          ← 홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
