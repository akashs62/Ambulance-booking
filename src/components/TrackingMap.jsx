import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './TrackingMap.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom ambulance icon
const ambulanceIcon = new L.DivIcon({
    className: 'custom-ambulance-icon',
    html: `
        <div class="ambulance-marker-leaflet">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
            </svg>
        </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
});

// Custom patient icon
const patientIcon = new L.DivIcon({
    className: 'custom-patient-icon',
    html: `
        <div class="patient-marker-leaflet">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#dc2626" stroke="#dc2626" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
        </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

// Component to update map view when ambulance moves
function MapUpdater({ center }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

const TrackingMap = () => {
    // Simulated locations (Delhi coordinates)
    const [ambulanceLocation, setAmbulanceLocation] = useState([28.6139, 77.2090]);
    const patientLocation = [28.6358, 77.2295];
    const mapCenter = [28.6249, 77.2190];

    // Simulate ambulance movement
    useEffect(() => {
        const interval = setInterval(() => {
            setAmbulanceLocation(prev => {
                const newLat = prev[0] + (Math.random() - 0.5) * 0.001;
                const newLng = prev[1] + (Math.random() - 0.5) * 0.001;
                return [newLat, newLng];
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Route line coordinates
    const routeLine = [ambulanceLocation, patientLocation];

    return (
        <div className="leaflet-map-container">
            <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* Route line */}
                <Polyline
                    positions={routeLine}
                    color="#2563eb"
                    weight={4}
                    dashArray="10, 10"
                    opacity={0.8}
                />

                {/* Ambulance marker */}
                <Marker position={ambulanceLocation} icon={ambulanceIcon} />

                {/* Patient marker */}
                <Marker position={patientLocation} icon={patientIcon} />

                {/* Update map center as ambulance moves */}
                <MapUpdater center={ambulanceLocation} />
            </MapContainer>

            {/* OpenStreetMap badge */}
            <motion.div
                className="map-integration-note"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <span>🗺️ Live OpenStreetMap</span>
                <span className="map-note-sub">Real-time tracking enabled</span>
            </motion.div>
        </div>
    );
};

export default TrackingMap;
