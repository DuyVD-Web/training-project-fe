import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { updateAvatar } from "../../libs/user/user";
import { AvatarUploadProps } from "../../libs/types/user";

const Avatar: React.FC<AvatarUploadProps> = ({ currentAvatar, onSave }) => {
  const [image, setImage] = useState<File | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const editorRef = useRef<AvatarEditor | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setIsEditing(true);
      setError(null);
    }
  };

  const handleSave = async (): Promise<void> => {
    if (editorRef.current) {
      setIsLoading(true);
      setError(null);

      const canvas = editorRef.current.getImageScaledToCanvas();

      canvas.toBlob(async (blob: Blob | null) => {
        if (!blob) {
          setError("Failed to process image");
          setIsLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append("img", blob, "avatar.png");

        try {
          const result = await updateAvatar(formData);

          if (!result.status) {
            throw new Error(result.message);
          }
          if ("data" in result) {
            onSave(result.data.avatar);
            setIsEditing(false);
            setImage(null);
          }
        } catch (error) {
          setError(
            error instanceof Error ? error.message : "Failed to update avatar"
          );
        } finally {
          setIsLoading(false);
        }
      }, "image/png");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {isEditing ? (
        <div className="flex flex-col items-center space-y-4">
          {image && (
            <AvatarEditor
              ref={editorRef}
              image={image}
              width={350}
              height={350}
              border={20}
              borderRadius={175}
              scale={scale}
              crossOrigin="anonymous"
            />
          )}

          <div className="w-64">
            <input
              type="range"
              min="1"
              max="2"
              step="0.01"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex flex-col items-center space-y-2">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setImage(null);
                  setError(null);
                }}
                disabled={isLoading}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            {currentAvatar ? (
              <img
                src={currentAvatar}
                alt="Current avatar"
                className="w-[24rem] h-[24rem] rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No avatar</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white text-sm">Change avatar</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
