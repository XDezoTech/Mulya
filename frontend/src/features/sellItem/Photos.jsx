import { useDispatch, useSelector } from 'react-redux';
import { addPhoto, removePhoto } from './sellItemSlice';
import { useEffect, useState } from 'react';

function Photos({ setRealFiles }) {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.sellItem.photos); // Previews in Redux
  const [localFiles, setLocalFiles] = useState([]); // Local files state (for handling local file management)

  useEffect(() => {
    console.log('localFiles now is:', localFiles);
  }, [localFiles]);

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files); // Convert file list to array

    // Add the selected files to the local realFiles state
    setRealFiles((prev) => [...prev, ...files]);
    setLocalFiles((prev) => [...prev, ...files]);

    // Read each file as a base64 string and dispatch it to Redux for preview
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        dispatch(addPhoto(event.target.result)); // Dispatch base64 string to Redux
      };
      reader.readAsDataURL(file); // Read file as base64
    });
  };

  const handleRemovePhoto = (indexToRemove) => {
    // Remove from local files
    const updatedLocalFiles = localFiles.filter(
      (_, index) => index !== indexToRemove,
    );
    setLocalFiles(updatedLocalFiles);

    // Remove from real files (parent)
    setRealFiles(updatedLocalFiles);
    // Remove from Redux (photos)
    dispatch(removePhoto(indexToRemove));
  };

  return (
    <div className="flex h-84 flex-col space-y-6">
      <div>
        <label className="mb-2 block text-lg font-medium text-gray-700">
          Upload Item Photos
        </label>

        {/* custom-styled file-picker */}
        <label className="relative flex cursor-pointer items-center justify-between rounded-md border-2 border-gray-300 p-3 focus-within:border-indigo-500 hover:border-indigo-500">
          <span className="text-gray-700">Choose files</span>
          <span className="text-sm text-gray-600">
            {localFiles.length > 0
              ? `${localFiles.length} file${localFiles.length > 1 ? 's' : ''} selected`
              : 'No files chosen'}
          </span>

          {/* actual file input is invisible but fills the label */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoChange}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>
      </div>

      {/* previews with remove buttons */}
      <div className="flex flex-wrap gap-2">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <img
              src={photo}
              alt={`Uploaded ${index}`}
              className="h-20 w-20 rounded-md object-cover"
            />
            <button
              onClick={() => handleRemovePhoto(index)}
              className="absolute top-0 right-0 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photos;
