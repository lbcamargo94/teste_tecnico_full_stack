import { ridesStore } from "@/store/rides";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  MapCameraChangedEvent,
  useMap,
  Pin,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

console.log("StaticMap", GOOGLE_API_KEY);

// const origin = { lat: -23.5505, lng: -46.6333 }; // Exemplo: São Paulo, SP

type Poi = { key: string; location: google.maps.LatLngLiteral };

function StaticMap() {
  const { estimate } = ridesStore();

  const [locations, setLocations] = useState<Poi[]>([]);
  const [defaultCenterMap, setDefaultCenterMap] =
    useState<google.maps.LatLngLiteral>({
      lat: -23.5505,
      lng: -46.6333,
    });
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (estimate) {
      setDefaultCenterMap({
        lat: estimate.origin.latitude,
        lng: estimate.origin.longitude,
      });

      setZoom(12);

      return setLocations([
        {
          key: "origin",
          location: {
            lat: estimate.origin.latitude,
            lng: estimate.origin.longitude,
          },
        },
        {
          key: "destination",
          location: {
            lat: estimate.destination.latitude,
            lng: estimate.destination.longitude,
          },
        },
      ]);
    }

    return;
  }, [estimate]);

  return (
    <APIProvider
      apiKey={GOOGLE_API_KEY}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <div
        id="google-map"
        className="flex flex-col justify-center mx-auto max-h-[300px] w-full p-3 box-border m-2"
      >
        <h1 className="text-md"> Mapa Interativo</h1>
        <Map
          defaultZoom={zoom}
          defaultCenter={defaultCenterMap} // Exemplo: São Paulo, SP
          // onCenterChanged={(event: MapCameraChangedEvent) =>
          //   console.log(
          //     "center changed:",
          //     event.detail.center,
          //     "zoom:",
          //     event.detail.zoom
          //   )
          // }
          mapId="google-map"
          style={{ height: "400px", width: "100%" }}
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log(
              "camera changed:",
              ev.detail.center,
              "zoom:",
              ev.detail.zoom
            )
          }
        >
          <PoiMarkers pois={locations} />
        </Map>
      </div>
    </APIProvider>
  );
}

const PoiMarkers = (props: { pois: Poi[] }) => {
  const map = useMap();
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  const handleClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (!map) return;
      if (!event.latLng) return;
      console.log("marker clicked:", event.latLng.toString());
      map.panTo(event.latLng);
    },
    [map]
  );

  return (
    <>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          clickable={true}
          onClick={handleClick}
        >
          <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};
export { StaticMap };
