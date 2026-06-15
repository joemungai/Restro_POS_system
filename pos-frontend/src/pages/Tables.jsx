// Tables.jsx
// Displays the Tables page — a full grid of all restaurant tables.
// Each card shows the table number, booking status, and assigned waiter's initials.
// Currently uses mock data; replace with real API/Redux data when backend is connected.

import React from "react";
import BottomNav from "../components/shared/BottomNav";       // Persistent bottom navigation bar (Home, Orders, Tables, More)
import BackButton from "../components/shared/BackButton";     // Reusable back arrow button (top-left)
import TableCard from "../components/tables/TableCard.jsx";   // Card component for individual table display

// ─────────────────────────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────────────────────────
// Temporary stand-in for real table data from the backend.
// Each object represents one restaurant table with:
//   - tableNumber : unique identifier used as React key
//   - name        : full table label displayed on the card header e.g. "Table 1"
//   - status      : "Booked" (occupied) or "Available" (free)
//   - initials    : 2-letter initials of the assigned waiter, shown as avatar
//
// TODO: Replace mockTables with real data from Redux store or API call
//       e.g. const tables = useSelector(state => state.tables.list)
const mockTables = [
  { tableNumber: 1,  name: "Table 1",  status: "Booked",    initials: "AM" },
  { tableNumber: 2,  name: "Table 2",  status: "Available", initials: "MB" },
  { tableNumber: 3,  name: "Table 3",  status: "Booked",    initials: "JS" },
  { tableNumber: 4,  name: "Table 4",  status: "Available", initials: "HR" },
  { tableNumber: 5,  name: "Table 5",  status: "Booked",    initials: "PL" },
  { tableNumber: 6,  name: "Table 6",  status: "Available", initials: "RT" },
  { tableNumber: 7,  name: "Table 7",  status: "Booked",    initials: "LC" },
  { tableNumber: 8,  name: "Table 8",  status: "Available", initials: "DP" },
  { tableNumber: 9,  name: "Table 9",  status: "Booked",    initials: "NK" },
  { tableNumber: 10, name: "Table 10", status: "Available", initials: "SB" },
];

// ─────────────────────────────────────────────────────────────
// Tables Component
// ─────────────────────────────────────────────────────────────
// Page-level component rendered at the /tables route.
// Structure:
//   1. Top bar    — back button + page title
//   2. Grid area  — scrollable grid of TableCard components
//   3. BottomNav  — persistent bottom navigation
const Tables = () => {
  return (
    // Page wrapper — dark background, height fills viewport minus the shared Header (5rem)
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden">

      {/* ── 1. Top Bar ──────────────────────────────────────────
          Contains the back button and "Tables" page title.
          Kept separate from the grid so it stays fixed at the top
          while the grid below can scroll independently.          */}
      <div className="flex items-center px-10 py-4">

        {/* Navigates back to the previous page in browser history */}
        <BackButton />

        {/* Page title */}
        <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider ml-4">
          Tables
        </h1>

      </div>

      {/* ── 2. Tables Grid ──────────────────────────────────────
          Responsive grid that adjusts column count by screen size:
            - Mobile  : 2 columns
            - Tablet  : 3 columns
            - Desktop : 5 columns
          pb-24 adds bottom padding so last row isn't hidden behind BottomNav.
          overflow-y-auto enables vertical scrolling when tables exceed viewport. */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-10 pb-24 overflow-y-auto h-[calc(100%-5rem)]">

        {/* Render one TableCard per table entry.
            - key uses tableNumber (unique) so React can track each card efficiently.
            - Props passed individually (flat) to match TableCard's prop signature. */}
        {mockTables.map((table) => (
          <TableCard
            key={table.tableNumber}
            name={table.name}
            status={table.status}
            initials={table.initials}
          />
        ))}

      </div>

      {/* ── 3. Bottom Navigation ────────────────────────────────
          Shared nav bar (Home / Orders / Tables / More).
          Rendered inside the page section so it stays at the bottom
          of the viewport without overlapping the grid content.     */}
      <BottomNav />

    </section>
  );
};

export default Tables;