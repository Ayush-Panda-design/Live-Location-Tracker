const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

if (!token) {
  window.location.href = 'login.html';
}

document.getElementById('welcomeMsg').innerText = `Welcome, ${username}`;

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.href = 'login.html';
});

// Initialize Map
const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const markers = {};

// Initialize Socket.io
const socket = io({
  auth: {
    token
  }
});

socket.on('connect_error', (err) => {
  console.error('Socket connection error:', err.message);
  if (err.message === 'Authentication error') {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  }
});

socket.on('connect', () => {
  console.log('Connected to socket server');
  
  // Start watching location
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Emit location
        socket.emit('send-location', { lat: latitude, lng: longitude });

        // Update current user marker
        updateMarker('me', latitude, longitude, 'You');
        map.setView([latitude, longitude], 15);
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Please enable location permission to use this feature.');
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

socket.on('location-update', (data) => {
  if (data.username === username) return; // Don't process our own broadcast if any
  updateMarker(data.userId, data.lat, data.lng, data.username);
});

socket.on('user-disconnected', (data) => {
  if (markers[data.userId]) {
    map.removeLayer(markers[data.userId]);
    delete markers[data.userId];
  }
});

function updateMarker(id, lat, lng, tooltipText) {
  if (markers[id]) {
    markers[id].setLatLng([lat, lng]);
  } else {
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindTooltip(tooltipText, { permanent: true, direction: 'top' });
    markers[id] = marker;
  }
}
