import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DeliveryLocation } from '@/types/deliveryLocation.interface'
import { AlertCircle, MapPin, Navigation } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react'
import useCheckout from '../hooks/useCheckout';

interface Props {
    location: DeliveryLocation | null,
    onLocationSelect: (location: DeliveryLocation) => void
}

const DeliveryMap = ( {location, onLocationSelect} : Props) => {

  const { errors } = useCheckout();
  
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const handleMapClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const lat = 40.7128 + (rect.height / 2 - y) * 0.0001
      const lng = -74.006 + (x - rect.width / 2) * 0.0001

      onLocationSelect({
        lat: Number(lat.toFixed(6)),
        lng: Number(lng.toFixed(6)),
        address: ''
      })
  },[onLocationSelect]);

  const handleUseCurrentLocation = () => {
    setIsLocating(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)} - Current Location`,
          })
          setIsLocating(false)
        },
        () => {
          // Fallback to default location on error
          onLocationSelect({
            lat: 40.7128,
            lng: -74.006,
            address: "40.7128, -74.0060 - New York, NY",
          })
          setIsLocating(false)
        }
      )
    } else {
      onLocationSelect({
        lat: 40.7128,
        lng: -74.006,
        address: "40.7128, -74.0060 - New York, NY",
      })
      setIsLocating(false)
    }
  }

  useEffect(() => {
      // Simulate map loading
      const timer = setTimeout(() => setMapLoaded(true), 500)
      return () => clearTimeout(timer)
    }, [])
  
    return (
      <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif text-xl">
                    <MapPin className="h-5 w-5" />
                    Delivery Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Click on the map to pin your delivery location
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleUseCurrentLocation}
          disabled={isLocating}
          className="gap-2"
        >
          <Navigation className="h-4 w-4" />
          {isLocating ? "Locating..." : "Use My Location"}
        </Button>
      </div>

      <div
        className="relative h-80 w-full cursor-crosshair overflow-hidden rounded-lg border border-border bg-secondary"
        onClick={handleMapClick}
      >
        {!mapLoaded ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted-foreground border-t-transparent" />
          </div>
        ) : (
          <>
            {/* Map background using OpenStreetMap iframe */}
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.05%2C40.68%2C-73.95%2C40.75&layer=mapnik"
              className="pointer-events-none h-full w-full"
              title="Delivery location map"
            />
            
            {/* Pin overlay */}
            {location && (
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full"
                style={{ pointerEvents: "none" }}
              >
                <div className="flex flex-col items-center">
                  <MapPin className="h-10 w-10 fill-accent text-accent drop-shadow-lg" />
                  <div className="mt-1 rounded-full bg-accent/20 px-2 py-0.5">
                    <span className="text-xs font-medium text-accent">Delivery Here</span>
                  </div>
                </div>
              </div>
            )}

            {/* Click instruction overlay */}
            {!location && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 backdrop-blur-[1px]">
                <div className="flex flex-col items-center gap-2 rounded-lg bg-background/90 px-6 py-4 shadow-lg">
                  <MapPin className="h-8 w-8 text-accent" />
                  <p className="text-sm font-medium text-foreground">Click to drop a pin</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {location && (
        <div className="flex items-start gap-3 rounded-lg bg-secondary/50 p-4">
          <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-foreground">Selected Location</p>
            <p className="text-sm text-muted-foreground">{location.address}</p>
            <p className="text-xs text-muted-foreground">
              Coordinates: {location.lat}, {location.lng}
            </p>
          </div>
        </div>
      )}
    </div>
    {errors.location && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.location}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
  )
}

export default DeliveryMap
