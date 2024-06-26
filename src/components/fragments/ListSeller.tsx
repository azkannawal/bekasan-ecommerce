import { getDatabase, off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import app from "./../../lib/firebase";
import { useUser } from "./../../context/RegisterContext";
import NotificationIcon from "./ChatNotif";
const database = getDatabase(app);

type Seller = {
  uid: string;
  displayName: string;
}

const ListSeller = () => {
  const [sellerData, setSellerData] = useState<Seller[]>([]);
  const { userId } = useUser();
  const buyer: string = userId ? userId : "";

  useEffect(() => {
    const fetchData = () => {
      const sellerRef = ref(database, `seller/${buyer}`);
      onValue(sellerRef, (snapshot) => {
        const data: Seller[] = [];
        snapshot.forEach((childSnapshot) => {
          data.push(childSnapshot.val());
        });
        setSellerData(data);
      });
    };

    fetchData();

    return () => {
      const sellerRef = ref(database, `seller/${buyer}`);
      off(sellerRef);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 relative">
      {sellerData && sellerData.length > 0 ? (
        sellerData.map((seller, index) => (
          <div key={index}>
            <Link to={`toseller/${seller.uid}${buyer}`}>
              <div className="flex items-center gap-4">
                <NotificationIcon
                  datapath={`chats/${seller.uid}${buyer}`}
                  read="buyerRead"
                />
                <img
                  src="./avatar.png"
                  alt={seller.displayName}
                  className="rounded-full w-20 h-20"
                />
                <p>{seller.displayName}</p>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <h1 className="text-lg p-5">Anda belum pernah chat penjual</h1>
      )}
    </div>
  );
};

export default ListSeller;
