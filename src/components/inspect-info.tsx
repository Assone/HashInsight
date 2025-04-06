import { useCalculator } from "@/hooks/useCalculator";
import { useClipboard } from "@/hooks/useClipboard";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { InspectInfoItem, InspectInfoItemProps } from "./inspect-info-item";

interface InspectInfoProps
  extends Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "className"
  > {
  file: File | null;
}

export const InspectInfo: React.FC<InspectInfoProps> = ({
  className,
  file,
}) => {
  const { isLoading, md5, sha1, sha256, sha384, sha512 } = useCalculator(file);
  const { isSupported, writeWithText } = useClipboard();
  const items: InspectInfoItemProps[] = [
    { label: "MD5", value: md5 },
    { label: "SHA-1", value: sha1 },
    { label: "SHA-256", value: sha256 },
    { label: "SHA-384", value: sha384 },
    { label: "SHA-512", value: sha512 },
  ];

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <AnimatePresence>
        {items.map(({ label, value }) => (
          <InspectInfoItem
            key={label}
            className={cn({
              "cursor-not-allowed": isLoading && value === undefined,
              "cursor-pointer": isSupported && value !== undefined,
            })}
            label={label}
            value={isLoading && value === undefined ? undefined : value}
            truncate={isSupported}
            onClick={async () => {
              if (value) {
                await writeWithText(value);
                toast.success("Digest copied to clipboard");
              }
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
