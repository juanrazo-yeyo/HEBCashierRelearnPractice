// src/components/RegisterScreen.jsx
// The main POS/cashier display screen showing instructions, status, and feedback.

import { SCENARIOS } from '../data/scenarios';

export default function RegisterScreen({
  currentScenario,
  currentStep,
  currentStepIndex,
  currentScenarioIndex,
  feedback,
  mistakes,
  elapsedTime,
  hintsEnabled,
  enteredDigits,
}) {
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const progress = currentScenario
    ? Math.round((currentStepIndex / currentScenario.steps.length) * 100)
    : 0;

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden border-4 border-gray-600"
         style={{ background: 'var(--register-bg)' }}>

      {/* Screen Header Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-900 border-b border-gray-700">
        <div className="text-xs text-gray-500 font-mono tracking-widest">NCR POS TERMINAL v4.2</div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-red-400">ERR: {mistakes}</span>
          <span className="text-yellow-400">⏱ {formatTime(elapsedTime)}</span>
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${hintsEnabled ? 'bg-green-400' : 'bg-gray-600'}`} />
            <span className="text-gray-400">{hintsEnabled ? 'HINT' : 'TEST'}</span>
          </span>
        </div>
      </div>

      {/* Main Screen - Green on Black POS look */}
      <div
        className="flex-1 scanlines px-4 py-3 overflow-hidden"
        style={{ background: 'var(--screen-bg)', fontFamily: '"Courier New", monospace' }}
      >
        {/* Scenario progress */}
        {currentScenario && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--screen-dim)' }}>
              <span>SCENARIO {currentScenarioIndex + 1}/{SCENARIOS.length}: {currentScenario.title.toUpperCase()}</span>
              <span>STEP {currentStepIndex + 1}/{currentScenario.steps.length}</span>
            </div>
            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--screen-dim), var(--screen-green))',
                }}
              />
            </div>
          </div>
        )}

        {/* Current instruction */}
        <div
          className="rounded-lg p-3 mb-3 border"
          style={{
            background: 'rgba(0,255,136,0.05)',
            borderColor: 'rgba(0,255,136,0.2)',
          }}
        >
          <div className="text-xs mb-1" style={{ color: 'var(--screen-dim)' }}>INSTRUCTION:</div>
          <div
            className="text-sm leading-relaxed"
            style={{ color: 'var(--screen-green)' }}
          >
            {currentStep?.instruction || 'Waiting for input...'}
          </div>
        </div>

        {/* Hint */}
        {hintsEnabled && currentStep?.hint && (
          <div
            className="rounded-lg px-3 py-2 mb-3 border text-xs"
            style={{
              background: 'rgba(255,200,0,0.06)',
              borderColor: 'rgba(255,200,0,0.25)',
              color: '#fbbf24',
            }}
          >
            💡 HINT: {currentStep.hint}
          </div>
        )}

        {/* Expected key display */}
        {hintsEnabled && currentStep?.expectedKey && (
          <div className="text-center mb-3">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold border"
              style={{
                borderColor: 'rgba(0,255,136,0.4)',
                color: 'var(--screen-green)',
                background: 'rgba(0,255,136,0.08)',
              }}
            >
              PRESS → [{currentStep.expectedKey}]
            </span>
          </div>
        )}

        {/* Entered digits display (for cash amount entry) */}
        {enteredDigits && (
          <div
            className="rounded p-2 mb-3 text-center font-bold text-2xl tracking-widest"
            style={{ color: 'var(--screen-green)', background: 'rgba(0,255,136,0.05)' }}
          >
            ${(parseFloat(enteredDigits || '0') / 100).toFixed(2)}
            <span className="blink">_</span>
          </div>
        )}

        {/* Feedback overlay */}
        {feedback && (
          <div
            className={`rounded-lg p-3 text-center font-bold text-sm border animate-pulse`}
            style={{
              background: feedback.type === 'correct'
                ? 'rgba(0,255,136,0.15)'
                : 'rgba(255,50,50,0.15)',
              borderColor: feedback.type === 'correct'
                ? 'rgba(0,255,136,0.5)'
                : 'rgba(255,50,50,0.5)',
              color: feedback.type === 'correct' ? 'var(--screen-green)' : '#ff6666',
            }}
          >
            {feedback.message}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div
        className="px-3 py-1.5 flex justify-between text-xs border-t border-gray-700"
        style={{ background: '#0d1117', color: '#4b5563', fontFamily: 'monospace' }}
      >
        <span>LANE 04 · CASHIER TRAINING</span>
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
