import { LazyMotion } from "motion/react";
import { useState } from "react";
import { FileInfo } from "./components/file-info";
import { InspectInfo } from "./components/inspect-info";
import { UploadFile } from "./components/upload-file";

const loadFeatures = () =>
  import("@/utils/motion-features").then((m) => m.default);

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <LazyMotion features={loadFeatures}>
      <div className="h-full flex flex-col items-center justify-center gap-4 p-4">
        <h1 className="text-4xl font-bold">HashInsight</h1>
        <p>
          Compute the MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes of the
          file.
        </p>
        <UploadFile onChange={setFile} />
        {file && <FileInfo file={file} />}
        {file && <InspectInfo className="w-4/5" file={file} />}
      </div>
    </LazyMotion>
  );
};

export default App;
