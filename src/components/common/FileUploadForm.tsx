import { useState, ChangeEvent, FormEvent } from "react";
import { Upload } from "lucide-react";

type FileUploadFormProps = {
  apiCall: (file: FormData) => void;
};

const FileUploadForm: React.FC<FileUploadFormProps> = ({ apiCall }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    apiCall(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full text-sm text-gray-500 
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-green-50 file:text-green-700
          hover:file:bg-green-100 inline-block"
      />
      <button
        type="submit"
        className="flex items-center justify-center w-full py-2 px-2 
          bg-green-500 text-white rounded-md hover:bg-green-600 
          transition-colors"
      >
        <Upload className="mr-2 h-4 w-4" />
        Import User Data
      </button>
    </form>
  );
};

export default FileUploadForm;
