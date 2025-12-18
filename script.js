/* Shared JS: dati eventi, render, nav toggle, pagine dinamiche */

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
    descrizione: "Una serata rock con band nazionali e internazionali. Apertura porte ore 19:30.",
    img: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1200&auto=format&fit=crop"
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
    descrizione: "Lineup con DJ internazionali, beach stage e afterparty.",
    img: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?q=80&w=1200&auto=format&fit=crop"
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
    descrizione: "Speaker internazionali sul futuro della tech e dell'AI.",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "evt-4",
    titolo: "Maratona Cittadina",
    categoria: "Sport",
    data: "2025-09-10",
    ora: "08:00",
    luogo: "Torino - Centro città",
    prezzo: 30,
    postiDisponibili: 2000,
    descrizione: "Gara su percorso cittadino aperta a tutti con categorie competitive.",
    img: "https://images.unsplash.com/photo-1520975922284-6c1b3f5e33a2?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "evt-5",
    titolo: "Gala del Cinema Italiano",
    categoria: "Cultura",
    data: "2025-11-05",
    ora: "20:30",
    luogo: "Milano - Teatro Nazionale",
    prezzo: 85,
    postiDisponibili: 800,
    descrizione: "Premiazione e proiezioni speciali con ospiti del cinema italiano.",
    img: "https://images.unsplash.com/photo-1505682634904-d7c0b3f5b4b2?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "evt-6",
    titolo: "Fiera Startup & Innovation",
    categoria: "Business",
    data: "2025-10-12",
    ora: "10:00",
    luogo: "Milano - Fiera Milano Rho",
    prezzo: 20,
    postiDisponibili: 1500,
    descrizione: "Esposizione startup, pitch e networking per investitori e professionisti.",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop"
  }
];

const VIPS = [
  { nome: "Luca Rossi", ruolo: "Conduttore", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop", bio: "Conduttore TV e speaker."},
  { nome: "Giulia Bianchi", ruolo: "Atleta", img: "https://images.unsplash.com/photo-1545996124-8a6f2b8b9e84?q=80&w=800&auto=format&fit=crop", bio: "Campionessa nazionale."},
  { nome: "Marco Velluto", ruolo: "Regista", img: "https://images.unsplash.com/photo-1531123414780-f5b0a8f2c6f9?q=80&w=800&auto=format&fit=crop", bio: "Regista e produttore con diversi premi."},
  { nome: "Sara Verdi", ruolo: "Imprenditrice", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop", bio: "Fondatrice di una nota startup tech."},
  { nome: "Paolo Neri", ruolo: "Chef", img: "https://images.unsplash.com/photo-1523475496153-3d6cc4ad9b8b?q=80&w=800&auto=format&fit=crop", bio: "Chef stellato ospite per cene evento."}
];

/* NAV TOGGLE */
function initNavToggle() {
  const btns = document.querySelectorAll('.nav-toggle');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const header = btn.closest('.header-inner');
      const nav = header.querySelector('.main-nav');
      const isOpen = nav.getAttribute('aria-expanded') === 'true';
      nav.setAttribute('aria-expanded', (!isOpen).toString());
    });
  });
}

/* Render card */
function createEventCard(evt) {
  const card = document.createElement('article');
  card.className = 'event-card card';
  card.innerHTML = `
    <img src="${evt.img}" alt="${evt.titolo}" style="width:100%;height:150px;object-fit:cover;border-radius:8px;margin-bottom:.6rem">
    <h3>${evt.titolo}</h3>
    <p>${evt.data} — ${evt.luogo}</p>
    <p>${evt.descrizione.substring(0,120)}${evt.descrizione.length>120?'…':''}</p>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:.6rem">
      <a href="evento.html?id=${encodeURIComponent(evt.id)}" class="btn-outline">Dettagli</a>
      <button class="btn" onclick="selectEventAndGo('${evt.id}')">Prenota</button>
    </div>
  `;
  return card;
}

function renderFeatured() {
  const container = document.getElementById('featuredCards');
  if(!container) return;
  container.innerHTML = '';
  const featured = EVENTS.slice(0,3);
  featured.forEach(e => container.appendChild(createEventCard(e)));
}

/* Events page */
function initEventsPage(){
  initNavToggle();

  const grid = document.getElementById('eventsGrid');
  const catSelect = document.getElementById('categoriaFilter');
  const search = document.getElementById('searchInput');
  const dateFilter = document.getElementById('dataFilter');

  const cats = Array.from(new Set(EVENTS.map(e => e.categoria)));
  cats.forEach(c => {
    const opt = document.createElement('option'); opt.value = c; opt.textContent = c;
    catSelect.appendChild(opt);
  });

  function render(list){
    grid.innerHTML = '';
    if(list.length === 0) {
      grid.innerHTML = '<p>Nessun evento trovato.</p>';
      return;
    }
    list.forEach(e => grid.appendChild(createEventCard(e)));
  }

  render(EVENTS);

  function applyFilters(){
    const q = search.value.trim().toLowerCase();
    const cat = catSelect.value;
    const d = dateFilter.value;
    let filtered = EVENTS.filter(e => {
      let ok = true;
      if(q) ok = (e.titolo + ' ' + e.luogo).toLowerCase().includes(q);
      if(ok && cat) ok = e.categoria === cat;
      if(ok && d) ok = e.data === d;
      return ok;
    });
    render(filtered);
  }

  search.addEventListener('input', applyFilters);
  catSelect.addEventListener('change', applyFilters);
  dateFilter.addEventListener('change', applyFilters);
}

/* Select event and go to booking */
function selectEventAndGo(id){
  const ev = EVENTS.find(x => x.id === id);
  if(!ev) return;
  localStorage.setItem('selectedEvent', JSON.stringify(ev));
  window.location.href = 'prenotazione.html';
}

/* Event detail */
function renderEventDetail(){
  initNavToggle();
  const container = document.getElementById('eventDetailContainer');
  if(!container) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || (JSON.parse(localStorage.getItem('selectedEvent')||'null') || {}).id;
  const ev = EVENTS.find(x => x.id === id);
  if(!ev) {
    container.innerHTML = '<p>Evento non trovato. Torna a <a href="eventi.html">tutti gli eventi</a>.</p>';
    return;
  }
  container.innerHTML = `
    <div class="card" style="display:grid;grid-template-columns:1fr;gap:1rem">
      <img src="${ev.img}" alt="${ev.titolo}" style="width:100%;height:320px;object-fit:cover;border-radius:8px">
      <div>
        <h1>${ev.titolo}</h1>
        <p><strong>Categoria:</strong> ${ev.categoria}</p>
        <p><strong>Data / Ora:</strong> ${ev.data} — ${ev.ora}</p>
        <p><strong>Luogo:</strong> ${ev.luogo}</p>
        <p><strong>Prezzo:</strong> €${ev.prezzo}</p>
        <p>${ev.descrizione}</p>
        <div style="margin-top:1rem;display:flex;gap:.6rem;flex-wrap:wrap">
          <button class="btn" onclick="selectEventAndGo('${ev.id}')">Prenota</button>
          <a class="btn-outline" href="eventi.html">Torna agli eventi</a>
        </div>
      </div>
    </div>
  `;
}

/* Booking page */
function initBookingPage(){
  initNavToggle();
  const box = document.getElementById('selectedEventBox');
  const form = document.getElementById('bookingForm');
  const msg = document.getElementById('bookingMessage');

  const selected = JSON.parse(localStorage.getItem('selectedEvent') || 'null');
  if(!selected){
    box.innerHTML = '<p>Nessun evento selezionato. Torna a <a href="eventi.html">Eventi</a>.</p>';
    form.style.display = 'none';
    return;
  }
  box.innerHTML = `
    <div class="card">
      <h3>${selected.titolo}</h3>
      <p>${selected.data} — ${selected.ora} | ${selected.luogo}</p>
      <p>Prezzo: €${selected.prezzo} — Posti disponibili: ${selected.postiDisponibili}</p>
    </div>
  `;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const nome = document.getElementById('bookName').value.trim();
    const email = document.getElementById('bookEmail').value.trim();
    const tel = document.getElementById('bookPhone').value.trim();
    const qty = parseInt(document.getElementById('bookQty').value,10) || 1;

    if(qty > selected.postiDisponibili){
      msg.textContent = 'Numero di posti richiesti superiore alla disponibilità.';
      msg.style.color = 'crimson';
      return;
    }

    const prenotazione = {
      id: 'bk-' + Date.now(),
      eventoId: selected.id,
      titolo: selected.titolo,
      nome, email, tel, qty,
      dataPrenotazione: new Date().toISOString()
    };

    const all = JSON.parse(localStorage.getItem('bookings') || '[]');
    all.push(prenotazione);
    localStorage.setItem('bookings', JSON.stringify(all));

    const evIdx = EVENTS.findIndex(x => x.id === selected.id);
    if(evIdx >= 0) EVENTS[evIdx].postiDisponibili -= qty;

    let testo = `RIEPILOGO PRENOTAZIONE\n\nEvento: ${prenotazione.titolo}\nNome: ${prenotazione.nome}\nEmail: ${prenotazione.email}\nTelefono: ${prenotazione.tel}\nQuantità: ${prenotazione.qty}\nData invio: ${new Date().toLocaleString()}\n`;
    const blob = new Blob([testo], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `prenotazione_${prenotazione.id}.txt`;
    a.click();

    msg.textContent = 'Prenotazione confermata! Controlla il file scaricato — lo trovi anche in "Bookings" su localStorage.';
    msg.style.color = 'green';
    form.reset();
  });
}

/* VIP render */
function renderVIPs(){
  initNavToggle();
  const grid = document.getElementById('vipGrid');
  if(!grid) return;
  grid.innerHTML = '';
  VIPS.forEach(v => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <img src="${v.img}" alt="${v.nome}" style="width:100%;height:200px;object-fit:cover;border-radius:8px;margin-bottom:.6rem">
      <h3>${v.nome}</h3>
      <p style="color:var(--muted)">${v.ruolo}</p>
      <p>${v.bio}</p>
    `;
    grid.appendChild(el);
  });
}

/* Auto init home featured */
document.addEventListener('DOMContentLoaded', function(){
  initNavToggle();
  renderFeatured();
});

/* Expose functions to pages */
window.initEventsPage = initEventsPage;
window.selectEventAndGo = selectEventAndGo;
window.renderEventDetail = renderEventDetail;
window.initBookingPage = initBookingPage;
window.renderVIPs = renderVIPs;
