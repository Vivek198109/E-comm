import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const HoverCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </motion.div>
  );
};
