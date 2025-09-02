import { ChangeEvent } from "react";

interface AnswerInputProps {
  value: string;
  isCorrect: boolean;
  onChangeText: (text: string) => void;
  onChangeCorrect: (checked: boolean) => void;
  onRemove: () => void;
}

export default function AnswerInput({ value, isCorrect, onChangeText, onChangeCorrect, onRemove }: AnswerInputProps) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <input
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeText(e.target.value)}
        placeholder="Answer text"
        className="border p-1 rounded flex-1"
      />
      <label className="flex items-center gap-1">
        Correct
        <input
          type="checkbox"
          checked={isCorrect}
          onChange={(e) => onChangeCorrect(e.target.checked)}
        />
      </label>
      <button type="button" onClick={onRemove} className="px-2 py-1 bg-red-500 text-white rounded">
        Delete
      </button>
    </div>
  );
}