import { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Input } from "../ui/input";
import { addressUser } from "@/context/AddressContext";

const Address = () => {
  const { setUser } = addressUser();
  const [address, setAddress] = useState<string>("");
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);

  useEffect(() => {
    const key = import.meta.env.VITE_ADDRESS_KEY;
    const loader = new Loader({
      apiKey: key,
      libraries: ["places"],
    });

    loader.load().then(() => {
      const google = (window as any).google;
      const malangBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-8.032, 112.555),
        new google.maps.LatLng(-7.9035, 112.773)
      );

      const inputElement = document.getElementById(
        "searchInput"
      ) as HTMLInputElement;

      const autocompleteInstance = new google.maps.places.Autocomplete(
        inputElement,
        { bounds: malangBounds, strictBounds: true }
      );

      autocompleteInstance.addListener("place_changed", () => {
        const place = autocompleteInstance.getPlace();
        if (place.geometry && place.geometry.location) {
          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();
          setAddress(place.formatted_address);
          setLongitude(longitude);
          setLatitude(latitude);
        }
      });
    });
  }, []);

  useEffect(() => {
    setUser({ address: address, longitude: longitude, latitude: latitude });
  }, [address, longitude, latitude]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Input
        id="searchInput"
        type="text"
        placeholder="Alamat"
        required
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default Address;
