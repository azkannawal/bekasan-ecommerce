import { getDatabase, off, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import app from "./../../lib/firebase";
import { useUser } from "./../../context/RegisterContext";
import NotificationIcon from "./ChatNotif";

const database = getDatabase(app);

const ListBuyer: React.FC = () => {
  const [buyerData, setBuyerData] = useState<any[]>([]);
  const { userId } = useUser();
  const seller: string = userId ? userId : "";

  useEffect(() => {
    const fetchData = () => {
      const buyerRef = ref(database, `buyer/${seller}`);
      onValue(buyerRef, (snapshot) => {
        const data: any[] = [];
        snapshot.forEach((childSnapshot) => {
          data.push(childSnapshot.val());
        });
        setBuyerData(data);
      });
    };

    fetchData();

    return () => {
      const buyerRef = ref(database, `buyer/${seller}`);
      off(buyerRef);
    };
  }, [seller]);

  return (
    <div className="flex flex-col gap-4">
      {buyerData && buyerData.length > 0 ? (
        buyerData.map((buyer, index) => (
          <Link key={index} to={`tobuyer/${seller}${buyer.uid}`}>
            <div className="flex items-center gap-4">
              <NotificationIcon
                datapath={`chats/${seller}${buyer.uid}`}
                read="sellerRead"
              />
              <img
                className="w-20 h-20 rounded-full"
                src="./avatar.png"
                alt={buyer.displayName}
              />{" "}
              <p>{buyer.displayName}</p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-lg p-5">Belum ada chat dari pembeli</h1>
      )}
    </div>
  );
};

export default ListBuyer;
