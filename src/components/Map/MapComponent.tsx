"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

// @ts-ignore
mapboxgl.workerClass = () => new Worker(new URL("mapbox-gl/dist/worker", import.meta.url));

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [lng, setLng] = useState(-74.5);
  const [lat, setLat] = useState(40);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (!mapContainer.current || !process.env.NEXT_PUBLIC_MAPBOX_TOKEN) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng);
      setLat(map.getCenter().lat);
      setZoom(map.getZoom());
    });

    return () => map.remove();
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainer} className="h-full w-full" />
      <div className="absolute top-4 left-4 bg-white p-2 rounded shadow">
        <p>Longitud: {lng.toFixed(4)}</p>
        <p>Latitud: {lat.toFixed(4)}</p>
        <p>Zoom: {zoom.toFixed(2)}</p>
      </div>
    </div>
  );
}