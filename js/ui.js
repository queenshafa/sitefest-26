// Navbar
const btn = document.getElementById("hamburger-button");
const menu = document.getElementById("mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    menu.classList.add("hidden");
  }
});

// Render Reports
function renderReports(list = reports) {
  const container = document.getElementById("reportsList");
  if (!container) return;
  container.innerHTML = "";

  list.forEach((report) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="bg-green-50 p-6 rounded-xl flex flex-col gap-2 ">
            <div class="flex flex-row justify-between">
            <h3 class="text-2xl font-bold">${report.title}</h3>
            <div class="text-[#EE8428] text-xs border-2 h-fit border-[#D7CCBA] font-medium bg-[#FDF0DB] rounded-full w-fit px-4 py-2 hover:border-[#EE8428] hover:-translate-y-2 transition-all duration-300">
                ${STATUS_TEXT[report.status]}
            </div>
            </div>
            <span class="text-[#537d63] text-sm">${CATEGORY_TEXT[report.category]}</span>
            <p class="text-[#484848] text-sm">${report.description}</p>
            <div class="text-gray-600 border-t border-b border-l-0 border-r-0 border-2 border-gray-600 py-2 px-2 text-sm mt-2">
            ${report.location}
            </div>
            <div class="flex flex-row gap-2 mt-2">
            <button onclick="openDetailModal('${report.id}')" class="bg-green-primary text-white py-2 px-6 rounded-lg w-full hover:bg-green-700 transition-colors duration-500">
                Detail
            </button>
            <button onclick="deleteReport('${report.id}')" class="bg-red-500 text-white py-2 px-6 rounded-lg w-full">
                Hapus
            </button>
            </div>
        </div>
    `;
    container.appendChild(card);
  });
}

// Update status card
function updateStatus() {
  const statTotal = document.getElementById("stat-total");
  const statPending = document.getElementById("stat-pending");
  const statProgress = document.getElementById("stat-progress");
  const statResolve = document.getElementById("stat-resolve");

  if (statTotal) statTotal.textContent = reports.length;
  if (statPending)
    statPending.textContent = reports.filter(
      (r) => r.status === "pending",
    ).length;
  if (statProgress)
    statProgress.textContent = reports.filter(
      (r) => r.status === "progress",
    ).length;
  if (statResolve)
    statResolve.textContent = reports.filter(
      (r) => r.status === "resolve",
    ).length;
}

const modal = document.getElementById("modalTambah");
const form = document.getElementById("addForm");
const detailModal = document.getElementById("modalDetail");

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

function openDetailModal(reportId) {
  const report = reports.find((r) => r.id === reportId);
  if (!report) return console.error("Report not found:", reportId);

  console.log(report.id);
  document.getElementById("modalDetail").style.display = "flex";
  document.getElementById("detailTitle").textContent = report.title;
  document.getElementById("detailAuthor").textContent = report.name;
  document.getElementById("detailEmail").textContent = report.email;
  document.getElementById("detailDesc").textContent = report.description;
  document.getElementById("detailLocation").textContent = report.location;
  document.getElementById("detailPhone").textContent = report.phone || "-";
  document.getElementById("detailKecamatan").textContent =
    report.kecamatan || "-";
  document.getElementById("detailKelurahan").textContent =
    report.kelurahan || "-";
  document.getElementById("detailKategori").textContent =
    CATEGORY_TEXT[report.category];
  document.getElementById("detailStatus").textContent =
    STATUS_TEXT[report.status];
  document.getElementById("detailDate").textContent = new Date(
    report.createdAt,
  ).toLocaleDateString();

  document.getElementById("modalDetail").style.display = "flex";
}

function closeDetailModal() {
  detailModal.style.display = "none";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addReport();
  closeModal();
});

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderReports();
  updateStatus();
});
