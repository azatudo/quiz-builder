import { useState } from "react";

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface QuestionProps {
  question: string;
  type: "input" | "checkbox" | "radio";
  answers: Answer[];
  onChangeQuestion: (text: string) => void;
  onChangeType: (type: "input" | "checkbox" | "radio") => void;
  onChangeAnswers: (answers: Answer[]) => void;
  onRemoveQuestion: () => void;
}

export default function QuestionInput({
  question,
  type,
  answers,
  onChangeQuestion,
  onChangeType,
  onChangeAnswers,
  onRemoveQuestion,
}: QuestionProps) {
  const [newAnswer, setNewAnswer] = useState("");

  const addAnswer = () => {
    if (!newAnswer.trim()) return;
    onChangeAnswers([...answers, { text: newAnswer, isCorrect: false }]);
    setNewAnswer("");
  };

  const toggleCorrect = (index: number) => {
    const updated = answers.map((a, i) =>
      i === index ? { ...a, isCorrect: !a.isCorrect } : a
    );
    onChangeAnswers(updated);
  };

  const removeAnswer = (index: number) => {
    const updated = answers.filter((_, i) => i !== index);
    onChangeAnswers(updated);
  };

  return (
    <div className="p-4 bg-gray-50 rounded mb-4 border">
      <div className="flex justify-between items-center mb-2">
        <input
          type="text"
          value={question}
          onChange={(e) => onChangeQuestion(e.target.value)}
          placeholder="Question text"
          className="border p-1 rounded w-full mr-2"
        />
        <button
          type="button"
          onClick={onRemoveQuestion}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>

      <div className="mb-2">
        <label className="mr-2">
          Type:
          <select
            value={type}
            onChange={(e) =>
              onChangeType(e.target.value as "input" | "checkbox" | "radio")
            }
            className="ml-1 border rounded p-1"
          >
            <option value="input">Input</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
          </select>
        </label>
      </div>

      {type !== "input" && (
        <div className="mb-2">
          {answers.map((a, i) => (
            <div key={i} className="flex items-center gap-2 mb-1">
              <input
                type="text"
                value={a.text}
                onChange={(e) => {
                  const updated = [...answers];
                  updated[i].text = e.target.value;
                  onChangeAnswers(updated);
                }}
                placeholder="Answer text"
                className="border p-1 rounded flex-1"
              />
              <label className="flex items-center gap-1">
                Correct
                <input
                  type="checkbox"
                  checked={a.isCorrect}
                  onChange={() => toggleCorrect(i)}
                />
              </label>
              <button
                type="button"
                onClick={() => removeAnswer(i)}
                className="px-1 py-0.5 bg-red-400 text-white rounded"
              >
                X
              </button>
            </div>
          ))}

          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="New answer"
              className="border p-1 rounded flex-1"
            />
            <button
              type="button"
              onClick={addAnswer}
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}