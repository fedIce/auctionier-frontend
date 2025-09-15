'use client';
import { useState } from "react";

export default function TagInput() {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  const addTag = (value) => {
    const trimmed = value.trim();
    if (
      trimmed &&
      !tags.includes(trimmed.toLowerCase()) &&
      /^[\w-]+$/.test(trimmed)
    ) {
      setTags([...tags, trimmed.toLowerCase()]);
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (["Enter", ","].includes(e.key)) {
      e.preventDefault();
      addTag(input);
      setInput("");
    } else if (e.key === "Backspace" && input === "") {
      setTags(tags.slice(0, -1));
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tags
      </label>

      <div className="flex flex-wrap gap-2 items-center border border-gray-300 bg-background rounded px-2 py-2 focus-within:ring-2 focus-within:ring-third-500">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center bg-third-100 text-third-700 px-2 py-1 rounded text-sm"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-1 text-third-500 hover:text-third-700 focus:outline-none"
              aria-label={`Remove ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}

        <input
          className="flex-1 min-w-[100px] border-none focus:outline-none focus:ring-0 text-sm"
          type="text"
          placeholder="Type and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <p className="mt-1 text-sm text-gray-500">
        Press <kbd>Enter</kbd> or <kbd>,</kbd> to add a tag.
      </p>
    </div>
  );
}
