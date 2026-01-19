import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import './GoogleTrackingMap.css';

const GoogleTrackingMap = () => {
    // Simulated locations (Delhi coordinates)
    const [ambulanceLocation, setAmbulanceLocation] = useState({ lat: 28.6139, lng: 77.2090 });
    const patientLocation = { lat: 28.6358, lng: 77.2295 };
    const mapCenter = { lat: 28.6249, lng: 77.2190 };

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['places', 'geometry'],
    });

    // Simulate ambulance movement
    useEffect(() => {
        const interval = setInterval(() => {
            setAmbulanceLocation(prev => {
                const newLat = prev.lat + (Math.random() - 0.5) * 0.001;
                const newLng = prev.lng + (Math.random() - 0.5) * 0.001;
                return { lat: newLat, lng: newLng };
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const containerStyle = {
        width: '100%',
        height: '100%',
    };

    const options = {
        disableDefaultUI: true,
        zoomControl: false,
        fullscreenControl: false,
    };

    if (!isLoaded) {
        return (
            <div className="map-loading">
                <div className="spinner"></div>
                <p>Loading map...</p>
            </div>
        );
    }

    return (
        <div className="google-tracking-map">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={ambulanceLocation}
                zoom={13}
                options={options}
            >
                {/* Route line */}
                <Polyline
                    path={[ambulanceLocation, patientLocation]}
                    options={{
                        strokeColor: '#2563eb',
                        strokeOpacity: 0.8,
                        strokeWeight: 4,
                        geodesic: true,
                    }}
                />

                {/* Ambulance marker */}
                <Marker
                    position={ambulanceLocation}
                    title="Ambulance"
                    icon={{
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: '#2563eb',
                        fillOpacity: 1,
                        strokeColor: '#fff',
                        strokeWeight: 2,
                    }}
                />

                {/* Patient marker */}
                <Marker
                    position={patientLocation}
                    title="Patient Location"
                    icon={{
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: '#dc2626',
                        fillOpacity: 1,
                        strokeColor: '#fff',
                        strokeWeight: 2,
                    }}
                />
            </GoogleMap>

            {/* Google Maps badge */}
            <motion.div
                className="map-badge"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <span>🗺️ Google Maps</span>
                <span className="badge-sub">Real-time tracking enabled</span>
            </motion.div>
        </div>
    );
};

export default GoogleTrackingMap;
