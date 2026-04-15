import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { MapPin, Locate, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import 'leaflet/dist/leaflet.css';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import useDeliveryMap from '../hooks/useDeliveryMap';
import { useEffect } from 'react';
import { useCheckout } from '../context/CheckoutContext';


const MapCenterTracker = ({ onMoveEnd }: { onMoveEnd: (coords: { lat: number; lng: number }) => void }) => {
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      onMoveEnd({ lat: center.lat, lng: center.lng });
    },
  });
  return null;
};

const RecenterMap = ({ location }: { location: { lat: number; lng: number } }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([location.lat, location.lng], map.getZoom(), { animate: true, duration: 0.3 });
  }, [location.lat, location.lng, map]);
  return null;
};

const DeliveryMap = () => {

  const {
    errors,
    address,
    handleAddressChange
  } = useCheckout();

  const {
    isLocating,
    mapLoaded,
    location,

    handleUseCurrentLocation,
    handleMapMoveEnd,
  } = useDeliveryMap(handleAddressChange);

  return (
    <Card className="border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-serif text-xl">
          <MapPin className="h-5 w-5" />
          Información de Entrega
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* ADDRESS INPUT (The editable source of truth) */}
        <div className="space-y-2">
          <Field>
            <FieldLabel htmlFor="address">Dirección</FieldLabel>
            <Input
              id="address"
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
              placeholder="Calle, numero, colonia..."
              className={errors.address ? "border-destructive" : ""}
            />
            {errors.address && <FieldError>{errors.address}</FieldError>}
          </Field>
        </div>

        {/* MAP CONTROLS */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Usa el mapa para localizar tu punto de entrega
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
          >
            <Locate className={`h-4 w-4 ${isLocating ? 'animate-pulse' : ''}`} />
            {isLocating ? "Buscando..." : "Mi ubicación"}
          </Button>
        </div>

        {/* THE MAP AREA */}
        <div className="relative h-80 w-full overflow-hidden rounded-lg border">
          {!mapLoaded ? (
            <div className="flex h-full items-center justify-center bg-secondary">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : (
            <>
              <MapContainer
                center={[location.lat, location.lng]}
                zoom={16}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapCenterTracker onMoveEnd={handleMapMoveEnd} />
                <RecenterMap location={location} />
              </MapContainer>

              {/* THE FIXED PIN */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1000]">
                <div className="flex flex-col items-center -translate-y-1/2">
                  <MapPin className="h-10 w-10 text-accent fill-accent/20 drop-shadow-xl" />
                </div>
              </div>
            </>
          )}
        </div>
        <Field>

          <FieldLabel htmlFor='notes'>Notas de entrega (Opcional)</FieldLabel>
          <Input
            placeholder="Ayúdanos a encontrar mas rápido tu domicilio con una descripción o si se necesita un acceso para paquetería"
            className="border-accent/20"
          />
        </Field>
        <p className="text-xs text-muted-foreground">
          Usaremos la información del mapa para agilizar la entrega
        </p>
      </CardContent>
    </Card>
  );
};

export default DeliveryMap;