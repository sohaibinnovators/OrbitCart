export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[4/5] rounded-[24px] bg-mist" />
          <div className="mt-3 h-3 w-16 rounded bg-mist" />
          <div className="mt-2 h-4 w-3/4 rounded bg-mist" />
          <div className="mt-2 h-3 w-20 rounded bg-mist" />
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl animate-pulse px-4 py-12 sm:px-6 lg:px-8">
      <div className="h-4 w-28 rounded bg-mist" />
      <div className="mt-4 h-12 w-2/3 max-w-lg rounded bg-mist" />
      <div className="mt-4 h-4 w-full max-w-xl rounded bg-mist" />
      <div className="mt-10">
        <ProductGridSkeleton />
      </div>
    </div>
  );
}
