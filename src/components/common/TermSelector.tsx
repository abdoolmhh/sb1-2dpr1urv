import React from 'react';

interface TermSelectorProps {
  selectedTerm: number;
  onChange: (term: number) => void;
}

export default function TermSelector({ selectedTerm, onChange }: TermSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Select Term
      </label>
      <select
        value={selectedTerm}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        <option value={1}>First Term</option>
        <option value={2}>Second Term</option>
        <option value={3}>Third Term</option>
      </select>
    </div>
  );
}