import cn from "@/utils/cn";

function Loading({ className }: { className?: string }) {
  return (
    <div className={cn("w-14 aspect-square relative z-[999]", className)}>
      <div className="absolute inset-0 border-4 rounded-full border-slate-300" />
      <div className="absolute inset-0 border-4 border-t-transparent rounded-full border-primary animate-spin bg-transparent" />
    </div>
  );
}

export default Loading;
