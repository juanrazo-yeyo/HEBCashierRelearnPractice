// src/components/CartDisplay.jsx
// Shows the customer's scanned items, subtotal, tax, and total.
// Looks like a printed receipt / POS display.

export default function CartDisplay({ scannedItems, subtotal, tax, total, scenario }) {
  const displayItems = scannedItems.filter(item => item.price !== undefined);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-red-700 text-white text-center py-2 px-3 font-bold tracking-widest text-sm uppercase rounded-t-lg">
        H-E-B · Customer Display
      </div>

      {/* Items list */}
      <div className="flex-1 bg-white overflow-y-auto" style={{ minHeight: 0 }}>
        {/* Store header */}
        <div className="text-center pt-3 pb-1 border-b border-gray-200">
          <div className="text-red-600 font-bold text-lg" style={{ fontFamily: 'Orbitron, monospace' }}>
            ★ H-E-B ★
          </div>
          <div className="text-gray-500 text-xs">Thank You For Shopping With Us</div>
        </div>

        {/* Scenario title */}
        {scenario && (
          <div className="mx-2 my-1 px-2 py-1 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800 text-center font-bold">
            📋 {scenario.title}
          </div>
        )}

        {/* Item rows */}
        <div className="px-2 py-1 space-y-0.5" style={{ fontFamily: 'Courier New, monospace' }}>
          {displayItems.length === 0 ? (
            <div className="text-center text-gray-400 text-xs py-4 italic">
              No items scanned yet...
            </div>
          ) : (
            displayItems.map((item, i) => (
              <div
                key={item.id || i}
                className={`flex justify-between items-start text-xs py-0.5 border-b border-gray-100 ${
                  item.price < 0 ? 'text-green-700 font-bold' : 'text-gray-800'
                }`}
                style={{ animation: 'fadeIn 0.3s ease' }}
              >
                <span className="flex-1 pr-2 leading-tight">{item.name}</span>
                <span className="font-mono whitespace-nowrap">
                  {item.price < 0
                    ? `-$${Math.abs(item.price).toFixed(2)}`
                    : `$${item.price.toFixed(2)}`}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Totals */}
      <div
        className="bg-gray-50 border-t-2 border-gray-300 px-3 py-2 text-sm rounded-b-lg"
        style={{ fontFamily: 'Courier New, monospace' }}
      >
        <div className="flex justify-between text-gray-600 text-xs">
          <span>SUBTOTAL</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 text-xs">
          <span>TAX (8.25%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-900 font-bold text-base border-t border-gray-400 mt-1 pt-1">
          <span>TOTAL</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
