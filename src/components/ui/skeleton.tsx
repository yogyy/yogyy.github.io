import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-[.375rem] bg-white/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
