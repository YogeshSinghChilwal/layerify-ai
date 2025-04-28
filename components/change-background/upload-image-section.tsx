import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";

export default function UploadImageSection({setBgImageUrl}: {setBgImageUrl: (imgLink: string) => void}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCardClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBgImageUrl(imageUrl)
      
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-3 bg-white border-2 border-border rounded-md ">
      <h2 className="text-2xl font-semibold text-center mb-1 ">Upload Background Image</h2>
      <p className="text-sm text-center text-muted-foreground mb-4">
        Upload a clear image from your device
      </p>

      {/* Upload Box */}
      <Card
        onClick={handleCardClick}
        className="border-dashed border-2 border-border bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer rounded-2xl w-full  flex items-center justify-center"
      >
        <CardContent className="flex flex-col items-center justify-center gap-2">
          <UploadCloud className="w-10 h-10 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Click or drag to upload
          </span>
        </CardContent>
      </Card>

      {/* Hidden Input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
