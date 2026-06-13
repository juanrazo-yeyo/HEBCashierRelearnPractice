// src/components/ScenarioPanel.jsx
// Shows the current scenario info, step progress, and scenario list overview.

import { SCENARIOS } from '../data/scenarios';

export default function ScenarioPanel({
  currentScenarioIndex,
  currentStepIndex,
  currentScenario,
  mistakes,
  hintsEnabled,
}) {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Current scenario badge */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Current Task</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              currentScenario?.difficulty === 'beginner'
                ? 'bg-green-900 text-green-300'
                : 'bg-yellow-900 text-yellow-300'
            }`}
          >
            {currentScenario?.difficulty?.toUpperCase() || 'N/A'}
          </span>
        </div>
        <div className="text-white font-bold text-sm leading-tight">
          {currentScenario?.title || '—'}
        </div>
        <div className="text-gray-400 text-xs mt-1 leading-snug">
          {currentScenario?.description || ''}
        </div>

        {/* Step dots */}
        {currentScenario && (
          <div className="flex flex-wrap gap-1 mt-2">
            {currentScenario.steps.map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i < currentStepIndex
                    ? 'bg-green-500'
                    : i === currentStepIndex
                    ? 'bg-yellow-400 ring-2 ring-yellow-300 ring-offset-1 ring-offset-gray-900'
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        )}

        {/* Mistakes this scenario */}
        {mistakes > 0 && (
          <div className="mt-2 text-xs text-red-400 font-mono">
            ⚠ {mistakes} mistake{mistakes !== 1 ? 's' : ''} this scenario
          </div>
        )}
      </div>

      {/* Scenario list */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-2 flex-1 overflow-y-auto">
        <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-2 px-1">
          All Scenarios
        </div>
        <div className="space-y-1">
          {SCENARIOS.map((s, i) => {
            const isDone = i < currentScenarioIndex;
            const isCurrent = i === currentScenarioIndex;
            const isLocked = i > currentScenarioIndex;
            return (
              <div
                key={s.id}
                className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs font-mono transition-colors ${
                  isCurrent
                    ? 'bg-yellow-900/40 border border-yellow-600/50 text-yellow-300'
                    : isDone
                    ? 'bg-green-900/20 text-green-500'
                    : 'text-gray-600'
                }`}
              >
                <span className="w-5 text-center shrink-0">
                  {isDone ? '✓' : isCurrent ? '▶' : `${i + 1}`}
                </span>
                <span className="truncate">{s.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
