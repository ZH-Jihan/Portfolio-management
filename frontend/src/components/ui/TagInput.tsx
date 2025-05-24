import React from "react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
}

export default function TagInput({
  value,
  onChange,
  placeholder,
  label,
}: TagInputProps) {
  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      if (!value.includes(e.currentTarget.value.trim())) {
        onChange([...value, e.currentTarget.value.trim()]);
      }
      e.currentTarget.value = "";
    }
  };

  const handleRemove = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="mb-4 flex flex-wrap gap-2 items-center">
      {label && <span className="mr-2 font-medium text-sm">{label}</span>}
      <input
        type="text"
        placeholder={placeholder || "Add and press Enter"}
        className="border rounded px-2 py-1 text-sm"
        onKeyDown={handleInput}
      />
      {value.map((tag) => (
        <span
          key={tag}
          className="bg-muted px-2 py-1 rounded text-xs flex items-center gap-1"
        >
          {tag}
          <button
            onClick={() => handleRemove(tag)}
            className="ml-1 text-red-500"
            type="button"
          >
            &times;
          </button>
        </span>
      ))}
    </div>
  );
}
