/* Shared JS: dati eventi, render, nav toggle, pagine dinamiche */
/* ======================================================
   DATI
====================================================== */

const EVENTS = [
  {
    id: "evt-1",
    titolo: "Concerto Rock Night",
    categoria: "Musica",
    data: "2025-06-15",
    ora: "21:00",
    luogo: "Milano - Forum Assago",
    prezzo: 45,
    postiDisponibili: 500,
    descrizione: "Una serata rock con band nazionali e internazionali.",
    img: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1200"
  },
  {
    id: "evt-2",
    titolo: "Festival Elettronica Summer",
    categoria: "Musica",
    data: "2025-07-02",
    ora: "18:00",
    luogo: "Rimini Beach Arena",
    prezzo: 60,
    postiDisponibili: 1200,
    descrizione: "DJ internazionali, beach stage e afterparty.",
    img: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?q=80&w=1200"
  },
  {
    id: "evt-3",
    titolo: "Conferenza Digital Future",
    categoria: "Conferenza",
    data: "2025-05-20",
    ora: "09:30",
    luogo: "Roma - Centro Congressi",
    prezzo: 120,
    postiDisponibili: 300,
    descrizione: "Speaker internazionali sul futuro della tecnologia.",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200"
  }
];

const VIPS = [
  {
    nome: "Giulia Bianchi",
    ruolo: "Atleta",
    img: "https://images.unsplash.com/photo-1545996124-8a6f2b8b9e84?q=80&w=800",
    bio: "Campionessa nazionale di atletica."
  },
  {
    nome: "Marco Velluto",
    ruolo: "Regista",
    img: "https://images.unsplash.com/photo-1531123414780-f5b0a8f2c6f9?q=80&w=800",
    bio: "Regista premiato a livello internazionale."
  }
];

/* ======================================================
   NAV
====================================================== */

function initNavToggle() {
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = btn.closest('.header-inner').querySelector('.main-nav');
      const open = nav.getAttribute('aria-expanded') === 'true';
      nav.setAttribute('aria-expanded', String(!open));
    });
  });
}

/* ======================================================
   CARD EVENTO
====================================================== */

function createEventCard(evt) {
  const card = document.createElement('article');
  card.className = 'card event-card';
  card.innerHTML = `
    <img src="${evt.img}" alt="${evt.titolo}">
    <h3>${evt.titolo}</h3>
    <p>${evt.data} — ${evt.luogo}</p>
    <p>${evt.descrizione}</p>
    <div class="card-actions">
      <a class="btn-outline" href="evento.html?id=${evt.id}">Dettagli</a>
      <button class="btn" onclick="selectEvent('${evt.id}')">Prenota</button>
    </div>
  `;
  return card;
}

/* ======================================================
   HOME
====================================================== */

function initHomePage() {
  initNavToggle();
  const box = document.getElementById('featuredCards');
  if (!box) return;
  EVENTS.slice(0, 3).forEach(e => box.appendChild(createEventCard(e)));
}

/* ======================================================
   EVENTI
====================================================== */

function initEventsPage() {
  initNavToggle();

  const grid = document.getElementById('eventsGrid');
  const search = document.getElementById('searchInput');
  const cat = document.getElementById('categoriaFilter');
  const date = document.getElementById('dataFilter');

  if (!grid) return;

  [...new Set(EVENTS.map(e => e.categoria))].forEach(c => {
    const o = document.createElement('option');
    o.value = c;
    o.textContent = c;
    cat.appendChild(o);
  });

  function render(list) {
    grid.innerHTML = '';
    list.forEach(e => grid.appendChild(createEventCard(e)));
  }

  function filter() {
    const q = search.value.toLowerCase();
    const c = cat.value;
    const d = date.value;

    render(EVENTS.filter(e =>
      (!q || (e.titolo + e.luogo).toLowerCase().includes(q)) &&
      (!c || e.categoria === c) &&
      (!d || e.data === d)
    ));
  }

  render(EVENTS);
  search.addEventListener('input', filter);
  cat.addEventListener('change', filter);
  date.addEventListener('change', filter);
}

/* ======================================================
   DETTAGLIO EVENTO
====================================================== */

function renderEventDetail() {
  initNavToggle();
  const box = document.getElementById('eventDetailContainer');
  if (!box) return;

  const id = new URLSearchParams(location.search).get('id');
  const ev = EVENTS.find(e => e.id === id);

  if (!ev) {
    box.innerHTML = '<p>Evento non trovato.</p>';
    return;
  }

  box.innerHTML = `
    <div class="card">
      <img src="${ev.img}">
      <h1>${ev.titolo}</h1>
      <p><strong>Categoria:</strong> ${ev.categoria}</p>
      <p><strong>Data:</strong> ${ev.data} ${ev.ora}</p>
      <p><strong>Luogo:</strong> ${ev.luogo}</p>
      <p>${ev.descrizione}</p>
      <button class="btn" onclick="selectEvent('${ev.id}')">Prenota</button>
    </div>
  `;
}

/* ======================================================
   PRENOTAZIONE
====================================================== */

function selectEvent(id) {
  localStorage.setItem('selectedEvent', id);
  window.location.href = 'prenotazione.html';
}

function initBookingPage() {
  initNavToggle();

  const id = localStorage.getItem('selectedEvent');
  const ev = EVENTS.find(e => e.id === id);
  const box = document.getElementById('selectedEventBox');
  const form = document.getElementById('bookingForm');
  const msg = document.getElementById('bookingMessage');

  if (!ev) {
    box.innerHTML = '<p>Nessun evento selezionato.</p>';
    form.style.display = 'none';
    return;
  }

  box.innerHTML = `<h3>${ev.titolo}</h3><p>${ev.data} — ${ev.luogo}</p>`;

  form.addEventListener('submit', e => {
    e.preventDefault();
    msg.textContent = 'Prenotazione confermata!';
    msg.style.color = 'green';
    form.reset();
  });
}

/* ======================================================
   VIP
====================================================== */

function renderVIPs() {
  initNavToggle();
  const grid = document.getElementById('vipGrid');
  if (!grid) return;

  VIPS.forEach(v => {
    const c = document.createElement('div');
    c.className = 'card';
    c.innerHTML = `
      <img src="${v.img}">
      <h3>${v.nome}</h3>
      <p>${v.ruolo}</p>
      <p>${v.bio}</p>
    `;
    grid.appendChild(c);
  });
}

/* ======================================================
   EXPORT
====================================================== */

window.initHomePage = initHomePage;
window.initEventsPage = initEventsPage;
window.renderEventDetail = renderEventDetail;
window.initBookingPage = initBookingPage;
window.renderVIPs = renderVIPs;
