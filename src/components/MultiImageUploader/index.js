'use client';
import { useState, useRef } from "react";

export default function MultiImageUploader() {
  const [images, setImages] = useState([]);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    const newList = [...images];
    const draggedItem = newList[dragItem.current];
    newList.splice(dragItem.current, 1);
    newList.splice(dragOverItem.current, 0, draggedItem);
    setImages(newList);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  }

  return (
    <div className="w-full  mx-auto">
      {/* Drop Zone */}
      <div
        className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center text-gray-500 cursor-pointer hover:border-indigo-400 transition"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById("imageInput").click()}
      >
        <p className="text-sm">Drag & drop images here, or click to upload</p>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-4 ">
          {images.map((img, index) => (
            <div className="relative" key={index}>
              <div
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                className="relative group border-2 rounded overflow-hidden"
              >
                <img
                  src={img.url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-auto aspect-video object-cover"
                />
                {/* Thumbnail badge */}
                {/* {index === 0 && (
                  <span className="absolute top-1 left-1 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded">
                    Thumbnail
                  </span>
                )} */}
                {/* Hover Overlay */}
                <div className="absolute inset-0 z-40 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs">
                  Drag to Reorder
                </div>
              </div>
              <div onClick={() => removeImage(index)} className="absolute z-50 cursor-pointer -right-0 -top-0 h-8 flex justify-center items-center text-center aspect-square text-gray-400  bg-red-500 ">x</div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
