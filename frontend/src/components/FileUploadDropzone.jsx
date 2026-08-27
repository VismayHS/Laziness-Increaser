import { motion } from "framer-motion";
import { FileUp, FolderOpen } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ACCEPT = {
  "application/pdf": [".pdf"],
  "application/vnd.ms-powerpoint": [".ppt"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
  "application/vnd.oasis.opendocument.presentation": [".odp"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/vnd.oasis.opendocument.text": [".odt"],
  "application/rtf": [".rtf"],
  "text/plain": [".txt"]
};

export function FileUploadDropzone({ onFilesAdded, disabled = false }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPT,
    onDrop: (acceptedFiles) => onFilesAdded(acceptedFiles),
    disabled
  });

  return (
    <motion.div layout whileHover={{ scale: disabled ? 1 : 1.01 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
      <Card
        {...getRootProps()}
        className={cn(
          "cursor-pointer border-2 border-dashed bg-card/60 backdrop-blur-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isDragActive ? "border-primary" : "border-border",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <CardContent className="flex min-h-44 flex-col items-center justify-center gap-3 text-center">
          <input {...getInputProps()} />
          <motion.div whileHover={{ rotate: -6, scale: 1.08 }}>
            {isDragActive ? <FolderOpen className="h-10 w-10 text-primary" /> : <FileUp className="h-10 w-10 text-primary" />}
          </motion.div>
          <p className="text-lg font-semibold">Drop your files here or click to upload</p>
          <p className="text-sm text-muted-foreground">
            Supported: .pdf, .doc, .docx, .odt, .rtf, .txt, .ppt, .pptx, .odp
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
