import { useEffect, useState, useCallback } from "react";

const useDeliveryMap = (onAddressFound?: (addr: string) => void) => {

    const [mapLoaded, setMapLoaded] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const [location, setLocation] = useState(
        {
            lat: 19.0480,
            lng: -98.2608,
        });
    const [locationError, setLocationError] = useState('');
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
    }, []);

    const reverseGeocode = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
                { headers: { 'User-Agent': 'FranCoffee-App-Puebla' } }
            );
            const data = await response.json();
            return data.display_name || "";
        } catch (error) {
            return "";
        }
    };

    const handleUseCurrentLocation = useCallback(() => {
        setIsLocating(true);
        setLocationError('');

        if (!navigator.geolocation) {
            setLocationError("Tu navegador no soporta geolocalización.");
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
                        message = "La ubicación no está disponible (verifica tu conexión Wi-Fi).";
                        break;
                    case error.TIMEOUT:
                        message = "Se agotó el tiempo de espera. Intenta mover el mapa manualmente.";
                        break;
                }

                setLocationError(message);
                setIsLocating(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 8000, // 8 seconds: enough for the Mac Mini to try, but not long enough to annoy the user
                maximumAge: 0
            }
        );
    }, [onAddressFound]);

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
