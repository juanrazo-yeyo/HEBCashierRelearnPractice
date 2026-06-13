// src/components/CashierKeyboard.jsx
// Pixel-accurate recreation of the H-E-B NCR POS keyboard from the reference image.
//
// COLOR MAP (from image):
//   Blue        → F1-F12, PAGE UP, PAGE DOWN, HELP, arrows, DEPT
//   Yellow/Gold → Q-P, A-L, Z-M, >, ENTER, TOTAL
//   Cream/White → *, comma, period, /, SPACE, CLEAR, -, 0-9, X, blank dept keys,
//                 MEDIA EXCHANGE, OTHER MEDIA, FOOD STAMPS, WIC REPRINT, CHECK, CASH
//   Red/Coral   → ORDER VIEW, PRICE INQ, SUSP RCALL, MANAGER MENU, CASHIER MENU,
//                 SCAN VOID, PRICE CHANGE, LINE VOID, COUPON, PROMO, RTRN
//   Green       → PRODUCE, SCALE, COIN STAR, GIFT RCPT, DIGITAL CREDIT
//   Teal/Blue   → CUST, ITMZER EXCPT, WIC EBT
//   Gray        → NO CPN
//   Yellow wide → ENTER, TOTAL (same yellow as letters)

// src/components/CashierKeyboard.jsx
// More realistic H-E-B/NCR-style POS keyboard.
// Replace your current CashierKeyboard.jsx with this file.


import { useState } from "react";

const KEY = {
  blue: {
    bg: "#cfe8ff",
    edge: "#1875cf",
    side: "#005fc0",
    text: "#101820",
  },
  yellow: {
    bg: "#ffe36b",
    edge: "#e0a500",
    side: "#c48d00",
    text: "#111111",
  },
  cream: {
    bg: "#fffaf0",
    edge: "#cbbf9d",
    side: "#9f9272",
    text: "#202020",
  },
  red: {
    bg: "#ff756f",
    edge: "#cf332f",
    side: "#9f2727",
    text: "#111111",
  },
  green: {
    bg: "#a9dd74",
    edge: "#62a83d",
    side: "#3c7a24",
    text: "#111111",
  },
  teal: {
    bg: "#9ed9ef",
    edge: "#3186b8",
    side: "#1e6590",
    text: "#111111",
  },
  gray: {
    bg: "#d3d4cf",
    edge: "#969891",
    side: "#686a64",
    text: "#111111",
  },
  blank: {
    bg: "#fffaf0",
    edge: "#cbbf9d",
    side: "#9f9272",
    text: "transparent",
  },
};

function Button({ id, label, color = "cream", w = 72, h = 64, fs = 18, onPress, pressed }) {
  const c = KEY[color] ?? KEY.cream;
  const down = pressed === id;

  return (
    <button
      type="button"
      title={id}
      onClick={() => onPress(id)}
      style={{
        width: w,
        height: h,
        flex: "0 0 auto",
        borderRadius: 10,
        border: `2px solid ${c.edge}`,
        color: c.text,
        fontSize: fs,
        fontWeight: 500,
        letterSpacing: 0.5,
        lineHeight: 1.05,
        whiteSpace: "pre-line",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        transform: down ? "translateY(4px)" : "translateY(0)",
        cursor: "pointer",
        userSelect: "none",
        background: `
          radial-gradient(circle at 24% 20%, rgba(255,255,255,.75), transparent 28%),
          radial-gradient(circle at 78% 78%, rgba(0,0,0,.08), transparent 32%),
          repeating-radial-gradient(circle at 40% 40%, rgba(255,255,255,.10) 0 2px, transparent 2px 7px),
          ${c.bg}
        `,
        boxShadow: down
          ? `inset 0 3px 8px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.55)`
          : `0 5px 0 ${c.side}, 0 7px 9px rgba(0,0,0,.20), inset 0 2px 0 rgba(255,255,255,.55), inset 0 -3px 7px rgba(0,0,0,.10)`,
        transition: "transform 80ms, box-shadow 80ms, filter 80ms",
      }}
    >
      {label ?? id}
    </button>
  );
}

const GAP = 8;
const S = 76;
const H = 64;

export default function CashierKeyboard({ onKeyPress }) {
  const [pressed, setPressed] = useState(null);

  function press(id) {
    setPressed(id);
    setTimeout(() => setPressed(null), 120);
    onKeyPress?.(id);
  }

  const K = (props) => <Button {...props} onPress={press} pressed={pressed} />;

  return (
    <div
      style={{
        width: "fit-content",
        maxWidth: "none",
        padding: "18px 26px 24px",
        borderRadius: 32,
        border: "2px solid #cbbf90",
        background: `
          radial-gradient(circle at 8% 0%, rgba(255,255,255,.8), transparent 20%),
          radial-gradient(circle at 85% 95%, rgba(210,180,110,.30), transparent 28%),
          repeating-radial-gradient(circle at 30% 50%, rgba(255,255,255,.13) 0 1px, transparent 1px 6px),
          #f7eed8
        `,
        boxShadow:
          "0 16px 36px rgba(0,0,0,.24), inset 0 2px 0 rgba(255,255,255,.80), inset 0 -7px 18px rgba(125,94,40,.18)",
        overflowX: "auto",
      }}
    >
      {/* light indicators */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
        <div
          style={{
            display: "flex",
            gap: 58,
            padding: "9px 42px 8px",
            borderRadius: 12,
            border: "2px solid #c4b37b",
            background: "rgba(255,250,240,.78)",
            boxShadow: "inset 0 2px 5px rgba(0,0,0,.10), 0 2px 4px rgba(255,255,255,.6)",
          }}
        >
          {["ACCEPT", "NUM LOCK", "CAPS LOCK", "SCROLL LOCK"].map((t) => (
            <div key={t} style={{ textAlign: "center", fontFamily: "monospace", fontWeight: 700 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  margin: "0 auto 5px",
                  borderRadius: "50%",
                  background: "#52b63f",
                  border: "2px solid #1e7a24",
                  boxShadow: "0 0 7px rgba(55,210,55,.7), inset 0 2px 2px rgba(255,255,255,.5)",
                }}
              />
              <div style={{ fontSize: 14, color: "#222" }}>{t}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
        {/* ROW 1 */}
        <div style={{ display: "flex", gap: GAP }}>
          {["F1", "F2", "F3"].map((x) => <K key={x} id={x} color="blue" />)}
          <div style={{ width: 10 }} />
          {"QWERTYUIOP".split("").map((x) => <K key={x} id={x} color="yellow" fs={22} />)}
          <div style={{ width: 10 }} />
          <K id="PAGE UP" label={"PAGE\nUP"} color="blue" w={74} fs={16} />
          <K id="UP" label="↑" color="cream" fs={26} />
          <K id="HELP" color="blue" w={74} fs={16} />
        </div>

        {/* ROW 2 */}
        <div style={{ display: "flex", gap: GAP }}>
          {["F4", "F5", "F6"].map((x) => <K key={x} id={x} color="blue" />)}
          <div style={{ width: 10 }} />
          <K id=">" color="blue" fs={22} />
          {"ASDFGHJKL".split("").map((x) => <K key={x} id={x} color="yellow" fs={22} />)}
          <div style={{ width: 10 }} />
          <K id="LEFT" label="←" color="cream" fs={26} />
          <K id="DOWN" label="↓" color="cream" fs={26} />
          <K id="RIGHT" label="→" color="cream" fs={26} />
        </div>

        {/* ROW 3 */}
        <div style={{ display: "flex", gap: GAP }}>
          {["F7", "F8", "F9"].map((x) => <K key={x} id={x} color="blue" />)}
          <div style={{ width: 10 }} />
          <K id="," color="blue" fs={22} />
          <K id="." color="blue" fs={22} />
          {"ZXCVBNM".split("").map((x) => <K key={x} id={x} color="yellow" fs={22} />)}
          <K id="/" color="cream" fs={22} />
          <div style={{ width: 10 }} />
          <K id="PAGE DOWN" label={"PAGE\nDOWN"} color="blue" w={74} fs={16} />
          <K id="PRICE CHANGE" label={"PRICE\nCHANGE"} color="red" w={74} fs={16} />
          <K id="LINE VOID" label={"LINE\nVOID"} color="red" w={74} fs={16} />
        </div>

        {/* ROW 4 */}
        <div style={{ display: "flex", gap: GAP }}>
          {["F10", "F11", "F12"].map((x) => <K key={x} id={x} color="blue" />)}
          <div style={{ width: 10 }} />
          <K id="*" color="blue" fs={24} />
          <K id="ORDER VIEW" label={"ORDER\nVIEW"} color="red" />
          <K id="SPACE" color="cream" w={228} fs={18} />
          <K id="CLEAR_BLANK" label="" color="blank" />
          <K id="CLEAR" color="cream" w={152} fs={18} />
          <K id="SCAN VOID" color="red" w={152} fs={18} />
          <K id="-" color="cream" fs={24} />
          <K id="GIFT RCPT" label={"GIFT\nRCPT"} color="green" w={74} fs={16} />
          <K id="MEDIA EXCHANGE" label={"MEDIA\nEXCHANGE"} color="cream" w={152} fs={16} />
        </div>

        {/* BOTTOM GRID */}
        <div style={{ display: "flex", gap: GAP, alignItems: "flex-start" }}>
          {/* 3 x 4 blank keys */}
          <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
            {[0, 1, 2, 3].map((r) => (
              <div key={r} style={{ display: "flex", gap: GAP }}>
                {[0, 1, 2].map((c) => (
                  <K key={`${r}-${c}`} id={`BLANK_${r}_${c}`} label="" color="blank" />
                ))}
              </div>
            ))}
          </div>

          {/* red function stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
            <div style={{ display: "flex", gap: GAP }}>
              <K id="PRICE INQ" label={"PRICE\nINQ"} color="red" />
              <K id="SUSP RCALL" label={"SUSP\nRCALL"} color="red" />
            </div>
            <K id="MANAGER MENU" label={"MANAGER\nMENU"} color="red" w={S * 2 + GAP} />
            <K id="CASHIER MENU" label={"CASHIER\nMENU"} color="red" w={S * 2 + GAP} />
            <K id="BOTTOM_BLANK" label="" color="blank" w={S * 2 + GAP} />
          </div>

          {/* produce stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
            <K id="PRODUCE" color="green" w={S * 2 + GAP} h={H + 8} />
            <div style={{ display: "flex", gap: GAP }}>
              <K id="SCALE" color="yellow" />
              <K id="CUST" color="blue" />
            </div>
            <div style={{ display: "flex", gap: GAP }}>
              <K id="COIN_BLANK" label="" color="blank" />
              <K id="COIN STAR" label={"COIN\nSTAR"} color="green" />
            </div>
            <K id="DEPT" color="blue" w={S * 2 + GAP} h={H + 8} />
          </div>

          {/* numpad */}
          <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
            {[
              ["7", "8", "9"],
              ["4", "5", "6"],
              ["1", "2", "3"],
            ].map((row) => (
              <div key={row.join("")} style={{ display: "flex", gap: GAP }}>
                {row.map((x) => <K key={x} id={x} color="cream" fs={25} />)}
              </div>
            ))}
            <div style={{ display: "flex", gap: GAP }}>
              <K id="0" color="cream" w={S * 2 + GAP} fs={25} />
              <K id="X" color="cream" fs={25} />
            </div>
          </div>

          {/* coupon/promo */}
          <div style={{ display: "flex", gap: GAP }}>
            <K id="COUPON" label={"C\nO\nU\nP\nO\nN"} color="red" w={76} h={H * 2 + GAP} fs={16} />
            <K id="PROMO" label={"P\nR\nO\nM\nO"} color="red" w={76} h={H * 2 + GAP} fs={16} />
          </div>

          {/* right side payments */}
          <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
            <div style={{ display: "flex", gap: GAP }}>
              <K id="RTRN" color="red" />
              <K id="ITMZER EXCPT" label={"ITMZER\nEXCPT"} color="blue" />
              <K id="OTHER MEDIA" label={"OTHER\nMEDIA"} color="cream" w={152} />
            </div>

            <div style={{ display: "flex", gap: GAP }}>
              <K id="ELECTRONIC PAYMENT" label={"ELECTRONIC\nPAYMENT"} color="cream" w={S * 2 + GAP} />
              <K id="FOOD STAMPS" label={"FOOD\nSTAMPS"} color="cream" w={S * 2 + GAP} />
            </div>

            <div style={{ display: "flex", gap: GAP, marginLeft: -(S * 2 + GAP * 2) }}>
              <K id="DIGITAL CREDIT" label={"DIGITAL\nCREDIT"} color="green" />
              <K id="NO CPN" label={"NO\nCPN"} color="gray" />
              <K id="WIC EBT" label={"WIC\nEBT"} color="teal" />
              <K id="WIC REPRINT" label={"WIC\nREPRINT"} color="cream" />
              <K id="CHECK" color="cream" w={152} />
            </div>

            <div style={{ display: "flex", gap: GAP, marginLeft: -(S * 2 + GAP * 2) }}>
  <K id="ENTER" color="yellow" w={S * 2 + GAP} fs={20} />
  <K id="TOTAL" color="yellow" w={S * 2 + GAP} fs={20} />
  <K id="CASH" color="cream" w={152} fs={20} />
</div>
          </div>
        </div>
      </div>
    </div>
  );
}
