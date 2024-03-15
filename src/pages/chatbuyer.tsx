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
  const [InputText, setInputText] = useState<string>("");
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

    return () => {};
  }, []);

  const sendMessage = () => {
    if (InputText.trim() !== "") {
      const currentTime = new Date();
      const message: Message = {
        sender: seller,
        content: InputText,
        hours: `${currentTime.getHours()}:${currentTime.getMinutes()}`,
        buyerRead: false,
      };
      push(ref(database, `chats/${id}`), message);

      setInputText("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col relative">
      {messages.length > 0 && (
        <h1 className="text-2xl font-bold text-center mb-4">
          {messages[0].sender}
        </h1>
      )}
      {messages.map((message) => (
        <div
          className={`flex flex-col ${
            message.sender === seller ? "items-end" : "items-start"
          }`}
        >
          <div className="bg-red-500 rounded-lg px-4 py-2 mb-2 max-w-xs flex flex-col">
            <p className="mb-1">{message.content}</p>
            <p className="text-xs self-end">{message.hours}</p>
          </div>
        </div>
      ))}
      <div className="mt-4 flex justify-center sticky bottom-3 w-full">
        <input
          type="text"
          value={InputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message"
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none flex-grow"
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 text-white py-2 px-4 rounded-r-md cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatToBuyer;
