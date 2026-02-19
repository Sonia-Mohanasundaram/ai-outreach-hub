import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon } from "lucide-react";

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    // API placeholder
    setIsUploading(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Upload Leads</h1>
        <p className="text-muted-foreground mt-1">Upload CSV or Excel files for bulk processing</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 card-shadow max-w-2xl">
        <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/40 transition-colors">
          <UploadIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-medium mb-1">
            {file ? file.name : "Drop your file here"}
          </p>
          <p className="text-sm text-muted-foreground mb-4">CSV or Excel files accepted</p>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
            id="upload-input"
          />
          <Button variant="outline" onClick={() => document.getElementById("upload-input")?.click()}>
            Select File
          </Button>
        </div>
        <div className="mt-6">
          <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full">
            <UploadIcon className="h-4 w-4 mr-2" />
            {isUploading ? "Processing..." : "Process File"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
