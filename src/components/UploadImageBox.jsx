"use client";

import { RiUploadCloud2Line, RiLoader4Line, RiCloseLine } from "@remixicon/react";
import ButtonSecondary from "@/components/ButtonSecondary";
import { useRef, useState } from "react";
import { uploadImage } from "@/libs/firebase";
import FormErrorMessage from "@/components/form/FormErrorMessage";

export default function UploadImageBox({ folder, defaultUrl, msg, error, className="", afterUpload }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(defaultUrl);

  // Trigger clicking the invisible file input
  const handleClick = () => {
    inputRef.current?.click();
  }

  const removeImage = () => {
    setUrl(null);       // Set URL ref back to null
    afterUpload("imgUrl", null);  // Set parent's URL ref back to null
  }

  // Image selection/uploading
  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // Unique filename - to be improved
      const filename = Date.now();
      
      // Upload image to firebase and return URL
      const downloadUrl = await uploadImage(file, folder, filename);
      
      setUrl(downloadUrl);        // Set URL state for this component to render the image
      afterUpload("imgUrl", downloadUrl);   // Advise parent element of URL
    } catch (error) {
      console.error("File upload failed", error)
    } finally {
      setUploading(false);        // Reset uploading state
    }
  }

  return (
    <div
      className={`
        ${className} bg-bg-mid relative aspect-square border-1 border-text-tertiary
        border-dashed color-white flex flex-col justify-center items-center`}
    >
      {/* If uploading, display loading icon, else display upload prompt */}
      {uploading || url ? (
        <RiLoader4Line className="animate-spin mt-14" size={50} />
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-full">
          {/* Upload prompt */}
          <RiUploadCloud2Line size={50} className="text-gray-500" />
          <p>{msg}</p>
          
          {/* Invisible file input triggered on below button press */}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
          <ButtonSecondary onClick={handleClick} className="mt-5">
            Browse
          </ButtonSecondary>
        </div>
      )}

      {/* Uploaded image */}
      {url && 
        <div className="absolute w-full h-full z-30">
          <div
            className="relative w-full h-full group"
            style={url ? { backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
              {/* Close button */}
              <button 
                className="absolute group-hover:block hidden top-5 z-26 right-5 cursor-pointer text-white hover:text-gray-200"
                onClick={removeImage}
              >
                <RiCloseLine />
              </button>

              {/* Re-upload button */}
              <a onClick={handleClick} className="font-bold cursor-pointer z-26 group-hover:block hover:text-gray-200 hidden absolute bottom-3 left-3">
                Replace image
              </a>

              {/* Overlay on hover */}
              <div className="group-hover:bg-black/60 bg-black/0 transition-all ease-in-out absolute w-full h-full"></div>
          </div>
        </div>
      }
      {error && <FormErrorMessage error={error} />}
    </div>
  );
}