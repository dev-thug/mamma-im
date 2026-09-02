import type { PostBlock } from "@/content/blog";

export default function PostContent({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="text-[17px] leading-[1.9] text-neutral-700">
                {block.text}
              </p>
            );
          case "heading": {
            const Tag = block.level === 2 ? "h2" : "h3";
            return (
              <Tag
                key={i}
                className={
                  block.level === 2
                    ? "text-2xl font-bold text-neutral-900 mt-10 mb-2"
                    : "text-xl font-bold text-neutral-900 mt-8 mb-2"
                }
              >
                {block.text}
              </Tag>
            );
          }
          case "list":
            return (
              <ul key={i} className="space-y-2 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5 text-[17px] leading-[1.8] text-neutral-700">
                    <span className="shrink-0 text-primary-500 mt-[2px]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <div
                key={i}
                className="rounded-2xl border border-primary-100 bg-primary-50 px-5 py-4 text-sm leading-relaxed text-neutral-600"
              >
                {block.text}
              </div>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-2xl border border-neutral-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-neutral-50">
                      {block.headers.map((h, hi) => (
                        <th
                          key={hi}
                          className="px-4 py-3 text-left font-semibold text-neutral-700 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr key={ri} className="border-t border-neutral-100">
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-4 py-3 text-neutral-600 align-top">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
