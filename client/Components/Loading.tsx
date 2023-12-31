export default function Loading() {
  return (
    <div className="top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden opacity-75 flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-[var(--text-color)] h-12 w-12 mb-4"></div>
    </div>
  );
}
