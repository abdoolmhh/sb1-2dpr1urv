import React from 'react';
import Input from '../common/Input';

interface ScoreInputProps {
  label: string;
  value: number;
  maxScore: number;
  weight: number;
  onChange: (value: number) => void;
}

export default function ScoreInput({
  label,
  value,
  maxScore,
  weight,
  onChange,
}: ScoreInputProps) {
  return (
    <div>
      <label className="flex items-center justify-between text-sm font-medium text-gray-700">
        <span>{label}</span>
        <span className="text-gray-500">({weight}%)</span>
      </label>
      <Input
        type="number"
        min={0}
        max={maxScore}
        value={value}
        onChange={(e) => {
          const newValue = Math.min(Number(e.target.value), maxScore);
          onChange(newValue);
        }}
        className="mt-1"
      />
      <div className="mt-1 h-1 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full transition-all"
          style={{ width: `${(value / maxScore) * 100}%` }}
        />
      </div>
    </div>
  );
}