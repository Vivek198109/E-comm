import { cn } from "../../lib/utils";

export const GridBackground = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-full w-full bg-white bg-grid-black/[0.05] relative flex items-center justify-center",
        className
      )}
    >
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  );
};
