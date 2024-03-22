import { useState } from "react";
import BuyTransaction from "@/components/fragments/BuyTransaction";
import SellTransaction from "@/components/fragments/SellTransaction";
import useNot from "@/hooks/useNot";

const Transaction = () => {
  useNot();
  const [activeTab, setActiveTab] = useState(1);
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  const handleTabChange = (tabNumber: number) => {
    setActiveTab(tabNumber);
    setIndicatorPosition(tabNumber === 1 ? 0 : 100);
  };

  return (
    <main className="relative">
      <div className="flex relative mb-4 overflow-hidden">
        <button
          className={`flex-1 px-4 py-6 font-semibold ${
            activeTab === 1
              ? "bg-[#135699] text-white"
              : "bg-blue-100 text-slate-900"
          } focus:outline-none`}
          onClick={() => handleTabChange(1)}
        >
          Pembelian
        </button>
        <button
          className={`flex-1 px-4 py-6 font-semibold ${
            activeTab === 2
              ? "bg-[#135699] text-white"
              : "bg-blue-100 text-slate-900"
          } focus:outline-none`}
          onClick={() => {
            handleTabChange(2);
          }}
        >
          Penjualan
        </button>
        <div
          className="absolute bottom-0 left-0 h-1 transition-transform duration-300 bg-[#135699]"
          style={{
            width: "50%",
            transform: `translateX(${indicatorPosition}%)`,
          }}
        />
      </div>
      <div className="px-16 relative">
        {activeTab === 1 ? <BuyTransaction /> : <SellTransaction />}
      </div>
    </main>
  );
};

export default Transaction;
