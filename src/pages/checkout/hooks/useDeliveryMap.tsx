import { useEffect, useState, useCallback } from "react";
import { useCheckout } from "../context/CheckoutContext";
import { toast } from "sonner";

const useDeliveryMap = (onAddressFound?: (addr: string) => void) => {

    const { handleDeliveryLocationChanged } = useCheckout();

    const [mapLoaded, setMapLoaded] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const [location, setLocation] = useState(
        {
            lat: 19.0480,
            lng: -98.2608,
        });
    const handleMapMoveEnd = useCallback((coords: { lat: number; lng: number }) => {
        // Use functional update to avoid dependency on 'location'
        setLocation(prev => {
            // Only update if the difference is meaningful (> 1 meter approx)
            if (Math.abs(prev.lat - coords.lat) < 0.00001 &&
                Math.abs(prev.lng - coords.lng) < 0.00001) {
                return prev;
            }
            return { ...prev, ...coords };
        });
        handleDeliveryLocationChanged({ lat: coords.lat, lng: coords.lng });
    }, [handleDeliveryLocationChanged]);

    const reverseGeocode = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
                { headers: { 'User-Agent': 'FranCoffee-App-Puebla' } }
            );
            const data = await response.json();
            return data.display_name || "";
        } catch (err) {
            console.error("Reverse geocoding failed:", err);
        }
    };

    const handleUseCurrentLocation = useCallback(() => {
        setIsLocating(true);
        if (!navigator.geolocation) {
            toast.error("Tu navegador no soporta geolocalización.", { position: "bottom-right" });
            setIsLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const addr = await reverseGeocode(latitude, longitude);
                if (onAddressFound && addr) {
                    onAddressFound(addr);
                }
                setLocation({ lat: latitude, lng: longitude });
                handleDeliveryLocationChanged({ lat: latitude, lng: longitude });
                setIsLocating(false);
            },
            (error) => {
                console.log(error);
                let message = "Ocurrió un error al buscar tu ubicación.";

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = "Permiso denegado. Por favor, habilita la ubicación en tu navegador.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = "La ubicación no está disponible. Verifica tu conexión a internet).";
                        break;
                    case error.TIMEOUT:
                        message = "Búsqueda automática falló. Intenta mover el mapa manualmente.";
                        break;
                }

                toast.error(message, { position: "bottom-right" });
                setIsLocating(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 8000, // 8 seconds: enough for the Mac Mini to try, but not long enough to annoy the user
                maximumAge: 0
            }
        );
    }, [onAddressFound, handleDeliveryLocationChanged]);

    useEffect(() => {
        const timer = setTimeout(() => setMapLoaded(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        {
            mapLoaded,
            isLocating,
            location,

            handleMapMoveEnd,
            handleUseCurrentLocation,
        })
}

export default useDeliveryMap
