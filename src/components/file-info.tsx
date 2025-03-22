interface FileInfoProps {
  file: File
}

const formatSize = (size: number) => {
  if (size < 1024) {
    return `${size} bytes`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
}


export const FileInfo: React.FC<FileInfoProps> = ({ file }) => {
  return (
    <div className="flex gap-10 items-center text-sm">
      <div className="font-bold truncate">
        <span>{file.name}</span>
      </div>
      <div className="text-foreground/51">
        {formatSize(file.size)}
      </div>
    </div>)
}
