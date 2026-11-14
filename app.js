const BOOKS = [
  { id: 1,  title: "The Quiet Ocean",              author: "Mara Ellison",    genre: "Fiction",   available: true,  added: "2024-09-02" },
  { id: 2,  title: "Salt and Stone",               author: "Peter Vance",     genre: "Fiction",   available: false, added: "2024-08-19" },
  { id: 3,  title: "A Map of Small Things",        author: "Ines Duarte",     genre: "Fiction",   available: true,  added: "2024-07-11" },
  { id: 4,  title: "The Last Lighthouse",          author: "Mara Ellison",    genre: "Fiction",   available: true,  added: "2024-06-28" },
  { id: 5,  title: "Paper Boats",                  author: "Tomas Reyes",     genre: "Fiction",   available: false, added: "2024-05-30" },
  { id: 6,  title: "Winter Orchard",               author: "Hana Kobayashi",  genre: "Fiction",   available: true,  added: "2024-05-02" },
  { id: 7,  title: "The Cartographer's Wife",      author: "Peter Vance",     genre: "Fiction",   available: true,  added: "2024-04-14" },
  { id: 8,  title: "Atoms for Beginners",          author: "Dr. Lena Fischer", genre: "Science",  available: true,  added: "2024-09-12" },
  { id: 9,  title: "The Ocean Between Us",         author: "Carlos Mendes",   genre: "Science",   available: false, added: "2024-08-01" },
  { id: 10, title: "Stargazing 101",               author: "Aisha Rahman",    genre: "Science",   available: true,  added: "2024-07-20" },
  { id: 11, title: "How Plants Think",             author: "Dr. Lena Fischer", genre: "Science",  available: true,  added: "2024-06-10" },
  { id: 12, title: "The Weather Machine",          author: "Carlos Mendes",   genre: "Science",   available: true,  added: "2024-05-18" },
  { id: 13, title: "A Short History of Roads",     author: "Elliot Grant",    genre: "History",   available: true,  added: "2024-09-20" },
  { id: 14, title: "Empires of Salt",              author: "Priya Nair",      genre: "History",   available: false, added: "2024-08-08" },
  { id: 15, title: "The Year Without Summer",      author: "Elliot Grant",    genre: "History",   available: true,  added: "2024-07-03" },
  { id: 16, title: "Letters from the Front",       author: "Priya Nair",      genre: "History",   available: true,  added: "2024-06-15" },
  { id: 17, title: "Ancient Rivers",               author: "Samuel Okonkwo",  genre: "History",   available: true,  added: "2024-05-25" },
  { id: 18, title: "The Dictionary of Lost Words", author: "Nora Wells",      genre: "Reference", available: true,  added: "2024-09-28" },
  { id: 19, title: "World Atlas for Students",     author: "Nora Wells",      genre: "Reference", available: false, added: "2024-08-30" },
  { id: 20, title: "Grammar Without Tears",        author: "Simon Park",      genre: "Reference", available: true,  added: "2024-07-15" },
  { id: 21, title: "The Study Skills Handbook",    author: "Simon Park",      genre: "Reference", available: true,  added: "2024-06-22" },
  { id: 22, title: "Rain on the Window",           author: "Lucia Ferraro",   genre: "Poetry",    available: true,  added: "2024-10-04" },
  { id: 23, title: "Small Hours",                  author: "Lucia Ferraro",   genre: "Poetry",    available: false, added: "2024-09-15" },
  { id: 24, title: "The Colour of Morning",        author: "Hana Kobayashi",  genre: "Poetry",    available: true,  added: "2024-10-10" }
];

const PAGE_SIZE = 10;

const COVER_COLORS = {
  Fiction:   ["#1f4d3d", "#274b6b", "#5a3a2e", "#3a2f5a", "#6b2f3a"],
  Science:   ["#1d5a6b", "#2b4c7e", "#1f6b57", "#3d4f6b", "#2a5a4a"],
  History:   ["#6b4a1f", "#5a3a2e", "#7a3d2b", "#4a3b2a", "#5f4a35"],
  Reference: ["#3a3a4a", "#2f3a4a", "#4a3a3a", "#334052", "#3f3848"],
  Poetry:    ["#6b2f5a", "#4a2a5a", "#7a3a6a", "#5a2f4a", "#3d2450"]
};

function coverStyle(book) {
  const palette = COVER_COLORS[book.genre] || ["#333"];
  const color = palette[book.id % palette.length];
  return "background:" + color + ";";
}

// ---------- Shared card builder ----------
function buildCard(b) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML =
    '<div class="cover" style="' + coverStyle(b) + '">' +
      '<span class="cover-genre"></span>' +
      '<div>' +
        '<p class="cover-title"></p>' +
        '<p class="cover-author"></p>' +
      '</div>' +
    '</div>' +
    '<div class="card-body">' +
      '<p class="card-author"></p>' +
      '<div class="card-foot">' +
        '<span class="badge ' + (b.available ? "yes" : "no") + '">' +
          (b.available ? "Available" : "Borrowed") +
        '</span>' +
        '<span class="card-id">#' + String(b.id).padStart(3, "0") + '</span>' +
      '</div>' +
    '</div>';
    
  card.querySelector(".cover-genre").textContent = b.genre;
  card.querySelector(".cover-title").textContent = b.title;
  card.querySelector(".cover-author").textContent = b.author;
  card.querySelector(".card-author").textContent = "by " + b.author;
  return card;
}

// ---------- Navigation ----------
const views = {
  catalogue: document.getElementById("view-catalogue"),
  new: document.getElementById("view-new"),
  hours: document.getElementById("view-hours")
};

function showView(name) {
  Object.keys(views).forEach(k => { views[k].hidden = (k !== name); });
  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("active", a.dataset.view === name);
  });
  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-view]").forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    showView(el.dataset.view);
  });
});

// ---------- New arrivals ----------
function renderNewArrivals() {
  const grid = document.getElementById("newGrid");
  const latest = [...BOOKS]
    .sort((a, b) => b.added.localeCompare(a.added))
    .slice(0, 6);
  grid.innerHTML = "";
  latest.forEach(b => grid.appendChild(buildCard(b)));
}

// ---------- Catalogue filters ----------
const searchEl    = document.getElementById("search");
const availEl     = document.getElementById("availableOnly");
const clearBtn    = document.getElementById("clear");
const resetBtn    = document.getElementById("reset");
const countEl     = document.getElementById("count");
const gridEl      = document.getElementById("grid");
const emptyEl     = document.getElementById("empty");
const pagerEl     = document.getElementById("pager");
const prevBtn     = document.getElementById("prev");
const nextBtn     = document.getElementById("next");
const pageLabel   = document.getElementById("pageLabel");
const genreListEl = document.getElementById("genreList");

let currentGenre = "All";
let page = 1;

const genres = ["All", ...[...new Set(BOOKS.map(b => b.genre))].sort()];
genres.forEach(g => {
  const btn = document.createElement("button");
  btn.className = "chip" + (g === "All" ? " active" : "");
  btn.textContent = g;
  btn.addEventListener("click", () => {
    currentGenre = g;
    page = 1;
    genreListEl.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    renderCatalogue();
  });
  genreListEl.appendChild(btn);
});

function getFiltered() {
  const q = searchEl.value.trim().toLowerCase();
  const onlyAvail = availEl.checked;
  return BOOKS.filter(b => {
    const matchesQuery = !q ||
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q);
    const matchesGenre = currentGenre === "All" || b.genre === currentGenre;
    const matchesAvail = !onlyAvail || b.available;
    return matchesQuery && matchesGenre && matchesAvail;
  });
}

function renderCatalogue() {
  const filtered = getFiltered();
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if (page > totalPages) page = totalPages;

  const start = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  countEl.textContent = filtered.length + (filtered.length === 1 ? " book" : " books");

  gridEl.innerHTML = "";
  visible.forEach(b => gridEl.appendChild(buildCard(b)));

  emptyEl.hidden = visible.length !== 0;
  pagerEl.hidden = totalPages <= 1;
  pageLabel.textContent = "Page " + page + " of " + totalPages;
  prevBtn.disabled = page <= 1;
  nextBtn.disabled = page >= totalPages;
}

function resetFilters() {
  searchEl.value = "";
  availEl.checked = false;
  currentGenre = "All";
  page = 1;
  genreListEl.querySelectorAll(".chip").forEach(c => {
    c.classList.toggle("active", c.textContent === "All");
  });
  renderCatalogue();
}

searchEl.addEventListener("input", () => { page = 1; renderCatalogue(); });
availEl.addEventListener("change", () => { page = 1; renderCatalogue(); });
clearBtn.addEventListener("click", resetFilters);
resetBtn.addEventListener("click", resetFilters);
prevBtn.addEventListener("click", () => { page--; renderCatalogue(); });
nextBtn.addEventListener("click", () => { page++; renderCatalogue(); });

// ---------- Boot ----------
renderCatalogue();
renderNewArrivals();
showView("catalogue");