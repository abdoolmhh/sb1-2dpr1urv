import React, { useState } from 'react';
import ResultsList from '../components/results/ResultsList';
import ResultForm from '../components/results/ResultForm';
import TermSelector from '../components/common/TermSelector';
import { useResults } from '../hooks/useResults';
import { Score } from '../types';

export default function ResultsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<Score | undefined>();
  const [selectedTerm, setSelectedTerm] = useState(1);
  const { results, addResult, getResultSummary } = useResults();

  const handleAddResult = () => {
    setSelectedResult(undefined);
    setIsFormOpen(true);
  };

  const handleEditResult = (result: Score) => {
    setSelectedResult(result);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: Omit<Score, 'studentId'>) => {
    addResult({ ...data, term: selectedTerm });
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold text-gray-900">Results Management</h1>
        <div className="w-48">
          <TermSelector
            selectedTerm={selectedTerm}
            onChange={setSelectedTerm}
          />
        </div>
      </div>

      {isFormOpen ? (
        <div className="bg-white rounded-lg shadow p-6">
          <ResultForm
            score={selectedResult}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      ) : (
        <ResultsList
          onAddResult={handleAddResult}
          onEditResult={handleEditResult}
        />
      )}
    </div>
  );
}