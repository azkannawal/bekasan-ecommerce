import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import app from "./../../lib/firebase";

const database = getDatabase(app);

interface NotificationIconProps {
  datapath: string;
  read: string;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
  datapath,
  read,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const path = ref(database, datapath);
    const handleNotificationChange = (snapshot: any) => {
      const data = snapshot.val() || [];
      if (read === "buyerRead") {
        const unread = Object.values(data).filter(
          (item: any) => !item.buyerRead
        );
        setCount(unread.length);
      } else {
        const unread = Object.values(data).filter(
          (item: any) => !item.sellerRead
        );
        setCount(unread.length);
      }
    };
    onValue(path, handleNotificationChange);
    return () => {
      off(path);
      // off(path, handleNotificationChange);
    };
  }, []);

  return (
    <div
      className={`absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs ${
        count === 0 ? "hidden" : ""
      }`}
    >
      {count}
    </div>
  );
};

export default NotificationIcon;