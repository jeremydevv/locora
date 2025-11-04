// src/comps/MapView/MapView.tsx
import { useEffect, useRef } from "react";
import maplibregl, { Map } from "maplibre-gl";

const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

interface Props {
    initialCenter?: [number, number];
    initialZoom?: number;
}

const DefaultCenter: [number, number] = [-82.4572, 27.9506]; 
const DefaultZoom = 13;

export default function MapView({ initialCenter = DefaultCenter, initialZoom = DefaultZoom }: Props) {
    const mapContainer = useRef<HTMLDivElement | null>(null)
    const mapInstance = useRef<Map | null>(null)

    // init render
    useEffect(() => {
        if (!mapContainer.current) return

        const map: Map = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v4/style.json?key=${MAPTILER_KEY}`,
            center: initialCenter,
            zoom: initialZoom,
        })

        mapInstance.current = map

        return () => map.remove()
    }, [initialCenter, initialZoom])

    return <div ref={mapContainer} className="absolute w-screen h-screen overflow-y-hidden overflow-hidden" />
}
