import { useState } from "react";
import ListBuyer from "../../components/fragments/ListBuyer";
import ListSeller from "@/components/fragments/ListSeller";

const Chat = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  const handleTabChange = (tabNumber: number) => {
    setActiveTab(tabNumber);
    setIndicatorPosition(tabNumber === 1 ? 0 : 100);
  };

  return (
    <main>
      <div className="flex relative mb-4 overflow-hidden">
        <button
          className={`flex-1 px-4 py-6 font-semibold ${
            activeTab === 1
              ? "bg-[#135699] text-white"
              : "bg-blue-100 text-slate-900"
          } focus:outline-none border-r border-gray-300`}
          onClick={() => handleTabChange(1)}
        >
          Chat dari penjual
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
          Chat dari pembeli
        </button>
        <div
          className="absolute bottom-0 left-0 h-1 transition-transform duration-300 bg-[#135699]"
          style={{
            width: "50%",
            transform: `translateX(${indicatorPosition}%)`,
          }}
        />
      </div>
      <div className="px-16">
        {activeTab === 1 ? (
          <div className="border-b-2 border-[#135699] p-4 rounded-lg">
            <ListSeller />
          </div>
        ) : (
          <div className="border-b-2 border-[#135699] p-4 rounded-lg">
            <ListBuyer />
          </div>
        )}
      </div>
    </main>
  );
};

export default Chat;
