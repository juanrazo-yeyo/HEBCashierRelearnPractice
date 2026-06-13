// src/data/scenarios.js
// Each scenario defines a step-by-step task for the cashier to complete.
// "steps" is an array of { instruction, expectedKey, hint, autoScan }
// expectedKey must match a key's "id" in the keyboard layout.

export const SCENARIOS = [
  {
    id: 1,
    title: "Scan Regular Items",
    description: "A customer has 3 grocery items. Scan each item, then total the order.",
    difficulty: "beginner",
    cart: [
      { name: "H-E-B Whole Milk 1gal", price: 3.49, barcode: "041268200764" },
      { name: "Great Value White Bread", price: 2.78, barcode: "078742369396" },
      { name: "Lay's Classic Chips", price: 4.29, barcode: "028400090100" },
    ],
    steps: [
      {
        instruction: "The customer placed items on the belt. Items are scanned automatically — press ENTER to confirm each scan.",
        expectedKey: "ENTER",
        hint: "Press the ENTER key to log the first item.",
        autoScan: { name: "H-E-B Whole Milk 1gal", price: 3.49 },
      },
      {
        instruction: "Item 1 scanned. Press ENTER to confirm the next item.",
        expectedKey: "ENTER",
        hint: "Press ENTER again for the second item.",
        autoScan: { name: "Great Value White Bread", price: 2.78 },
      },
      {
        instruction: "Item 2 scanned. Press ENTER to confirm the last item.",
        expectedKey: "ENTER",
        hint: "Press ENTER one more time for the third item.",
        autoScan: { name: "Lay's Classic Chips", price: 4.29 },
      },
      {
        instruction: "All items scanned! Press TOTAL to show the customer their total.",
        expectedKey: "TOTAL",
        hint: "Find the big yellow TOTAL button.",
      },
    ],
  },

  {
    id: 2,
    title: "Ring Up Produce",
    description: "The customer has bananas and apples — bulk produce that must be weighed and keyed in manually.",
    difficulty: "beginner",
    cart: [
      { name: "Bananas (per lb)", price: 0.59, barcode: "PLU-4011" },
      { name: "Gala Apples (per lb)", price: 1.49, barcode: "PLU-3283" },
    ],
    steps: [
      {
        instruction: "The customer has bulk produce. Press PRODUCE to enter produce lookup mode.",
        expectedKey: "PRODUCE",
        hint: "The green PRODUCE button activates PLU lookup mode.",
        autoScan: null,
      },
      {
        instruction: "Good! Now press SCALE to weigh the bananas on the scale.",
        expectedKey: "SCALE",
        hint: "Press SCALE to use the built-in scale.",
        autoScan: { name: "Bananas (per lb) × 1.2 lb", price: 0.71 },
      },
      {
        instruction: "Bananas weighed! Press ENTER to confirm.",
        expectedKey: "ENTER",
        hint: "Confirm the produce item with ENTER.",
        autoScan: null,
      },
      {
        instruction: "Now press PRODUCE again for the apples.",
        expectedKey: "PRODUCE",
        hint: "Press PRODUCE for the next produce item.",
        autoScan: null,
      },
      {
        instruction: "Press SCALE to weigh the apples.",
        expectedKey: "SCALE",
        hint: "Use the SCALE button to weigh the apples.",
        autoScan: { name: "Gala Apples (per lb) × 0.8 lb", price: 1.19 },
      },
      {
        instruction: "Press ENTER to confirm the apples.",
        expectedKey: "ENTER",
        hint: "Confirm with ENTER.",
        autoScan: null,
      },
      {
        instruction: "All produce rung up! Press TOTAL.",
        expectedKey: "TOTAL",
        hint: "Press the yellow TOTAL button.",
      },
    ],
  },

  {
    id: 3,
    title: "Price Inquiry",
    description: "A customer wants to check the price of an item before buying it.",
    difficulty: "beginner",
    cart: [
      { name: "Mystery Item", price: "?", barcode: "012345678905" },
    ],
    steps: [
      {
        instruction: "The customer asked: 'How much is this?' Press PRICE INQ to look up the price.",
        expectedKey: "PRICE INQ",
        hint: "Press the red PRICE INQ button.",
        autoScan: null,
      },
      {
        instruction: "Price lookup active. Press ENTER to scan the item and display its price.",
        expectedKey: "ENTER",
        hint: "Press ENTER to complete the price check.",
        autoScan: { name: "Mystery Item (Price Check)", price: 3.99 },
      },
      {
        instruction: "Price displayed: $3.99. Customer wants it! Press ENTER to add it to the order.",
        expectedKey: "ENTER",
        hint: "Press ENTER to add to the transaction.",
        autoScan: null,
      },
      {
        instruction: "Item added! Press TOTAL to finish.",
        expectedKey: "TOTAL",
        hint: "Press TOTAL to close the transaction.",
      },
    ],
  },

  {
    id: 4,
    title: "Void an Item",
    description: "You accidentally scanned an item twice. Void the duplicate.",
    difficulty: "beginner",
    cart: [
      { name: "Coca-Cola 12pk", price: 6.99, barcode: "049000042566" },
      { name: "Coca-Cola 12pk (DUPLICATE)", price: 6.99, barcode: "049000042566", isDuplicate: true },
      { name: "Doritos Nacho 9oz", price: 3.99, barcode: "028400090620" },
    ],
    steps: [
      {
        instruction: "Oh no! You scanned the Coca-Cola twice by accident. Press SCAN VOID to void the last item.",
        expectedKey: "SCAN VOID",
        hint: "The red SCAN VOID button removes the last scanned item.",
        autoScan: null,
      },
      {
        instruction: "Duplicate voided! The register shows the void. Press ENTER to confirm.",
        expectedKey: "ENTER",
        hint: "Confirm the void with ENTER.",
        autoScan: null,
      },
      {
        instruction: "Good! Now ring up the Doritos. Press ENTER to scan.",
        expectedKey: "ENTER",
        hint: "Press ENTER to scan the Doritos.",
        autoScan: { name: "Doritos Nacho 9oz", price: 3.99 },
      },
      {
        instruction: "All correct now! Press TOTAL.",
        expectedKey: "TOTAL",
        hint: "Press TOTAL to complete.",
      },
    ],
  },

  {
    id: 5,
    title: "Apply a Coupon",
    description: "A customer has a paper coupon for $1.50 off their groceries.",
    difficulty: "intermediate",
    cart: [
      { name: "Tide Pods 42ct", price: 12.99, barcode: "037000754893" },
      { name: "Bounty Paper Towels 8pk", price: 8.49, barcode: "037000864349" },
    ],
    steps: [
      {
        instruction: "Scan the items first. Press ENTER to scan Tide Pods.",
        expectedKey: "ENTER",
        hint: "Press ENTER to scan the first item.",
        autoScan: { name: "Tide Pods 42ct", price: 12.99 },
      },
      {
        instruction: "Press ENTER to scan Bounty Paper Towels.",
        expectedKey: "ENTER",
        hint: "Press ENTER to scan the second item.",
        autoScan: { name: "Bounty Paper Towels 8pk", price: 8.49 },
      },
      {
        instruction: "Both items scanned! The customer hands you a coupon. Press COUPON to apply it.",
        expectedKey: "COUPON",
        hint: "Press the red COUPON button to apply the discount.",
        autoScan: { name: "COUPON - $1.50 OFF", price: -1.50 },
      },
      {
        instruction: "Coupon applied! $1.50 discount shown. Press ENTER to confirm.",
        expectedKey: "ENTER",
        hint: "Confirm the coupon with ENTER.",
        autoScan: null,
      },
      {
        instruction: "Great! Press TOTAL to show the final amount.",
        expectedKey: "TOTAL",
        hint: "Press TOTAL to close out.",
      },
    ],
  },

  {
    id: 6,
    title: "Process Cash Payment",
    description: "The customer is paying with cash. Ring up items and handle the cash transaction.",
    difficulty: "beginner",
    cart: [
      { name: "H-E-B Tortillas 30ct", price: 3.99, barcode: "041268150763" },
      { name: "Pace Picante Sauce 16oz", price: 2.99, barcode: "041565016045" },
      { name: "H-E-B Ground Beef 1lb", price: 5.49, barcode: "041268412741" },
    ],
    steps: [
      {
        instruction: "Scan all items. Press ENTER for each. First: H-E-B Tortillas.",
        expectedKey: "ENTER",
        hint: "Press ENTER to scan the first item.",
        autoScan: { name: "H-E-B Tortillas 30ct", price: 3.99 },
      },
      {
        instruction: "Press ENTER for Pace Picante Sauce.",
        expectedKey: "ENTER",
        hint: "Press ENTER for the second item.",
        autoScan: { name: "Pace Picante Sauce 16oz", price: 2.99 },
      },
      {
        instruction: "Press ENTER for H-E-B Ground Beef.",
        expectedKey: "ENTER",
        hint: "Press ENTER for the third item.",
        autoScan: { name: "H-E-B Ground Beef 1lb", price: 5.49 },
      },
      {
        instruction: "All scanned! Press TOTAL to show the total to the customer.",
        expectedKey: "TOTAL",
        hint: "Press the yellow TOTAL button.",
      },
      {
        instruction: "Total: $12.47 + tax. Customer hands you $20. Press CASH to process.",
        expectedKey: "CASH",
        hint: "Find the CASH button on the right side of the keyboard.",
        autoScan: null,
      },
      {
        instruction: "Enter the amount tendered: press 2, 0, 0, 0 for $20.00.",
        expectedKey: "2",
        hint: "Press the number 2 on the numpad first.",
        autoScan: null,
      },
      {
        instruction: "Now press 0.",
        expectedKey: "0",
        hint: "Press the 0 key.",
        autoScan: null,
      },
      {
        instruction: "Press 0 again.",
        expectedKey: "0",
        hint: "Press 0 again.",
        autoScan: null,
      },
      {
        instruction: "Press 0 one more time.",
        expectedKey: "0",
        hint: "Last 0.",
        autoScan: null,
      },
      {
        instruction: "Now press ENTER to confirm $20.00 tendered.",
        expectedKey: "ENTER",
        hint: "Press ENTER to finalize the cash amount.",
        autoScan: null,
      },
    ],
  },

  {
    id: 7,
    title: "Process Card / Electronic Payment",
    description: "The customer wants to pay with a credit or debit card.",
    difficulty: "beginner",
    cart: [
      { name: "Yoplait Yogurt 6oz", price: 1.19, barcode: "070470496903" },
      { name: "Nature Valley Bars 6ct", price: 3.79, barcode: "016000494305" },
      { name: "Silk Oat Milk 64oz", price: 4.99, barcode: "025293006027" },
    ],
    steps: [
      {
        instruction: "Scan the yogurt. Press ENTER.",
        expectedKey: "ENTER",
        hint: "Press ENTER.",
        autoScan: { name: "Yoplait Yogurt 6oz", price: 1.19 },
      },
      {
        instruction: "Scan Nature Valley Bars. Press ENTER.",
        expectedKey: "ENTER",
        hint: "Press ENTER.",
        autoScan: { name: "Nature Valley Bars 6ct", price: 3.79 },
      },
      {
        instruction: "Scan Silk Oat Milk. Press ENTER.",
        expectedKey: "ENTER",
        hint: "Press ENTER.",
        autoScan: { name: "Silk Oat Milk 64oz", price: 4.99 },
      },
      {
        instruction: "All scanned! Press TOTAL.",
        expectedKey: "TOTAL",
        hint: "Press TOTAL.",
      },
      {
        instruction: "Customer says: 'I'll pay by card.' Press ELECTRONIC PAYMENT to switch to card mode.",
        expectedKey: "ELECTRONIC PAYMENT",
        hint: "Look for the ELECTRONIC PAYMENT button.",
        autoScan: null,
      },
      {
        instruction: "Card terminal activated. Tell the customer to tap/swipe their card. Press ENTER to confirm payment received.",
        expectedKey: "ENTER",
        hint: "Press ENTER after customer uses card terminal.",
        autoScan: null,
      },
    ],
  },

  {
    id: 8,
    title: "Process EBT / Food Stamps",
    description: "The customer will be paying with an EBT card.",
    difficulty: "intermediate",
    cart: [
      { name: "H-E-B Brown Eggs 12ct", price: 2.99, barcode: "041268151852" },
      { name: "Mission Flour Tortillas", price: 3.49, barcode: "072368110218" },
      { name: "Chicken Breast 2lb", price: 7.99, barcode: "041268330781" },
    ],
    steps: [
      {
        instruction: "Scan the eggs. Press ENTER.",
        expectedKey: "ENTER",
        hint: "Press ENTER.",
        autoScan: { name: "H-E-B Brown Eggs 12ct", price: 2.99 },
      },
      {
        instruction: "Scan Mission Tortillas. Press ENTER.",
        expectedKey: "ENTER",
        hint: "Press ENTER.",
        autoScan: { name: "Mission Flour Tortillas", price: 3.49 },
      },
      {
        instruction: "Scan Chicken Breast. Press ENTER.",
        expectedKey: "ENTER",
        hint: "Press ENTER.",
        autoScan: { name: "Chicken Breast 2lb", price: 7.99 },
      },
      {
        instruction: "Customer says: 'I'm using my EBT card.' Press FOOD STAMPS to activate EBT mode.",
        expectedKey: "FOOD STAMPS",
        hint: "Press the FOOD STAMPS button.",
        autoScan: null,
      },
      {
        instruction: "EBT mode active. Have customer insert their EBT card. Press WIC EBT to process.",
        expectedKey: "WIC EBT",
        hint: "Press WIC EBT to run the EBT card.",
        autoScan: null,
      },
      {
        instruction: "EBT approved! Press ENTER to finalize.",
        expectedKey: "ENTER",
        hint: "Confirm the EBT approval with ENTER.",
        autoScan: null,
      },
    ],
  },

  {
    id: 9,
    title: "Clear a Mistake",
    description: "You made an entry error on the register. Clear it before it causes problems.",
    difficulty: "beginner",
    cart: [
      { name: "Red Baron Pizza", price: 5.99, barcode: "013410889009" },
      { name: "Pepsi 2L", price: 2.29, barcode: "012000001086" },
    ],
    steps: [
      {
        instruction: "Scan Red Baron Pizza. Press ENTER.",
        expectedKey: "ENTER",
        hint: "Press ENTER.",
        autoScan: { name: "Red Baron Pizza", price: 5.99 },
      },
      {
        instruction: "You accidentally start entering a wrong price manually. Press CLEAR to cancel the bad entry.",
        expectedKey: "CLEAR",
        hint: "Press the CLEAR button to erase the mistake.",
        autoScan: null,
      },
      {
        instruction: "Entry cleared! Now scan the Pepsi correctly. Press ENTER.",
        expectedKey: "ENTER",
        hint: "Press ENTER to properly scan the Pepsi.",
        autoScan: { name: "Pepsi 2L", price: 2.29 },
      },
      {
        instruction: "Good job recovering! Press TOTAL to finish.",
        expectedKey: "TOTAL",
        hint: "Press TOTAL.",
      },
    ],
  },

  {
    id: 10,
    title: "Complete the Full Order",
    description: "A full transaction from start to finish — scan 5 items, apply a promo, then total and take cash payment.",
    difficulty: "intermediate",
    cart: [
      { name: "H-E-B Butter Stick 4ct", price: 4.49 },
      { name: "Campbell's Tomato Soup", price: 1.29 },
      { name: "Quaker Oats 42oz", price: 3.99 },
      { name: "Minute Maid OJ 52oz", price: 3.79 },
      { name: "H-E-B Flour 5lb", price: 2.99 },
    ],
    steps: [
      {
        instruction: "Full order! Scan H-E-B Butter. Press ENTER.",
        expectedKey: "ENTER",
        hint: "Press ENTER.",
        autoScan: { name: "H-E-B Butter Stick 4ct", price: 4.49 },
      },
      {
        instruction: "Scan Campbell's Tomato Soup. Press ENTER.",
        expectedKey: "ENTER",
        hint: "Press ENTER.",
        autoScan: { name: "Campbell's Tomato Soup", price: 1.29 },
      },
      {
        instruction: "Scan Quaker Oats. Press ENTER.",
        expectedKey: "ENTER",
        hint: "Press ENTER.",
        autoScan: { name: "Quaker Oats 42oz", price: 3.99 },
      },
      {
        instruction: "Scan Minute Maid OJ. Press ENTER.",
        expectedKey: "ENTER",
        hint: "Press ENTER.",
        autoScan: { name: "Minute Maid OJ 52oz", price: 3.79 },
      },
      {
        instruction: "Scan H-E-B Flour. Press ENTER.",
        expectedKey: "ENTER",
        hint: "Press ENTER.",
        autoScan: { name: "H-E-B Flour 5lb", price: 2.99 },
      },
      {
        instruction: "All scanned! There's a store promo active. Press PROMO to apply it.",
        expectedKey: "PROMO",
        hint: "Press the red PROMO button.",
        autoScan: { name: "PROMO - Save $0.50", price: -0.50 },
      },
      {
        instruction: "Promo applied! Press TOTAL to show the customer their total.",
        expectedKey: "TOTAL",
        hint: "Press TOTAL.",
      },
      {
        instruction: "Customer pays with $25 cash. Press CASH.",
        expectedKey: "CASH",
        hint: "Press the CASH button.",
        autoScan: null,
      },
      {
        instruction: "Enter $25.00: press 2, 5, 0, 0.",
        expectedKey: "2",
        hint: "Press 2 first.",
        autoScan: null,
      },
      {
        instruction: "Press 5.",
        expectedKey: "5",
        hint: "Press 5.",
        autoScan: null,
      },
      {
        instruction: "Press 0.",
        expectedKey: "0",
        hint: "Press 0.",
        autoScan: null,
      },
      {
        instruction: "Press 0 again.",
        expectedKey: "0",
        hint: "Press 0 again.",
        autoScan: null,
      },
      {
        instruction: "Press ENTER to finalize the payment.",
        expectedKey: "ENTER",
        hint: "Press ENTER to close it out!",
        autoScan: null,
      },
    ],
  },
];

// Tax rate used across all transactions
export const TAX_RATE = 0.0825;
