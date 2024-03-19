import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "./../context/RegisterContext";
import {
  getDatabase,
  ref,
  push,
  onValue,
  get,
  DataSnapshot,
  update,
} from "firebase/database";
import app from "./../lib/firebase";
const database = getDatabase(app);

interface Message {
  sender: string;
  content: string;
  hours: string;
  sellerRead: boolean;
}

const ChatToSeller = () => {
  const { id } = useParams<{ id: string }>();
  const { userId } = useUser();
  const buyer: string = userId ? userId : "";
  const seller: string = id
    ? id.substring(0, id.length - buyer.toString().length)
    : "";
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputChat, setInputChat] = useState("");
  const sellername = "namazaza";

  const handleRead = () => {
    const path = ref(database, `chats/${seller}${buyer}`);
    get(path)
      .then((snapshot: DataSnapshot) => {
        const chatData = snapshot.val();
        for (const chatId in chatData) {
          if (chatData.hasOwnProperty(chatId)) {
            const chatEntry = chatData[chatId];
            if (
              chatEntry.hasOwnProperty("buyerRead") &&
              chatEntry.buyerRead === false
            ) {
              update(ref(database, `chats/${seller}${buyer}/${chatId}`), {
                buyerRead: true,
              });
            }
          }
        }
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  };

  useEffect(() => {
    handleRead();
    const path = ref(database, `chats/${id}`);
    onValue(path, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.entries<Message>(data).map(
          ([key, value]) => ({
            id: key,
            ...value,
          })
        );
        setMessages(messagesArray);
      } else {
        setMessages([]);
      }
    });
  }, [messages]);

  const sendMessage = async () => {
    if (inputChat.trim() !== "") {
      const currentTime = new Date();
      const message: {
        sender: string;
        content: string;
        hours: string;
        sellerRead: boolean;
      } = {
        sender: buyer,
        content: inputChat,
        hours: `${currentTime.getHours()}:${(currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes()}`,
        sellerRead: false,
      };
      push(ref(database, `chats/${id}`), message);
      setInputChat("");

      const buyerData: {
        displayName: string;
        uid: string;
      } = {
        displayName: userId ? userId : "",
        uid: userId ? userId : "",
      };
      const buyerRef = ref(database, `buyer/${seller}`);
      const buyerSnapshot = await get(buyerRef);
      let dataExists = false;
      buyerSnapshot.forEach((buyer) => {
        if (buyer.val().uid === buyerData.uid) {
          dataExists = true;
          return;
        }
      });
      if (!dataExists) {
        push(ref(database, `buyer/${seller}`), buyerData);
      } else {
        console.log("Data with the same UID already exists");
      }

      const sellerData = {
        uid: seller, //owner_id
        displayName: sellername, //owner_name
      };
      const sellerRef = ref(database, `seller/${userId}`);
      const sellerSnapshot = await get(sellerRef);
      let dataExist = false;
      sellerSnapshot.forEach((sellerChild) => {
        if (sellerChild.val().uid === sellerData.uid) {
          dataExist = true;
          return;
        }
      });
      if (!dataExist) {
        push(ref(database, `seller/${userId}`), sellerData);
      } else {
        console.log("Data with the same UID already exists");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20 justify-end items-center relative">
      <div className="flex items-center fixed w-full px-[390px] py-4 top-0 mb-4 text-xl font-bold text-white bg-[#135699]">
        <img
          src="https://i.ibb.co/ctyg3bB/avatar.png"
          className="w-10 mr-4"
          alt="img"
        />
        Seller Name
      </div>
      {messages.map((message) => (
        <div
          className={`flex flex-col w-full max-w-2xl ${
            message.sender === buyer ? "items-end" : "items-start"
          }`}
        >
          <div className="flex flex-col max-w-xs rounded-lg px-4 py-2 mb-2.5 text-white bg-[#135699]">
            <p className="mb-1">{message.content}</p>
            <p className="text-xs self-end">{message.hours}</p>
          </div>
        </div>
      ))}
      <div className="flex justify-center fixed w-full bottom-0 px-[390px] py-4 bg-[#135699]">
        <input
          type="text"
          value={inputChat}
          onChange={(e) => setInputChat(e.target.value)}
          placeholder="Ketik pesan Anda"
          className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="py-2 px-4 rounded-r-md bg-slate-900 text-white cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatToSeller;
