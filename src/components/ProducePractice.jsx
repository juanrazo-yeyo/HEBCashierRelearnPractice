import { useState, useEffect, useRef, useCallback } from 'react';
import CashierKeyboard from './CashierKeyboard';

const ALL_ITEMS = [
  { name:'Bananas',             plu:'4011', emoji:'🍌', category:'Popular Produce',          type:'weighted' },
  { name:'Avocados (Small)',    plu:'4046', emoji:'🥑', category:'Popular Produce',          type:'quantity' },
  { name:'Avocados (Large)',    plu:'4225', emoji:'🥑', category:'Popular Produce',          type:'quantity' },
  { name:'Avocados (Jumbo)',    plu:'4770', emoji:'🥑', category:'Popular Produce',          type:'quantity' },
  { name:'Asparagus',           plu:'4521', emoji:'🌿', category:'Popular Produce',          type:'weighted' },
  { name:'Broccoli Crowns',     plu:'4548', emoji:'🥦', category:'Popular Produce',          type:'weighted' },
  { name:'Cilantro',            plu:'4889', emoji:'🌿', category:'Popular Produce',          type:'quantity' },
  { name:'Celery',              plu:'4070', emoji:'🥬', category:'Popular Produce',          type:'quantity' },
  { name:'Corn (Yellow)',       plu:'4078', emoji:'🌽', category:'Popular Produce',          type:'quantity' },
  { name:'Cucumbers',           plu:'4062', emoji:'🥒', category:'Popular Produce',          type:'quantity' },
  { name:'Garlic',              plu:'4608', emoji:'🧄', category:'Popular Produce',          type:'weighted' },
  { name:'Ginger Root',         plu:'4612', emoji:'🫚', category:'Popular Produce',          type:'weighted' },
  { name:'Green Beans',         plu:'4066', emoji:'🫘', category:'Popular Produce',          type:'weighted' },
  { name:'Carrots (Bulk)',      plu:'4562', emoji:'🥕', category:'Popular Produce',          type:'weighted' },
  { name:'Jalapeño Peppers',    plu:'4693', emoji:'🌶️', category:'Peppers & Tomatoes',     type:'weighted' },
  { name:'Serrano Peppers',     plu:'4709', emoji:'🌶️', category:'Peppers & Tomatoes',     type:'weighted' },
  { name:'Poblano Peppers',     plu:'4705', emoji:'🫑', category:'Peppers & Tomatoes',     type:'quantity' },
  { name:'Habanero Peppers',    plu:'3125', emoji:'🌶️', category:'Peppers & Tomatoes',     type:'weighted' },
  { name:'Green Bell Peppers',  plu:'4065', emoji:'🫑', category:'Peppers & Tomatoes',     type:'quantity' },
  { name:'Red Bell Peppers',    plu:'4088', emoji:'🫑', category:'Peppers & Tomatoes',     type:'quantity' },
  { name:'Roma Tomatoes',       plu:'4087', emoji:'🍅', category:'Peppers & Tomatoes',     type:'weighted' },
  { name:'Tomatoes on the Vine',plu:'4664', emoji:'🍅', category:'Peppers & Tomatoes',     type:'weighted' },
  { name:'Honeycrisp',          plu:'3283', emoji:'🍎', category:'Apples',                  type:'quantity' },
  { name:'Fuji',                plu:'4131', emoji:'🍎', category:'Apples',                  type:'quantity' },
  { name:'Gala',                plu:'4135', emoji:'🍎', category:'Apples',                  type:'quantity' },
  { name:'Granny Smith',        plu:'4017', emoji:'🍏', category:'Apples',                  type:'quantity' },
  { name:'Red Delicious',       plu:'4016', emoji:'🍎', category:'Apples',                  type:'quantity' },
  { name:'Yellow Onions',       plu:'4093', emoji:'🧅', category:'Onions & Potatoes',       type:'weighted' },
  { name:'Red Onions',          plu:'4082', emoji:'🧅', category:'Onions & Potatoes',       type:'weighted' },
  { name:'White Onions',        plu:'4663', emoji:'🧅', category:'Onions & Potatoes',       type:'weighted' },
  { name:'Green Onions',        plu:'4068', emoji:'🌿', category:'Onions & Potatoes',       type:'quantity' },
  { name:'Russet Potatoes',     plu:'4072', emoji:'🥔', category:'Onions & Potatoes',       type:'weighted' },
  { name:'Red Potatoes',        plu:'4073', emoji:'🥔', category:'Onions & Potatoes',       type:'weighted' },
  { name:'Sweet Potatoes',      plu:'4816', emoji:'🍠', category:'Onions & Potatoes',       type:'weighted' },
  { name:'Lemons',              plu:'4033', emoji:'🍋', category:'Melons, Citrus & Berries', type:'quantity' },
  { name:'Limes',               plu:'4048', emoji:'🍋', category:'Melons, Citrus & Berries', type:'quantity' },
  { name:'Cantaloupe',          plu:'4050', emoji:'🍈', category:'Melons, Citrus & Berries', type:'weighted' },
  { name:'Honeydew',            plu:'4034', emoji:'🍈', category:'Melons, Citrus & Berries', type:'weighted' },
  { name:'Seedless Watermelon', plu:'4032', emoji:'🍉', category:'Melons, Citrus & Berries', type:'weighted' },
  { name:'Kiwi',                plu:'4030', emoji:'🥝', category:'Melons, Citrus & Berries', type:'quantity' },
  { name:'Bolillos (Bulk)',     plu:'5308', emoji:'🍞', category:'Bakery & Prepared Foods',  type:'quantity' },
  { name:'Individual Doughnuts',plu:'5303', emoji:'🍩', category:'Bakery & Prepared Foods',  type:'quantity' },
  { name:'Pan Dulce',           plu:'5303', emoji:'🧁', category:'Bakery & Prepared Foods',  type:'quantity' },
  { name:'Muffins & Pastries',  plu:'5379', emoji:'🧁', category:'Bakery & Prepared Foods',  type:'quantity' },
];

const randWeight = () => (Math.random() * 3.2 + 0.3).toFixed(2);
const randQty    = () => Math.floor(Math.random() * 7) + 2;

function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── IPMS badge helper ─────────────────────────────────────────────────────────
function IpmsBadge({ ipms }) {
  const isGood = ipms >= 30;
  return (
    <div className={`rounded-xl border-2 p-3 text-center transition-all duration-500
      ${isGood
        ? 'border-green-500 bg-green-900/30'
        : 'border-yellow-600 bg-yellow-900/20'}`}>
      <div className="text-[10px] font-mono uppercase tracking-widest mb-1"
           style={{ color: isGood ? '#4ade80' : '#facc15' }}>
        IPMS
      </div>
      <div className={`text-2xl font-black font-mono ${isGood ? 'text-green-400' : 'text-yellow-400'}`}>
        {ipms.toFixed(1)}
      </div>
      <div className="text-[9px] font-mono text-gray-500 mt-0.5">items/min</div>

      {/* Feedback message */}
      <div className={`mt-2 text-[10px] font-mono leading-tight px-1
        ${isGood ? 'text-green-300' : 'text-yellow-300'}`}>
        {ipms === 0
          ? 'Start scanning!'
          : isGood
          ? '🔥 Great job! Try a difficult level when ready.'
          : '📚 Keep practicing — aim for 30+'}
      </div>

      {/* Progress bar toward 30 */}
      <div className="mt-2 w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${Math.min(100, (ipms / 30) * 100)}%`,
            background: isGood
              ? 'linear-gradient(90deg,#16a34a,#4ade80)'
              : 'linear-gradient(90deg,#a16207,#facc15)',
          }}
        />
      </div>
      <div className="text-[9px] font-mono text-gray-600 mt-0.5">goal: 30 items/min</div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ProducePractice({ onBack }) {
  const [queue,      setQueue]      = useState(() => shuffled(ALL_ITEMS));
  const [queueIndex, setQueueIndex] = useState(0);
  const [phase,      setPhase]      = useState('plu');
  const [typed,      setTyped]      = useState('');
  const [weight,     setWeight]     = useState('');
  const [quantity,   setQuantity]   = useState(0);
  const [screen,     setScreen]     = useState('');
  const [flash,      setFlash]      = useState(null);
  const [score,      setScore]      = useState(0);
  const [streak,     setStreak]     = useState(0);
  const [mistakes,   setMistakes]   = useState(0);
  const [scanned,    setScanned]    = useState([]);
  const [showHint, setShowHint] = useState(false);

  // ── Timer & IPMS ──────────────────────────────────────────────────────────
  const [elapsedSecs, setElapsedSecs] = useState(0);
  const [started,     setStarted]     = useState(false); // starts on first correct scan
  const timerRef    = useRef(null);
  const weighTimer  = useRef(null);
  const completedRef = useRef(0); // mirror of scanned.length for use inside callbacks

  // Start the clock on first successful scan
  const ensureTimerStarted = useCallback(() => {
    if (!started) {
      setStarted(true);
      timerRef.current = setInterval(() => setElapsedSecs(s => s + 1), 1000);
    }
  }, [started]);

  useEffect(() => () => {
    clearInterval(timerRef.current);
    clearTimeout(weighTimer.current);
  }, []);

  // IPMS = completed items / elapsed minutes (live)
  const elapsedMins = elapsedSecs / 60;
  const ipms = elapsedMins > 0 ? completedRef.current / elapsedMins : 0;

  const formatTime = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const currentItem = queue[queueIndex % queue.length];

  const advance = useCallback(() => {
  const next = queueIndex + 1;
  if (next % ALL_ITEMS.length === 0) setQueue(shuffled(ALL_ITEMS));
  setQueueIndex(next);
  setPhase('plu');
  setTyped('');
  setScreen('');
  setWeight('');
  setQuantity(0);
  setShowHint(false);   // ← add this line
}, [queueIndex]);

  const doFlash = (type) => {
    setFlash(type);
    setTimeout(() => setFlash(null), 700);
  };

  const handleKey = useCallback((key) => {
    const digits = ['0','1','2','3','4','5','6','7','8','9'];

    if (phase === 'plu') {
      if (digits.includes(key)) {
        const next = typed + key;
        setTyped(next);
        setScreen(next);
        return;
      }
      if (key === 'CLEAR') { setTyped(''); setScreen(''); return; }
      if (key === 'ENTER') {
        if (typed === currentItem.plu) {
          doFlash('correct');
          setScore(s => s + 10 + streak * 2);
          setStreak(s => s + 1);
          setScreen(typed + ' ✓');
          ensureTimerStarted();

          if (currentItem.type === 'weighted') {
            const w = randWeight();
            setWeight(w);
            setPhase('weighing');
            setScreen('Weighing...');
            weighTimer.current = setTimeout(() => {
              setScreen(`${w} lb`);
              setPhase('done');
              completedRef.current += 1;
              setScanned(prev => [...prev, { ...currentItem, weight: w }]);
              setTimeout(advance, 900);
            }, 800);
          } else {
            const qty = randQty();
            setQuantity(qty);
            setPhase('qty');
            setTyped('');
            setScreen('');
          }
        } else {
  doFlash('wrong');
  setMistakes(m => m + 1);
  setStreak(0);
  setScreen('ERR');
  setShowHint(true);   // show hint after first miss
  setTimeout(() => { setTyped(''); setScreen(''); }, 600);
}
        return;
      }
    }

    if (phase === 'qty') {
      if (digits.includes(key)) {
        const next = typed + key;
        setTyped(next);
        setScreen(next);
        return;
      }
      if (key === 'CLEAR') { setTyped(''); setScreen(''); return; }
      if (key === 'ENTER') {
        if (typed === String(quantity)) {
          doFlash('correct');
          setScore(s => s + 5);
          setScreen(`${typed} ea ✓`);
          setPhase('done');
          completedRef.current += 1;
          setScanned(prev => [...prev, { ...currentItem, quantity }]);
          setTimeout(advance, 900);
        } else {
          doFlash('wrong');
          setMistakes(m => m + 1);
          setStreak(0);
          setScreen('ERR');
          setTimeout(() => { setTyped(''); setScreen(''); }, 600);
        }
        return;
      }
    }
  }, [phase, typed, currentItem, streak, advance, quantity, ensureTimerStarted]);

  const instruction = () => {
    if (phase === 'plu')      return 'Type the PLU code and press ENTER';
    if (phase === 'weighing') return 'Weighing on scale…';
    if (phase === 'qty')      return `There are ${quantity} — type the quantity and press ENTER`;
    if (phase === 'done')     return '✓ Item accepted!';
    return '';
  };

  const screenBg   = flash === 'correct' ? '#00cc66' : flash === 'wrong' ? '#cc2222' : '#001a0d';
  const screenText = flash === 'correct' ? '#000'    : flash === 'wrong' ? '#fff'    : '#00ff88';

  return (
    <div className="min-h-screen flex flex-col"
         style={{ background:'linear-gradient(160deg,#0f0f1a 0%,#1a0808 60%,#0f0f1a 100%)' }}>

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-5 py-3 bg-black/40 border-b border-gray-800">
        <div className="text-red-600 font-black text-xl" style={{ fontFamily:'Orbitron,monospace' }}>★ H-E-B</div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-xs font-mono tracking-widest">PRODUCE PRACTICE</span>
          {/* Live timer in top bar */}
          <span className={`text-xs font-mono px-2 py-0.5 rounded border ${started ? 'text-yellow-400 border-yellow-800 bg-yellow-900/20' : 'text-gray-600 border-gray-800'}`}>
            ⏱ {formatTime(elapsedSecs)}
          </span>
        </div>
        <button onClick={onBack}
          className="text-gray-500 hover:text-white text-xs font-mono border border-gray-700 hover:border-gray-400 px-3 py-1 rounded transition-colors">
          ← BACK
        </button>
      </div>

      {/* ── Main ── */}
      <div className="flex flex-1 gap-4 p-4 overflow-hidden" style={{ minHeight:0 }}>

        {/* LEFT column */}
        <div className="flex flex-col gap-3 w-72 shrink-0">

          {/* Item card */}
          <div className={`rounded-2xl border-2 p-5 flex flex-col items-center gap-2 transition-all duration-300
            ${flash === 'correct' ? 'border-green-400 bg-green-900/30'
            : flash === 'wrong'   ? 'border-red-400 bg-red-900/30'
            : 'border-gray-600 bg-gray-900/60'}`}>
            <div className="text-6xl leading-none select-none">{currentItem.emoji}</div>
            <div className="text-white font-bold text-lg text-center font-mono">{currentItem.name}</div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold font-mono ${
              currentItem.type === 'weighted' ? 'bg-blue-900 text-blue-300' : 'bg-purple-900 text-purple-300'}`}>
              {currentItem.type === 'weighted' ? '⚖️ BY WEIGHT' : '🔢 BY QUANTITY'}
            </span>
            <div className="text-gray-500 text-[10px] font-mono">{currentItem.category}</div>
          </div>

          {/* Instruction */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-3">
  <div className="text-yellow-400 text-[10px] font-mono uppercase tracking-widest mb-1">Instruction</div>
  <div className="text-white text-sm font-mono leading-relaxed">{instruction()}</div>
  {phase === 'qty' && (
    <div className="mt-1.5 text-yellow-300 text-sm font-mono font-bold">Quantity: {quantity}</div>
  )}
  {showHint && phase === 'plu' && (
    <div className="mt-2 px-2 py-1.5 bg-yellow-900/40 border border-yellow-600/50 rounded-lg">
      <span className="text-yellow-400 text-[10px] font-mono uppercase tracking-widest">💡 Hint — PLU: </span>
      <span className="text-white font-bold font-mono text-sm">{currentItem.plu}</span>
    </div>
  )}
</div>

          {/* Stats row — Score · Streak · Mistakes */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label:'Score',    val: score,    color:'text-yellow-400' },
              { label:'Streak',   val: streak,   color:'text-green-400'  },
              { label:'Mistakes', val: mistakes, color:'text-red-400'    },
            ].map(s => (
              <div key={s.label} className="bg-gray-900 border border-gray-700 rounded-xl p-2 text-center">
                <div className={`text-xl font-bold font-mono ${s.color}`}>{s.val}</div>
                <div className="text-gray-600 text-[9px] font-mono uppercase">{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── IPMS card ── */}
          <IpmsBadge ipms={ipms} />

          {/* Scanned log */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 overflow-y-auto flex-1" style={{ maxHeight:160 }}>
            <div className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-2">
              Scanned Log · {completedRef.current} items
            </div>
            {scanned.length === 0
              ? <div className="text-gray-700 text-xs font-mono italic">Nothing yet…</div>
              : [...scanned].reverse().map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs font-mono py-0.5 border-b border-gray-800 last:border-0">
                  <span className="text-gray-300">{item.emoji} {item.name}</span>
                  <span className="text-green-400 ml-2 shrink-0">
                    {item.weight ? `${item.weight} lb` : `×${item.quantity}`}
                  </span>
                </div>
              ))
            }
          </div>
        </div>

        {/* RIGHT column */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">

          {/* POS mini screen */}
          <div className="flex justify-end">
            <div className="rounded-xl border-4 border-gray-600 overflow-hidden shadow-2xl" style={{ width:300, background:'#111' }}>
              <div className="bg-gray-800 px-3 py-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_#00ff0088]" />
                  <span className="text-gray-400 text-[10px] font-mono tracking-widest">NCR POS · LANE 04</span>
                </div>
                {/* IPMS live pill on POS screen header */}
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  ipms >= 30 ? 'bg-green-900 text-green-300' : 'bg-yellow-900/60 text-yellow-400'
                }`}>
                  {ipms.toFixed(1)} IPMS
                </span>
              </div>
              <div className="p-4 transition-colors duration-150" style={{ background:screenBg, minHeight:110 }}>
                <div className="text-xs font-mono mb-1 truncate" style={{ color:screenText, opacity:0.65 }}>
                  {currentItem.name}
                </div>
                <div className="font-mono font-bold tracking-widest text-3xl min-h-[42px] flex items-center"
                     style={{ color:screenText, fontFamily:'"Courier New",monospace' }}>
                  {screen || (phase === 'weighing' ? 'SCALE...' : <span className="opacity-30">_</span>)}
                </div>
                <div className="mt-3 text-[10px] font-mono uppercase tracking-widest" style={{ color:screenText, opacity:0.45 }}>
                  {phase === 'plu'      && 'ENTER PLU'}
                  {phase === 'weighing' && 'WEIGHING'}
                  {phase === 'qty'      && 'ENTER QTY'}
                  {phase === 'done'     && 'ACCEPTED'}
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard */}
          <div className="flex-1 overflow-auto flex items-start">
            <CashierKeyboard onKeyPress={handleKey} />
          </div>
        </div>
      </div>
    </div>
  );
}
