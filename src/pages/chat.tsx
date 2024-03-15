import { useState } from "react";
import ListBuyer from "./../components/fragments/ListBuyer";
import ListSeller from "@/components/fragments/ListSeller";
import { useUser } from "@/context/RegisterContext";
import { get, getDatabase, push, ref } from "firebase/database";
import app from "@/lib/firebase";

const database = getDatabase(app);

const Chat = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const { userId, username } = useUser();

  const handleTabChange = (tabNumber: number) => {
    setActiveTab(tabNumber);
    setIndicatorPosition(tabNumber === 1 ? 0 : 100);
  };

  const sendData = async () => {
    if (userId) {
      const userData = {
        uid: userId,
        displayName: username,
      };

      const sellerRef = ref(database, `seller/${userId}`);
      const sellerSnapshot = await get(sellerRef);

      let dataExists = false;
      sellerSnapshot.forEach((sellerChild) => {
        if (sellerChild.val().uid === userData.uid) {
          dataExists = true;
          return;
        }
      });

      if (!dataExists) {
        push(ref(database, "seller"), userData);
      } else {
        console.log("Data with the same UID already exists");
      }
    }
  };

  return (
    <main className="p-4">
      <div className="flex relative mb-4 bg-gray-200 rounded-lg overflow-hidden">
        <button
          className={`flex-1 px-4 py-4 ${
            activeTab === 1
              ? "bg-white text-gray-800"
              : "bg-gray-200 text-gray-600"
          } focus:outline-none border-r border-gray-300`}
          onClick={() => handleTabChange(1)}
        >
          Pesan Penjual
        </button>
        <button
          className={`flex-1 px-4 py-2 ${
            activeTab === 2
              ? "bg-white text-gray-800"
              : "bg-gray-200 text-gray-600"
          } focus:outline-none`}
          onClick={() => {
            handleTabChange(2);
            sendData();
          }}
        >
          Pesan Pembeli
        </button>
        <div
          className="absolute bottom-0 left-0 bg-blue-500 h-1 transition-transform duration-300"
          style={{
            width: "50%",
            transform: `translateX(${indicatorPosition}%)`,
          }}
        />
      </div>
      <div className="mt-4">
        {activeTab === 1 && (
          <div className="bg-blue-100 p-4 rounded-lg">
            <ListSeller />
          </div>
        )}
        {activeTab === 2 && (
          <div className="bg-blue-100 p-4 rounded-lg">
            <ListBuyer />
          </div>
        )}
      </div>
    </main>
  );
};

export default Chat;
