import { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { useParams } from "react-router-dom";
import app from "./../lib/firebase";
import { useUser } from "./../context/RegisterContext";

interface Message {
  sender: string;
  content: string;
  hours: string;
  buyerRead: boolean;
}

const database = getDatabase(app);

const ChatToBuyer = () => {
  const { id } = useParams<{ id: string }>();
  const { userId } = useUser();
  const [inputChat, setInputChat] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const seller: string = userId ? userId : "";

  useEffect(() => {
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
  }, []);

  const sendMessage = () => {
    if (inputChat.trim() !== "") {
      const currentTime = new Date();
      const message: Message = {
        sender: seller,
        content: inputChat,
        hours: `${currentTime.getHours()}:${currentTime.getMinutes()}`,
        buyerRead: false,
      };
      push(ref(database, `chats/${id}`), message);
      setInputChat("");
    }
  };

  return (
    <div className="flex flex-col justify-end items-center relative min-h-screen pb-20">
      <div className="flex items-center fixed w-full px-[390px] py-4 top-0 mb-4 text-xl font-bold text-white bg-[#135699]">
        <img
          src="https://i.ibb.co/ctyg3bB/avatar.png"
          className="w-10 mr-4"
          alt="img"
        />
        Buyer Name
      </div>
      {messages.map((message) => (
        <div
          className={`flex flex-col w-full max-w-2xl ${
            message.sender === seller ? "items-end" : "items-start"
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

export default ChatToBuyer;
