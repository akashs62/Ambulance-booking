# Google Maps Integration Setup

## Getting Your Google Maps API Key

Follow these steps to get your Google Maps API key:

### 1. Create a Google Cloud Project
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Click on the project dropdown at the top
- Click "NEW PROJECT"
- Enter a project name (e.g., "Ambulance Booking")
- Click "CREATE"

### 2. Enable Google Maps APIs
- In the Cloud Console, go to "APIs & Services" > "Library"
- Search for and enable these APIs:
  - **Maps JavaScript API**
  - **Maps Embed API** (optional)
  - **Directions API** (optional - for route optimization)
  - **Distance Matrix API** (optional - for ETA calculation)

### 3. Create API Credentials
- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "API Key"
- Copy your API key

### 4. Set Restrictions (Important for Security)
- Select your API key
- Under "Application restrictions", select "HTTP referrers (web sites)"
- Add your domain(s):
  - `http://localhost:5173/*` (for local development)
  - `https://ambulence-ten.vercel.app/*` (for production)
  - Any other domains you'll use

### 5. Configure Environment Variables

**For Local Development:**
Create a `.env.local` file in the project root:
```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

**For Vercel Production:**
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add a new variable:
   - Name: `VITE_GOOGLE_MAPS_API_KEY`
   - Value: Your Google Maps API key
4. Apply to Production environment

### 6. Update Tracking Component (Optional)

To use Google Maps in the Tracking page, update [src/pages/Tracking.jsx](../src/pages/Tracking.jsx):

Replace:
```jsx
import TrackingMap from '../components/TrackingMap';
```

With:
```jsx
import GoogleTrackingMap from '../components/GoogleTrackingMap';
```

Then in the JSX, replace:
```jsx
<TrackingMap />
```

With:
```jsx
<GoogleTrackingMap />
```

## Current Implementation

The app now includes:
- ✅ Google Maps component (`GoogleTrackingMap.jsx`)
- ✅ Real-time ambulance tracking with polyline route
- ✅ Custom ambulance and patient markers
- ✅ Loading state
- ✅ Responsive design

## Features Available

### Currently Implemented
- 🗺️ Interactive map with zoom/pan
- 📍 Ambulance position marker (blue)
- 📍 Patient location marker (red)
- 🛣️ Route polyline between ambulance and patient
- 💫 Real-time ambulance movement simulation

### Easy Additions
- ⏱️ Distance calculation using Distance Matrix API
- ⏰ ETA estimation using Directions API
- 🚗 Traffic layer display
- 📸 Street View for patient location
- 🔄 Route optimization with waypoints

## Pricing

Google Maps API is free for most use cases with the following quotas:
- Maps JavaScript API: 25,000 map loads per 24 hours (free)
- Directions API: 25,000 requests per 24 hours (free)
- Distance Matrix API: 25,000 elements per 24 hours (free)

After exceeding free tier, charges apply ($7 per 1000 requests).

For development and testing, the free tier should be sufficient.

## Troubleshooting

### "API key not valid" error
- Verify your API key is correct in `.env`
- Check that you've enabled the Maps JavaScript API
- Ensure your referrer restrictions match your domain

### Map not loading
- Check browser console for errors
- Verify Google Maps library is loaded: `window.google.maps` should exist
- Test with a simple map to isolate issues

### Billing concerns
- Set billing alerts in Google Cloud Console
- Use API key restrictions to prevent unauthorized use
- Monitor usage in Google Cloud Console

## Resources

- [Google Maps JavaScript API Documentation](https://developers.google.com/maps/documentation/javascript)
- [React Google Maps Documentation](https://react-google-maps-api-docs.netlify.app/)
- [Google Cloud Console](https://console.cloud.google.com/)
