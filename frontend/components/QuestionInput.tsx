import { useState } from "react";

export interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Props {
  question: string;
  type: "input" | "radio" | "checkbox";
  answers: Answer[];
  onChangeQuestion: (text: string) => void;
  onChangeType: (type: "input" | "radio" | "checkbox") => void;
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
  onRemoveQuestion
}: Props) {

  const handleAnswerTextChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index].text = value;
    onChangeAnswers(newAnswers);
  };

  const handleAnswerCorrectChange = (index: number, checked: boolean) => {
    const newAnswers = [...answers];

    if (type === "radio") {
      newAnswers.forEach((a, i) => newAnswers[i].isCorrect = false);
      newAnswers[index].isCorrect = checked;
    } else {
      newAnswers[index].isCorrect = checked;
    }

    onChangeAnswers(newAnswers);
  };

  const handleDeleteAnswer = (index: number) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    onChangeAnswers(newAnswers);
  };

  const handleAddAnswer = () => {
    onChangeAnswers([...answers, { text: "", isCorrect: false }]);
  };

  return (
    <div className="mb-4 border p-4 rounded">
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
          Remove
        </button>
      </div>

      <select
        value={type}
        onChange={(e) => onChangeType(e.target.value as "input" | "radio" | "checkbox")}
        className="border p-1 rounded mb-2"
      >
        <option value="input">Input</option>
        <option value="radio">Single choice (radio)</option>
        <option value="checkbox">Multiple choice (checkbox)</option>
      </select>

      {type !== "input" && (
        <div>
          {answers.map((a, i) => (
            <div key={i} className="flex gap-2 mb-1 items-center">
              <input
                type="text"
                value={a.text}
                onChange={(e) => handleAnswerTextChange(i, e.target.value)}
                placeholder="Answer text"
                className="border p-1 rounded w-full"
              />
              <input
                type="checkbox"
                checked={a.isCorrect}
                onChange={(e) => handleAnswerCorrectChange(i, e.target.checked)}
              />
              <button
                type="button"
                onClick={() => handleDeleteAnswer(i)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAnswer}
            className="mt-1 px-2 py-1 bg-blue-500 text-white rounded"
          >
            Add Answer
          </button>
        </div>
      )}
    </div>
  );
}