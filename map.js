/**Map terdiri dari 2 layer
 * - Layer dasar (base layer) : peta dasar
 * - Layer marker : marker pada koordinat tertentu
 */

let map;
let markerLayer = []; //layer untuk menampung marker

// inisialisasi map (menampilkan Map)
function initMap() {
  map = L.map("map").setView([-6.2, 106.84], 13); //titik awal peta saat halaman dimuat (jakarta) dan zoom level

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  renderMapMarkers(); //memanggil fungsi untuk menampilkan marker pada peta
}

// menambahkan marker ke peta berdasarkan laporan
function renderMapMarkers() {
  if (!map) return; //memastikan map sudah diinisialisasi kalo gaada dia bakal return

  reports.forEach((r) => {
    const marker = L.marker([r.coordinates.lat, r.coordinates.long])
      .addTo(map)
      .bindPopup(`<b>${r.title}</b> <br/>${r.location}<br/>Status: ${STATUS_TEXT[r.status]}`)
      .openPopup();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMap();
});
