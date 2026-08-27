import { FileText, FileType2, Presentation, UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

import BorderGlow from "@/reactbits/BorderGlow";

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

export function DropzoneCard({ onFilesAdded, disabled = false }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPT,
    onDrop: (accepted) => onFilesAdded(accepted),
    disabled
  });

  return (
    <div
      {...getRootProps()}
      className={`rb-dropzone-shell ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
    >
      <input {...getInputProps()} />

      <BorderGlow
        className={`rb-dropzone-card ${isDragActive ? "rb-dropzone-active" : ""}`}
        glowColor="210 60 65"
        borderRadius={18}
        glowRadius={24}
        edgeSensitivity={44}
        backgroundColor="rgba(15, 23, 42, 0.78)"
        colors={["#3b82f6", "#38bdf8", "#818cf8"]}
        fillOpacity={0.22}
      >
        <div className="border-glow-inner rb-dropzone-inner">
          <span className="rb-dropzone-icon">
            <UploadCloud className="h-5 w-5" />
          </span>

          <p className="rb-dropzone-title">{isDragActive ? "Release to add files" : "Drop files here or click to browse"}</p>
          <p className="rb-dropzone-sub">
            Supports .pdf, .doc, .docx, .odt, .rtf, .txt, .ppt, .pptx, and .odp
          </p>

          <div className="rb-dropzone-types">
            <span>
              <FileType2 className="h-4 w-4" />
              DOC / DOCX
            </span>
            <span>
              <Presentation className="h-4 w-4" />
              PPT / PPTX
            </span>
            <span>
              <FileText className="h-4 w-4" />
              PDF
            </span>
          </div>
        </div>
      </BorderGlow>
    </div>
  );
}
