import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AdressInput: React.FC = () => {
  const [autocomplete, setAutocomplete] = useState<any | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg",
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

      setAutocomplete(autocompleteInstance);
    });

    // Cleanup
    return () => {
      // Cleanup code here if needed
    };
  }, []);

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const addressObject = autocomplete.getPlace();
      if (addressObject) {
        const latitude = addressObject.geometry.location.lat();
        const longitude = addressObject.geometry.location.lng();
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
      }
    }
  };

  return (
    <div className="px-[200px] py-2">
      <h1>Google Maps Search</h1>
      <div className="flex gap-2">
        <Input id="searchInput" type="text" placeholder="Enter a location" />
        <Button onClick={handlePlaceSelect}>Search</Button>
      </div>
    </div>
  );
};

export default AdressInput;
