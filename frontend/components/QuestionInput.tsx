import { useState } from "react";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Props {
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
}: Props) {
  const [newAnswerText, setNewAnswerText] = useState("");

  const addAnswer = () => {
    if (!newAnswerText.trim()) return;
    onChangeAnswers([...answers, { text: newAnswerText, isCorrect: false }]);
    setNewAnswerText("");
  };

  const toggleCorrect = (index: number) => {
    const updated = answers.map((a, i) =>
      type === "checkbox"
        ? i === index
          ? { ...a, isCorrect: !a.isCorrect }
          : a
        : i === index
        ? { ...a, isCorrect: true }
        : { ...a, isCorrect: false }
    );
    onChangeAnswers(updated);
  };

  const removeAnswer = (index: number) => {
    onChangeAnswers(answers.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4 p-4 border rounded bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <input
          type="text"
          value={question}
          onChange={(e) => onChangeQuestion(e.target.value)}
          placeholder="Question text"
          className="border p-1 rounded w-full"
        />
        <button
          onClick={onRemoveQuestion}
          className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
        >
          X
        </button>
      </div>

      <select
        value={type}
        onChange={(e) => onChangeType(e.target.value as "input" | "checkbox" | "radio")}
        className="border p-1 rounded mb-2"
      >
        <option value="input">Input (text)</option>
        <option value="radio">Radio (single choice)</option>
        <option value="checkbox">Checkbox (multi choice)</option>
      </select>

      {type !== "input" && (
        <div className="flex flex-col gap-1">
          {answers.map((a, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type={type === "checkbox" ? "checkbox" : "radio"}
                checked={a.isCorrect}
                onChange={() => toggleCorrect(i)}
              />
              <input
                type="text"
                value={a.text}
                onChange={(e) =>
                  onChangeAnswers(
                    answers.map((ans, idx) => (idx === i ? { ...ans, text: e.target.value } : ans))
                  )
                }
                className="border p-1 rounded w-full"
              />
              <button
                onClick={() => removeAnswer(i)}
                className="px-1 py-1 bg-red-400 text-white rounded"
              >
                X
              </button>
            </div>
          ))}
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={newAnswerText}
              onChange={(e) => setNewAnswerText(e.target.value)}
              placeholder="New answer"
              className="border p-1 rounded w-full"
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