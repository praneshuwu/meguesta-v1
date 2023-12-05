// components/CustomFileInput.tsx
import React, { useRef, useState } from "react";
import { ref, uploadBytes, getStorage, listAll, getDownloadURL } from 'firebase/storage';
import { firebaseDB } from '../utils/firebase';
import { v4 as uuidV4 } from 'uuid';
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
const CustomFileInput = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files ?? []);
    setSelectedFiles(files);
  };

  const handleFileUpload = async () => {
    const fileRef = ref(firebaseDB, `guests/uploads/${selectedFiles[0].name + uuidV4()}`);
    uploadBytes(fileRef, selectedFiles[0]).then((uploadRes) => {
      if (uploadRes) {
        window.location.reload();
      }
    }).catch((err)=>{
      if(err){
        alert("Something went wrong. Please try again later")
      }
    })

  };

  return (
    <div className="pointer z-10 w-full">
      <div
        onClick={handleClick}
        className="w-full p-4 flex flex-col items-center gap-2 border-[0.5px] border-gray-700 text-white rounded-lg hover:bg-white/10 cursor-pointer font-bold"
      >
        <CloudArrowUpIcon className="w-6 h-6" />
        <span>Choose your favourite photos</span>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden file-input"
          onChange={handleChange}
        />
      </div>
      {!!selectedFiles.length && (
        <div className="p-4 mt-4 bg-white/0 overflow-hidden text-ellipsis">
          {selectedFiles.map((file, i) => {
            return (
              <span key={i} className="text-gray-500 whitespace-nowrap block mx-auto">
                <img src={URL.createObjectURL(file)} alt="Selected Photo" className="max-h-[200px] object-contain rounded-lg block mx-auto" />
              </span>
            );
          })}
        </div>
      )}
      <button className='w-full pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4' onClick={handleFileUpload}>
        Upload
      </button>
    </div>
  );
};

export default CustomFileInput;
