import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { useState, useRef } from "react";

interface UploadFileProps {
  onChange: (file: File | null) => void
}

export const UploadFile: React.FC<UploadFileProps> = ({ onChange }) => {

  const [isDragging, setIsDragging] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  return (
    <m.div
      className={cn(
        "w-5/6 h-1/6 border border-dashed rounded-2xl overflow-hidden cursor-pointer flex justify-center items-center",
        isDragging && "bg-foreground/70"
      )}
      onDragEnter={() => {
        setIsDragging(true);
      }}
      onDragLeave={() => {
        setIsDragging(false);
      }}
      onDragOver={(evt) => {
        evt.preventDefault();
      }}
      onDrop={(evt) => {
        evt.preventDefault();
        setIsDragging(false);
        onChange(evt.dataTransfer.files.item(0));

      }}
      onClick={() => {
        input.current?.click();
      }}
    >
      <input
        type="file"
        name="file"
        id="file"
        hidden
        ref={input}
        onChange={(evt) => onChange(evt.target.files?.item(0) || null)}
      />
      <div>
        <p>Add an attachment</p>
      </div>
    </m.div>)
}
