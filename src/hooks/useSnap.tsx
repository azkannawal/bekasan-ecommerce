import { useEffect, useState } from "react";

interface Snap {
  embed: (snap_token: string, options: { embedId: string }) => void;
  pay: (snap_token: string) => void;
}

const useSnap = (): {
  snapPopup: (snap_token: string) => void;
} => {
  const [snap, setSnap] = useState<Snap | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = import.meta.env.VITE_MIDTRANS_URL_SRC;
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    script.onload = () => setSnap((window as any).snap);
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const snapPopup = (snap_token: string) => snap && snap.pay(snap_token);

  return {snapPopup};
};

export default useSnap;
