// src/comps/MapView/MapView.tsx
import { useEffect, useRef } from "react";
import maplibregl, { Map } from "maplibre-gl";

interface MapViewProps {
    initialCenter?: [number, number];
    initialZoom?: number;
}

const DEFAULT_CENTER: [number, number] = [-82.4572, 27.9506]; // Tampa, FL
const DEFAULT_ZOOM = 13;

declare global {
    interface Window {
        mapCache: {
            getCachedTile: (url: string) => Promise<string | null>;
            saveTile: (url: string, data: Uint8Array) => Promise<void>;
            cleanupCache: () => Promise<void>;
        };
    }
}

export default function MapView({
    initialCenter = DEFAULT_CENTER,
    initialZoom = DEFAULT_ZOOM,
}: MapViewProps): JSX.Element {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        // Clean old cached tiles via preload bridge
        window.mapCache.cleanupCache().catch(console.error);

        const map: Map = new maplibregl.Map({
            container: mapContainer.current,
            style: "https://api.maptiler.com/maps/streets-v2/style.json?key=K6wriMmtcrd3c7Ta05iz",
            center: initialCenter,
            zoom: initialZoom,
            transformRequest: (url, resourceType) => {
                if (resourceType === "Tile") {
                    return { url };
                }
                return { url };
            },
        });

        mapInstance.current = map;

        map.on("sourcedata", async (e) => {
            const tileUrl = (e as any).tile?.url as string | undefined;
            if (!tileUrl) return;

            try {
                const cached = await window.mapCache.getCachedTile(tileUrl);
                if (!cached) {
                    const res = await fetch(tileUrl);
                    const buf = new Uint8Array(await res.arrayBuffer());
                    await window.mapCache.saveTile(tileUrl, buf);
                }
            } catch (err) {
                console.error("Map tile caching error:", err);
            }
        });

        // Controls
        map.addControl(new maplibregl.NavigationControl(), "top-right");
        map.addControl(
            new maplibregl.GeolocateControl({ trackUserLocation: true })
        );

        return () => map.remove();
    }, [initialCenter, initialZoom]);

    return <div ref={mapContainer} className="absolute top-0 left-0 w-screen h-screen overflow-hidden" />;
}
