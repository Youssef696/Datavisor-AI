import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileType,
  AlertCircle,
  CheckCircle,
  X,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { Card, CardContent } from "./ui/card";

interface FileUploadProps {
  onFileAccepted: (file: File) => void;
  isProcessing?: boolean;
  processingProgress?: number;
}

const FileUpload = ({
  onFileAccepted = () => {},
  isProcessing = false,
  processingProgress = 0,
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        setError("Please upload only CSV or Excel files (.csv, .xlsx, .xls)");
        return;
      }

      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        setError(null);
        onFileAccepted(selectedFile);
      }
    },
    [onFileAccepted],
  );

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-2">Upload Your Data</h2>
          <p className="text-muted-foreground mb-6 text-center">
            Upload a CSV or Excel file to analyze your data
          </p>

          {!file && (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 w-full cursor-pointer transition-colors duration-200 ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300"} ${isDragReject ? "border-red-500 bg-red-50" : ""}`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-medium">Drag & drop your file here</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    or click to browse
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Supported formats: CSV, Excel (.csv, .xlsx, .xls)
                </p>
              </div>
            </div>
          )}

          {file && !isProcessing && (
            <div className="w-full mt-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <FileSpreadsheet className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium truncate max-w-[200px] sm:max-w-[300px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="w-full mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Processing your file...</p>
                <p className="text-sm text-muted-foreground">
                  {processingProgress}%
                </p>
              </div>
              <Progress value={processingProgress} className="h-2" />
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mt-4 w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {file && !isProcessing && (
            <div className="mt-6 w-full">
              <Button className="w-full" onClick={() => onFileAccepted(file)}>
                Analyze Data
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
