import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
  DataSnapshot,
  get,
} from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import app from "./../lib/firebase";
import { useUser } from "./../context/RegisterContext";
import { useAuth } from "@/context/LoginContext";
import { axiosInstance } from "@/lib/axios";
import { getNewToken } from "@/hooks/useToken";
import useNot from "@/hooks/useNot";

interface Message {
  sender: string;
  content: string;
  hours: string;
  buyerRead: boolean;
}

const database = getDatabase(app);

const ChatToBuyer = () => {
  useNot();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userId } = useUser();
  const { accessToken, refreshToken, setTokens } = useAuth();
  const [inputChat, setInputChat] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const seller: string = userId ? userId : "";
  const buyer = id ? id.substring(seller.length) : "";
  const [buyername, setBuyername] = useState("");

  const getBuyerName = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": true,
      },
    };
    try {
      const response = await axiosInstance.get(`chat/who/${buyer}`, config);
      setBuyername(response.data.data.name);
    } catch (error: any) {
      if (
        error.response.status === 401 &&
        error.response.data.is_expired === true
      ) {
        getNewToken(refreshToken, setTokens);
      } else if (
        error.response.status === 401 &&
        error.response.data.is_expired === false
      ) {
        navigate("/login");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } else {
        console.log(error.response);
      }
    }
  };

  const handleRead = () => {
    const path = ref(database, `chats/${seller}${buyer}`);
    get(path)
      .then((snapshot: DataSnapshot) => {
        const chatData = snapshot.val();
        for (const chatId in chatData) {
          if (chatData.hasOwnProperty(chatId)) {
            const chatEntry = chatData[chatId];
            if (
              chatEntry.hasOwnProperty("sellerRead") &&
              chatEntry.sellerRead === false
            ) {
              update(ref(database, `chats/${seller}${buyer}/${chatId}`), {
                sellerRead: true,
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
    getBuyerName();
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
  }, []);

  const sendMessage = () => {
    if (inputChat.trim() !== "") {
      const currentTime = new Date();
      const message: Message = {
        sender: seller,
        content: inputChat,
        hours: `${currentTime.getHours()}:${
          (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes()
        }`,
        buyerRead: false,
      };
      push(ref(database, `chats/${id}`), message);
      setInputChat("");
    }
  };

  return (
    <div className="flex flex-col justify-end items-center relative min-h-screen pb-20">
      <div className="flex items-center fixed w-full lg:px-[390px] py-4 top-0 mb-4 text-xl font-bold text-white bg-[#135691] sm:px-[50px]">
        <img
          src="https://i.ibb.co/ctyg3bB/avatar.png"
          className="w-10 mr-4"
          alt="img"
        />
        {buyername}
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
      <div className="flex justify-center fixed w-full bottom-0 lg:px-[390px] py-4 bg-[#135699] sm:px-[100px]">
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
