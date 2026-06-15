import React from 'react';
import Header from '../components/shared/Header';
import BottomNav from '../components/shared/BottomNav';
import { FaEye, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

const Orders = () => {
  // Sample boilerplate data for the POS ledger layout
  const orderHistory = [
    { id: "ORD-9482", table: "Table 04", time: "14:22 PM", total: "$42.50", status: "Completed" },
    { id: "ORD-9481", table: "Takeaway", time: "14:15 PM", total: "$18.20", status: "In Progress" },
    { id: "ORD-9480", table: "Table 11", time: "13:58 PM", total: "$112.00", status: "Completed" },
    { id: "ORD-9479", table: "Table 02", time: "13:40 PM", total: "$67.10", status: "Cancelled" },
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0a0a0a] text-[#f5f5f5] overflow-hidden select-none">
      
      {/* GLOBAL TOP NAVIGATION */}
      

      {/* REVENUE & ORDER HISTORICAL LEDGER PANEL */}
      <main className="flex flex-1 flex-col h-[calc(100vh-10rem)] w-full p-8 overflow-y-auto gap-6">
        
        {/* Page Title Header block */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-wide">Order Management</h1>
            <p className="text-xs text-[#ababab] mt-1">Review live receipts, transaction status, and table sessions.</p>
          </div>
          <div className="bg-[#1a1a1a] px-4 py-2 rounded-xl border border-[#2a2a2a] text-xs text-[#ffc107] font-medium">
            Active Sessions: 4 Terminals Online
          </div>
        </div>

        {/* ORDER RECONCILIATION DATA TABLE */}
        <div className="bg-[#1a1a1a] rounded-[20px] border border-[#2a2a2a] overflow-hidden flex-1 flex flex-col">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              
              {/* Table Column Labels */}
              <thead>
                <tr className="border-b border-[#2a2a2a] bg-[#1f1f1f] text-xs uppercase text-[#ababab] tracking-wider">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Destination</th>
                  <th className="py-4 px-6">Timestamp</th>
                  <th className="py-4 px-6">Gross Total</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>

              {/* Dynamic Row Injection */}
              <tbody className="text-sm divide-y divide-[#2a2a2a]">
                {orderHistory.map((order, idx) => (
                  <tr key={idx} className="hover:bg-[#1f1f1f]/50 transition-colors">
                    <td className="py-4 px-6 font-mono text-[#ffc107]">{order.id}</td>
                    <td className="py-4 px-6 font-medium">{order.table}</td>
                    <td className="py-4 px-6 text-[#ababab]">{order.time}</td>
                    <td className="py-4 px-6 font-semibold text-[#f5f5f5]">{order.total}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {order.status === "Completed" && <FaCheckCircle className="text-green-500" />}
                        {order.status === "In Progress" && <FaClock className="text-amber-500" />}
                        {order.status === "Cancelled" && <FaTimesCircle className="text-red-500" />}
                        <span className="text-[#ababab]">{order.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-[#ffc107] hover:text-[#ffeb3b] transition-colors">
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* GLOBAL BOTTOM NAVIGATION */}
      <BottomNav />
    </div>
  );
};

export default Orders;