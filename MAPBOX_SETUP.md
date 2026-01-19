# Mapbox Integration Setup

## Getting Your Mapbox Access Token

To use Mapbox in your application, you need to get a free access token:

1. Go to [https://account.mapbox.com/](https://account.mapbox.com/)
2. Sign up for a free account (if you don't have one)
3. Navigate to your [Access Tokens page](https://account.mapbox.com/access-tokens/)
4. Copy your default public token (starts with `pk.`)
5. Replace the token in `src/components/TrackingMap.jsx`

## Current Status

The Mapbox integration is complete with:
- ✅ Interactive map with street view
- ✅ Ambulance marker with pulsing animation
- ✅ Patient location marker
- ✅ Dashed route line between ambulance and patient
- ✅ Simulated ambulance movement
- ✅ Smooth animations and transitions

## Note

For demo purposes, the app currently uses a placeholder token. Replace it with your actual Mapbox token for production use.

The free tier includes:
- 50,000 free map loads per month
- Unlimited map views
- Perfect for development and small-scale production
