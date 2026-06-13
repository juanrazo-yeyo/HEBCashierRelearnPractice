// src/components/HomeScreen.jsx

const PRODUCE_ITEMS = [
  // Popular Produce
  { name: 'Bananas', plu: '4011', emoji: '🍌', category: 'Popular Produce' },
  { name: 'Avocados (Small)', plu: '4046', emoji: '🥑', category: 'Popular Produce' },
  { name: 'Avocados (Large)', plu: '4225', emoji: '🥑', category: 'Popular Produce' },
  { name: 'Avocados (Jumbo)', plu: '4770', emoji: '🥑', category: 'Popular Produce' },
  { name: 'Asparagus', plu: '4521', emoji: '🌿', category: 'Popular Produce' },
  { name: 'Broccoli Crowns', plu: '4548', emoji: '🥦', category: 'Popular Produce' },
  { name: 'Cilantro', plu: '4889', emoji: '🌿', category: 'Popular Produce' },
  { name: 'Celery', plu: '4070', emoji: '🥬', category: 'Popular Produce' },
  { name: 'Corn (Yellow)', plu: '4078', emoji: '🌽', category: 'Popular Produce' },
  { name: 'Cucumbers', plu: '4062', emoji: '🥒', category: 'Popular Produce' },
  { name: 'Garlic', plu: '4608', emoji: '🧄', category: 'Popular Produce' },
  { name: 'Ginger Root', plu: '4612', emoji: '🫚', category: 'Popular Produce' },
  { name: 'Green Beans', plu: '4066', emoji: '🫘', category: 'Popular Produce' },
  { name: 'Carrots (Bulk)', plu: '4562', emoji: '🥕', category: 'Popular Produce' },
  // Peppers & Tomatoes
  { name: 'Jalapeño Peppers', plu: '4693', emoji: '🌶️', category: 'Peppers & Tomatoes' },
  { name: 'Serrano Peppers', plu: '4709', emoji: '🌶️', category: 'Peppers & Tomatoes' },
  { name: 'Poblano Peppers', plu: '4705', emoji: '🫑', category: 'Peppers & Tomatoes' },
  { name: 'Habanero Peppers', plu: '3125', emoji: '🌶️', category: 'Peppers & Tomatoes' },
  { name: 'Green Bell Peppers', plu: '4065', emoji: '🫑', category: 'Peppers & Tomatoes' },
  { name: 'Red Bell Peppers', plu: '4088', emoji: '🫑', category: 'Peppers & Tomatoes' },
  { name: 'Roma Tomatoes', plu: '4087', emoji: '🍅', category: 'Peppers & Tomatoes' },
  { name: 'Tomatoes on the Vine', plu: '4664', emoji: '🍅', category: 'Peppers & Tomatoes' },
  // Apples
  { name: 'Honeycrisp', plu: '3283', emoji: '🍎', category: 'Apples' },
  { name: 'Fuji', plu: '4131', emoji: '🍎', category: 'Apples' },
  { name: 'Gala', plu: '4135', emoji: '🍎', category: 'Apples' },
  { name: 'Granny Smith', plu: '4017', emoji: '🍏', category: 'Apples' },
  { name: 'Red Delicious', plu: '4016', emoji: '🍎', category: 'Apples' },
  // Onions & Potatoes
  { name: 'Yellow Onions', plu: '4093', emoji: '🧅', category: 'Onions & Potatoes' },
  { name: 'Red Onions', plu: '4082', emoji: '🧅', category: 'Onions & Potatoes' },
  { name: 'White Onions', plu: '4663', emoji: '🧅', category: 'Onions & Potatoes' },
  { name: 'Green Onions', plu: '4068', emoji: '🌿', category: 'Onions & Potatoes' },
  { name: 'Russet Potatoes', plu: '4072', emoji: '🥔', category: 'Onions & Potatoes' },
  { name: 'Red Potatoes', plu: '4073', emoji: '🥔', category: 'Onions & Potatoes' },
  { name: 'Sweet Potatoes', plu: '4816', emoji: '🍠', category: 'Onions & Potatoes' },
  // Melons, Citrus & Berries
  { name: 'Lemons', plu: '4033', emoji: '🍋', category: 'Melons, Citrus & Berries' },
  { name: 'Limes', plu: '4048', emoji: '🍋‍🟩', category: 'Melons, Citrus & Berries' },
  { name: 'Cantaloupe', plu: '4050', emoji: '🍈', category: 'Melons, Citrus & Berries' },
  { name: 'Honeydew', plu: '4034', emoji: '🍈', category: 'Melons, Citrus & Berries' },
  { name: 'Seedless Watermelon', plu: '4032', emoji: '🍉', category: 'Melons, Citrus & Berries' },
  { name: 'Kiwi', plu: '4030', emoji: '🥝', category: 'Melons, Citrus & Berries' },
  // Bakery & Prepared Foods
  { name: 'Bolillos (Bulk)', plu: '5308', emoji: '🍞', category: 'Bakery & Prepared Foods' },
  { name: 'Individual Doughnuts', plu: '5303', emoji: '🍩', category: 'Bakery & Prepared Foods' },
  { name: 'Pan Dulce', plu: '5303', emoji: '🧁', category: 'Bakery & Prepared Foods' },
  { name: 'Muffins & Pastries', plu: '5379', emoji: '🧁', category: 'Bakery & Prepared Foods' },
];

const CATEGORIES = [...new Set(PRODUCE_ITEMS.map(p => p.category))];

const CATEGORY_COLORS = {
  'Popular Produce':        { bg: 'bg-green-900/40',  border: 'border-green-700/50',  text: 'text-green-400',  badge: 'bg-green-800 text-green-200' },
  'Peppers & Tomatoes':     { bg: 'bg-red-900/30',    border: 'border-red-700/50',    text: 'text-red-400',    badge: 'bg-red-800 text-red-200' },
  'Apples':                 { bg: 'bg-rose-900/30',   border: 'border-rose-700/50',   text: 'text-rose-400',   badge: 'bg-rose-800 text-rose-200' },
  'Onions & Potatoes':      { bg: 'bg-amber-900/30',  border: 'border-amber-700/50',  text: 'text-amber-400',  badge: 'bg-amber-800 text-amber-200' },
  'Melons, Citrus & Berries':{ bg: 'bg-yellow-900/30',border: 'border-yellow-700/50', text: 'text-yellow-400', badge: 'bg-yellow-800 text-yellow-200' },
  'Bakery & Prepared Foods':{ bg: 'bg-orange-900/30', border: 'border-orange-700/50', text: 'text-orange-400', badge: 'bg-orange-800 text-orange-200' },
};

// Search bar + filter state lives inside this component
import { useState } from 'react';

export default function HomeScreen({ onStart }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = PRODUCE_ITEMS.filter(item => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.plu.includes(search);
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-10"
      style={{ background: 'linear-gradient(160deg, #0f0f1a 0%, #1a0808 60%, #0f0f1a 100%)' }}
    >
      {/* ── Logo ── */}
      <div className="text-center mb-8">
        <div
          className="text-5xl font-black text-red-600 tracking-tight mb-1"
          style={{ fontFamily: 'Orbitron, monospace', textShadow: '0 0 40px rgba(220,38,38,0.5)' }}
        >
          ★ H-E-B ★
        </div>
        <div className="text-white text-xl font-bold tracking-widest font-mono mt-2">
          CASHIER PRACTICE SIMULATOR
        </div>
        <div className="text-gray-500 text-sm font-mono mt-1">
          Personal Training Tool · Unofficial
        </div>
      </div>

      {/* ── Score & Timer feature card (single) ── */}
      <div className="mb-8 bg-gray-900 border border-gray-700 rounded-xl px-5 py-3 flex items-center gap-3">
        <span className="text-2xl">🏆</span>
        <div>
          <div className="text-white text-sm font-bold font-mono">Score & Timer</div>
          <div className="text-gray-500 text-xs font-mono">Track your improvement</div>
        </div>
      </div>

      {/* ── Start button ── */}
      <div className="w-full max-w-sm mb-10">
        <button
          onClick={() => onStart(true)}
          className="w-full bg-red-700 hover:bg-red-600 active:bg-red-800 text-white font-bold py-4 rounded-2xl font-mono text-lg tracking-widest transition-all shadow-lg hover:shadow-red-900/50 uppercase"
        >
          🥦 Produce Practice
          <div className="text-xs text-red-300 font-normal normal-case tracking-normal mt-0.5">
            Hints &amp; key highlights enabled
          </div>
        </button>
      </div>

      {/* ── PLU Reference section ── */}
      <div className="w-full max-w-4xl">
        <div className="text-gray-400 text-xs font-mono uppercase tracking-widest text-center mb-4">
          Popular Produce PLU Reference
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search by name or PLU code..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-9 pr-4 py-2.5 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
          />
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-5 justify-center">
          {['All', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-mono px-3 py-1 rounded-full border transition-all ${
                activeCategory === cat
                  ? 'bg-red-700 border-red-600 text-white'
                  : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of PLU cards */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-600 font-mono py-10">No items match your search.</div>
        ) : (
          <div className="space-y-6">
            {(activeCategory === 'All' ? CATEGORIES : [activeCategory]).map(cat => {
              const items = filtered.filter(i => i.category === cat);
              if (items.length === 0) return null;
              const colors = CATEGORY_COLORS[cat];
              return (
                <div key={cat}>
                  <div className={`text-xs font-bold font-mono uppercase tracking-widest mb-2 ${colors.text}`}>
                    {cat}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {items.map(item => (
                      <div
                        key={item.plu + item.name}
                        className={`${colors.bg} border ${colors.border} rounded-xl p-3 flex flex-col items-center gap-1.5 hover:brightness-125 transition-all cursor-default`}
                      >
                        {/* Emoji as placeholder image */}
                        <div className="text-3xl leading-none select-none">{item.emoji}</div>
                        <div className="text-white text-xs font-bold font-mono text-center leading-tight">
                          {item.name}
                        </div>
                        <div className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${colors.badge}`}>
                          PLU: {item.plu}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="text-gray-700 text-xs font-mono mt-10 text-center max-w-md">
        Not affiliated with or endorsed by H-E-B Grocery Company, LP. Personal practice tool only.
      </p>
    </div>
  );
}
