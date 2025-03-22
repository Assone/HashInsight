import { cn } from "@/lib/utils";
import { AnimatePresence, m, Variants } from "motion/react";
import { Skeleton } from "./ui/skeleton";

const variants: Variants = {
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    transform: "translateY(-10px)",
    transition: {
      when: "afterChildren",
    },
  },
};

export interface InspectInfoItemProps {
  className?: string;
  label: string;
  value?: string;
  truncate?: boolean;
  onClick?: VoidFunction;
}

export const InspectInfoItem: React.FC<InspectInfoItemProps> = ({
  className,
  label,
  value,
  truncate = true,
  onClick,
}) => {
  return (
    <m.div
      className={cn(
        "flex flex-col hover:bg-foreground/10 gap-2 p-2 rounded",
        className
      )}
      variants={variants}
      initial="hidden"
      animate="visible"
      onClick={onClick}
    >
      <div className="text-xl font-bold">{label}</div>

      <AnimatePresence mode="wait">
        {value === undefined ? (
          <m.div
            exit={{ transform: "translateY(-10px)", opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Skeleton className="w-full h-4" />
          </m.div>
        ) : (
          <m.div
            className={cn("text-xs", truncate ? "truncate" : "break-all")}
            initial={{ opacity: 0, transform: "translateY(10px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.5 }}
          >
            <span>{value}</span>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
};
