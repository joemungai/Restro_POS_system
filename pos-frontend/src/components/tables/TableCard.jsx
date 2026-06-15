// TableCard.jsx
// Displays a single restaurant table's status and assigned waiter avatar.
// Used in the Tables page to render a grid of all tables.

import React from "react";
import { getBgColor } from "../../utils"; // Returns a random hex color string e.g. "#f6b100"

// ─────────────────────────────────────────────────────────────
// TableCard Component
// ─────────────────────────────────────────────────────────────
// Props:
//   key      (number/string) — unique identifier for React list rendering
//   name     (string)        — table label e.g. "Table 1"
//   status   (string)        — "Booked" | "Available"
//   initials (string)        — 2-letter waiter initials e.g. "AM", "MB"
const TableCard = ({ key, name, status, initials }) => {
  return (
    // Card wrapper — fixed width, dark background, hover effect, pointer cursor
    <div
      key={key}
      className="w-[300px] hover:bg-[#2c2c2c] bg-[#262626] p-4 rounded-lg cursor-pointer"
    >
      {/* ── Top Row: Table name + Status badge ── */}
      <div className="flex items-center justify-between px-1">

        {/* Table name e.g. "Table 1" */}
        <h1 className="text-[#f5f5f5] text-xl font-semibold">{name}</h1>

        {/* Status badge — green tint for Booked, yellow/brown tint for Available */}
        <p
          className={`${
            status === "Booked"
              ? "text-green-600 bg-[#2e4a40]"  // Booked: green text on dark green bg
              : "bg-[#664a04] text-white"        // Available: white text on dark yellow bg
          } px-2 py-1 rounded-lg`}
        >
          {status}
        </p>

      </div>

      {/* ── Center: Waiter avatar circle ──
          getBgColor() returns a random hex color string from utils/index.jsx.
          Applied via inline style since it's a hex value, not a Tailwind class.  */}
      <div className="flex items-center justify-center mt-5 mb-5">
        <h1
          className="text-white rounded-full p-5 text-xl"
          style={{ backgroundColor: getBgColor() }}  /* ← inline style for hex value */
        >
          {initials}
        </h1>
      </div>

    </div>
  );
};

export default TableCard;