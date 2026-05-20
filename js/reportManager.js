// Menyimpan seluruh data report

function saveReports() {
  localStorage.setItem("reports", JSON.stringify(reports));
}

function addReport() {
  // Variable untuk menyimpan data report
  const report = {
    id: Date.now().toString(),

    title: document.getElementById("judul").value,
    category: document.getElementById("kategori").value,
    description: document.getElementById("deskripsi").value,
    location: document.getElementById("lokasi").value,
    kecamatan: document.getElementById("kecamatan").value,
    kelurahan: document.getElementById("kelurahan").value,
    name: document.getElementById("nama").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("telepon").value,

    status: "pending",
    createdAt: new Date().toISOString(),
    coordinates: null,
  };

  //   Meminta izin lokasi ke device
  if (navigator.geolocation) {
    // Apabila device support untuk fitur GPS
    navigator.geolocation.getCurrentPosition(
      // Jika berhasil mendapatkan
      (pos) => {
        report.coordinates = {
          // Nested object
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        report.location = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        // Menyimpan ke array dan local storage

        reports.unshift(report);
        saveReports();
        closeModal();
        renderReports();
        updateStatus();
        alert("Laporan berhasil ditambahkan!");
      },
      // Jika gagal mendapatkan lokasi

      (err) => {
        console.warn("Gagal ambil lokasi", err.message);
      },
    );
  } else {
    // Apabila device tidak support untuk fitur GPS
    alert("Browser kamu tidak mendukung geolocation");
  }
}

// Menghapus data report berdasarkan id
function deleteReport(id) {
  const yakin = confirm("Yakin mau menghapus laporan ini?");
  if (yakin) {
    reports = reports.filter((report) => report.id !== id);
    saveReports();
    renderReports();
    updateStatus();
  }
}

let editingId = null; // Null artinya sedang tidak mengedit apa pun

function editReport(id) {
  const report = reports.find((r) => r.id === id);
  if (!report) return;

  // isi form dengan data lama
  document.getElementById("judul").value = report.title;
  document.getElementById("kategori").value = report.category;
  document.getElementById("deskripsi").value = report.description;
  document.getElementById("lokasi").value = report.location;
  document.getElementById("kecamatan").value = report.kecamatan;
  document.getElementById("kelurahan").value = report.kelurahan;
  document.getElementById("nama").value = report.name;
  document.getElementById("email").value = report.email;
  document.getElementById("telepon").value = report.phone;

  // Simpan ID yang sedang diedit
  editingId = id;

  document.querySelector("#addForm button[type='submit']").textContent =
    "Simpan Perubahan";

  openModal();
}

// Event listener baru untuk form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Mode edit
  if (editingId) {
    const idx = reports.findIndex((r) => r.id === editingId);
    if (idx !== -1) {
      reports[idx] = {
        ...reports[idx],
        title: document.getElementById("judul").value,
        category: document.getElementById("kategori").value,
        description: document.getElementById("deskripsi").value,
        location: document.getElementById("lokasi").value,
        kecamatan: document.getElementById("kecamatan").value,
        kelurahan: document.getElementById("kelurahan").value,
        name: document.getElementById("nama").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("telepon").value,
      };
    }

    saveReports();
    renderReports();
    updateStatus();
    closeModal();

    alert("Laporan berhasil diperbarui!");

    // Reset ke mode tambah
    editingId = null;
    document.querySelector("#addForm button[type='submit']").textContent =
      "Tambah Laporan";
    form.reset();
  } else {
    // Mode tambah biasa
    addReport();
    form.reset();
  }
});

// Reset form & mode saat modal ditutup
function closeModal() {
  modal.style.display = "none";
  form.reset();
  editingId = null;
  document.querySelector("#addForm button[type='submit']").textContent =
    "Tambah Laporan";
}
