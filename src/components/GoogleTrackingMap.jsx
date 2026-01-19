import React, { useState, useEffect, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import './GoogleTrackingMap.css';

const GoogleTrackingMap = () => {
    // Simulated locations (Delhi coordinates)
    const [ambulanceLocation, setAmbulanceLocation] = useState({ lat: 28.6139, lng: 77.2090 });
    const patientLocation = useMemo(() => ({ lat: 28.6358, lng: 77.2295 }), []);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['places', 'geometry'],
    });

    // Memoized options
    const mapOptions = useMemo(() => ({
        disableDefaultUI: true,
        zoomControl: false,
        fullscreenControl: false,
    }), []);

    const containerStyle = useMemo(() => ({
        width: '100%',
        height: '100%',
    }), []);

    const polylineOptions = useMemo(() => ({
        strokeColor: '#2563eb',
        strokeOpacity: 0.8,
        strokeWeight: 4,
        geodesic: true,
    }), []);

    // Memoized marker icons
    const ambulanceMarkerIcon = useMemo(() => ({
        path: window.google?.maps?.SymbolPath?.CIRCLE,
        scale: 8,
        fillColor: '#2563eb',
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 2,
    }), []);

    const patientMarkerIcon = useMemo(() => ({
        path: window.google?.maps?.SymbolPath?.CIRCLE,
        scale: 8,
        fillColor: '#dc2626',
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 2,
    }), []);

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
                options={mapOptions}
            >
                {/* Route line */}
                <Polyline
                    path={[ambulanceLocation, patientLocation]}
                    options={polylineOptions}
                />

                {/* Ambulance marker */}
                <Marker
                    position={ambulanceLocation}
                    title="Ambulance"
                    icon={ambulanceMarkerIcon}
                />

                {/* Patient marker */}
                <Marker
                    position={patientLocation}
                    title="Patient Location"
                    icon={patientMarkerIcon}
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
