import { useRef } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";

export type UploadFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  createdAt: string;
};

type FileUploaderProps = {
  onFilesAdded?: (files: File[]) => void;
};

export default function FileUploader({ onFilesAdded }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function openPicker() {
    inputRef.current?.click();
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) onFilesAdded?.(files);
    e.target.value = "";
  }

  return (
    <Card className="p-5">
      <p className="text-sm font-semibold text-gray-900">Documents</p>
      <p className="mt-1 text-sm text-gray-600">
        Ajoutez des PDF ou des photos. (MVP: stockage local front)
      </p>

      <div className="mt-4 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-600">
            Glissez-déposez ici ou utilisez le bouton.
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={openPicker} type="button">
              Ajouter un fichier
            </Button>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          accept=".pdf,image/*"
          onChange={onChange}
        />
      </div>
    </Card>
  );
}
