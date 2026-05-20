let map;
let marker = [];

// initialize map (showing map)
function initMap() {
  map = L.map("map").setView([-6.2, 106.8], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  setTimeout(() => {
    map.invalidateSize();
    renderMapMarker();
  }, 100);
}

// Add marker
function renderMapMarker() {
  if (!map || !Array.isArray(reports)) return;

  reports.forEach((r) => {
    if (r.coordinates && r.coordinates.lat && r.coordinates.lng) {
      L.marker([r.coordinates.lat, r.coordinates.lng])
        .addTo(map)
        .bindPopup(`<b>${r.title}</b><br>${r.location}`);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMap();
  renderReports();
});
