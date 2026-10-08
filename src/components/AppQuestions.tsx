import Link from 'next/link';
import { appDescription, appQuestions } from '@/content/app';

export default function AppQuestions() {
  return (
    <section className="bg-neutral-50 px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="app-questions-title">
      <div className="mx-auto max-w-4xl">
        <h2 id="app-questions-title" className="text-3xl font-bold text-neutral-900 [word-break:keep-all]">맘마 육아 앱, 무엇을 할 수 있나요?</h2>
        <p className="mt-5 text-lg leading-relaxed text-neutral-700 [word-break:keep-all]">{appDescription}</p>
        <div className="mt-8 divide-y divide-neutral-200">
          {appQuestions.map((item) => (
            <div key={item.question} className="py-6">
              <h3 className="text-lg font-semibold text-neutral-900">{item.question}</h3>
              <p className="mt-3 leading-relaxed text-neutral-600">{item.answer}</p>
              <Link href={item.href} className="mt-3 inline-block font-medium text-primary-600 underline underline-offset-4">{item.label} →</Link>
            </div>
          ))}
        </div>
        <Link href="/blog" className="mt-6 inline-block font-semibold text-primary-600 underline underline-offset-4">수유·수면·성장 육아 가이드 모두 보기 →</Link>
      </div>
    </section>
  );
}
