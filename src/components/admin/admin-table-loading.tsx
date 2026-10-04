interface AdminTableLoadingProps {
  rows?: number;
  columns?: number;
}

export default function AdminTableLoading({
  rows = 5,
  columns = 4,
}: AdminTableLoadingProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={rowIndex}
          className="flex gap-4 border-b p-4 last:border-0"
        >
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={columnIndex}
              className="h-4 flex-1 animate-pulse rounded bg-slate-100"
            />
          ))}
        </div>
      ))}
    </div>
  );
}