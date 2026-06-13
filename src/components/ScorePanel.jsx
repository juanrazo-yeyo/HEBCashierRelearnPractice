// src/components/ScorePanel.jsx
// Final results screen shown after all scenarios are completed.

export default function ScorePanel({ scenarioResults, totalScore, elapsedTime, goHome }) {
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const totalMistakes = scenarioResults.reduce((sum, r) => sum + r.mistakes, 0);
  const maxPossible = scenarioResults.length * 1000;
  const percentage = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;

  const getRating = (pct) => {
    if (pct >= 95) return { label: 'MASTER CASHIER', color: 'text-yellow-400', emoji: '🏆' };
    if (pct >= 80) return { label: 'EXPERIENCED', color: 'text-green-400', emoji: '⭐' };
    if (pct >= 60) return { label: 'GETTING THERE', color: 'text-blue-400', emoji: '💪' };
    return { label: 'NEEDS PRACTICE', color: 'text-red-400', emoji: '📚' };
  };

  const rating = getRating(percentage);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a0f0f 100%)' }}
    >
      {/* Card */}
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-red-700 px-6 py-4 text-center">
          <div className="text-white font-bold text-2xl tracking-wide" style={{ fontFamily: 'Orbitron, monospace' }}>
            ★ H-E-B ★
          </div>
          <div className="text-red-200 text-sm tracking-widest mt-1 font-mono uppercase">
            Training Session Complete
          </div>
        </div>

        {/* Score circle */}
        <div className="flex flex-col items-center py-8 border-b border-gray-700">
          <div className="text-6xl mb-2">{rating.emoji}</div>
          <div className={`text-2xl font-bold font-mono ${rating.color}`}>{rating.label}</div>
          <div className="text-5xl font-bold text-white mt-3 font-mono">{totalScore.toLocaleString()}</div>
          <div className="text-gray-500 text-sm font-mono mt-1">TOTAL POINTS · {percentage}%</div>

          {/* Progress bar */}
          <div className="w-64 h-3 bg-gray-700 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${percentage}%`,
                background: percentage >= 80
                  ? 'linear-gradient(90deg, #16a34a, #4ade80)'
                  : percentage >= 60
                  ? 'linear-gradient(90deg, #ca8a04, #fbbf24)'
                  : 'linear-gradient(90deg, #b91c1c, #f87171)',
              }}
            />
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 divide-x divide-gray-700 border-b border-gray-700">
          <div className="py-4 text-center">
            <div className="text-2xl font-bold text-white font-mono">{scenarioResults.length}</div>
            <div className="text-gray-500 text-xs font-mono uppercase mt-1">Scenarios</div>
          </div>
          <div className="py-4 text-center">
            <div className={`text-2xl font-bold font-mono ${totalMistakes === 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalMistakes}
            </div>
            <div className="text-gray-500 text-xs font-mono uppercase mt-1">Mistakes</div>
          </div>
          <div className="py-4 text-center">
            <div className="text-2xl font-bold text-white font-mono">{formatTime(elapsedTime)}</div>
            <div className="text-gray-500 text-xs font-mono uppercase mt-1">Total Time</div>
          </div>
        </div>

        {/* Per-scenario breakdown */}
        <div className="px-6 py-4">
          <div className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-3">Scenario Breakdown</div>
          <div className="space-y-2">
            {scenarioResults.map((r, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-800 rounded-lg px-3 py-2">
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-xs font-mono w-4">{i + 1}</span>
                  <span className="text-white text-sm font-mono truncate max-w-[200px]">{r.scenario}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className={r.mistakes === 0 ? 'text-green-400' : 'text-red-400'}>
                    {r.mistakes === 0 ? '✓ PERFECT' : `${r.mistakes} err`}
                  </span>
                  <span className="text-yellow-400 font-bold w-16 text-right">{r.score.toLocaleString()} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-6 py-4 flex gap-3">
          <button
            onClick={() => goHome()}
            className="flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-3 rounded-xl font-mono text-sm tracking-widest transition-colors uppercase"
          >
            Practice Again
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-gray-700 text-xs font-mono mt-6 text-center max-w-md">
        This is an unofficial personal practice simulator and is not affiliated with or endorsed by H-E-B Grocery Company, LP.
      </p>
    </div>
  );
}
