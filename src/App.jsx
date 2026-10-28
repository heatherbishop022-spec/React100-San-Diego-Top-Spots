import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TopSpots from './TopSpots';
import Weather from './Weather';

function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const earthRadius = 3958.8; // Earth's radius in miles

  const latDifference = toRadians(lat2 - lat1);
  const lonDifference = toRadians(lon2 - lon1);

  const a =
    Math.sin(latDifference / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(lonDifference / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

function App() {
  const [topspots, setTopspots] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [userLocation, setUserLocation] = useState(null);
  useEffect(() => {
    console.log("useEffect is running!");
  axios.get('https://ccc.helloworldbox.com/items/top_spots')
    .then(response => setTopspots(response.data.data))
    .catch(error => console.error("API Error:", error));

  }, []);
  function getUserLocation() {
  if (!navigator.geolocation) {
    alert("Your browser does not support geolocation.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
  (position) => {
    setUserLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

    console.log(
      "Visitor coordinates:",
      position.coords.latitude,
      position.coords.longitude
    );
   },
  (error) => {
    console.error("Location error:", error.message);
    alert("Unable to access your location.");
    setSortBy('default');
    }
  );
  }
  let sortedSpots = [...topspots];
  console.log("Sort preference:", sortBy);
  console.log("User location:", userLocation);

if (sortBy === 'distance' && userLocation) {
  sortedSpots.sort((a, b) => {
    const distanceA = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      a.location[0],
      a.location[1]
    );

    const distanceB = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      b.location[0],
      b.location[1]
    );

    return distanceA - distanceB;
  });
}
const spotsWithDistance = sortedSpots.map((spot) => {
  if (sortBy === 'distance' && userLocation) {
    return {
      ...spot,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        spot.location[0],
        spot.location[1]
      )
    };
  }

  return spot;
});

  return (
      <div className="container mt-4">
    <header className="page-header">
      <h1>San Diego Top Spots</h1>
      <p>A list of the top 30 places to see in San Diego, California.</p>
    </header>

    <main className="spots-panel">
      <div className="spots-toolbar">
       <h2>Top Spots</h2>
       <Weather />

      <select
       className="form-select"
       value={sortBy}
       onChange={(event) => {
        const selectedSort = event.target.value;
        setSortBy(selectedSort);
 
         if (selectedSort === 'distance' && !userLocation) {
           getUserLocation();
          }
       }}
       aria-label="Sort top spots"
      >
    <option value="default">Default Order</option>
    <option value="distance">Nearest to Farthest</option>
  </select>
</div>

<TopSpots spots={spotsWithDistance} />
    </main>
  </div>
  );
}

export default App;