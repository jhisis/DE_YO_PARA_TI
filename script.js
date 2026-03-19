---- Configuración personalizable -----
const LETTER_PARAGRAPHS = [
  "Gracias por ser como eres.",
  "Gracias por acompañarme incluso en la distancia.",
  "Este regalo es pequeño y quizá sin valor alguno, pero lo hice con todo mi amor 💙"
];

// Rutas de tus fotos (ponlas dentro de /assets)
const PHOTOS = [
  { src: "assets/1.jpeg", caption: "¿Crees que se me iba a olvidar que me dedicaste esta luna?" },
  { src: "assets/2.jpeg", caption: "Una de mis favoritas, de las primeras cuando iniciamos" },
  { src: "assets/3.jpeg", caption: "Esta me encanta JAJAJA. Jamás pensé lo de esa noche; si lo pensamos, es una locura." },
  { src: "assets/4.jpeg", caption: "LA FOTO HABLA POR SÍ SOLA" },
  { src: "assets/5.jpeg", caption: "Ayyy, ¿esta fue en una de tus citas favoritas?" },
  { src: "assets/6.jpeg", caption: "Esta fue casi antes de terminar, creo jeje" },
  { src: "assets/7.jpeg", caption: "Gracias a Dios hemos cambiado un poco JAJA" },
  { src: "assets/8.jpeg", caption: "Obviamente mi moto es más bonita" }
];

// ----- Utilidades de render -----
function renderLetter(paragraphs) {
  const container = document.getElementById("letterContent");
  if (!container) return;
  container.innerHTML = "";
  paragraphs.forEach(p => {
    const el = document.createElement("p");
    el.textContent = p;
    container.appendChild(el);
  });
}

function renderGallery(items) {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const rotations = [-2, -1, 0, 1.5, 2.5];

  items.forEach((it, idx) => {
    const frame = document.createElement("figure");
    frame.className = "polaroid";
    frame.style.setProperty("--rot", rotations[idx % rotations.length] + "deg");

    const img = document.createElement("img");
    img.src = it.src;
    img.alt = it.caption || "Foto";
    img.loading = "lazy";
    img.addEventListener("click", () => openLightbox(it.src));

    const cap = document.createElement("figcaption");
    cap.className = "caption";
    cap.textContent = it.caption || "";

    frame.appendChild(img);
    frame.appendChild(cap);
    grid.appendChild(frame);
  });
}

// Lightbox
function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  if (!lb || !img) return;
  img.src = src;
  lb.classList.remove("hidden");
}
function closeLightbox() {
  const lb = document.getElementById("lightbox");
  if (lb) lb.classList.add("hidden");
}
const lbEl = document.getElementById("lightbox");
if (lbEl) lbEl.addEventListener("click", closeLightbox);

// ----- Transiciones y secuencia de entrada -----
const hero = document.getElementById("hero");
const letter = document.getElementById("letter");
const music = document.getElementById("music");
const gallery = document.getElementById("gallery");
const overlay = document.getElementById("entryOverlay");

// Para aparición en cascada
const mainEl = document.querySelector("main");
if (mainEl) mainEl.classList.add("reveal-seq");

// Botón principal (único listener)
document.getElementById("openLetterBtn").addEventListener("click", () => {
  // Crossfade de portada
  hero.classList.add("fade-out");
  void hero.offsetWidth; // forzar reflow
  hero.classList.add("fade-out-active");

  // Mostrar overlay
  overlay.classList.remove("hidden");

  // Luego de un breve momento, ocultamos portada y mostramos secciones
  setTimeout(() => {
    hero.classList.add("hidden");

    // Mostrar secciones
    letter.classList.remove("hidden");
    music.classList.remove("hidden");
    gallery.classList.remove("hidden");

    // Render contenido dinámico
    renderLetter(LETTER_PARAGRAPHS);
    renderGallery(PHOTOS);

    // Fade-in suave para cada sección
    [letter, music, gallery].forEach(sec => {
      sec.classList.add("fade-enter");
      void sec.offsetWidth;
      sec.classList.add("fade-enter-active");
      setTimeout(() => sec.classList.remove("fade-enter", "fade-enter-active"), 650);
    });

    // Quitar overlay
    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 700);

    // Cascada
    setTimeout(() => {
      mainEl.classList.add("show");
    }, 120);

    // Corazones (opcional)
    spawnHearts(6);

    // Subir al inicio
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 280);
});

// Corazones sutiles (opcional)
function spawnHearts(n = 5) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < n; i++) {
    const span = document.createElement("span");
    span.className = "heart-float";
    span.textContent = i % 2 === 0 ? "💙" : "🤍";
    span.style.setProperty("--x", `${20 + Math.random() * 60}%`);
    span.style.setProperty("--size", `${14 + Math.random() * 12}px`);
    span.style.animationDelay = `${Math.random() * 0.6}s`;
    fragment.appendChild(span);
    setTimeout(() => span.remove(), 2600);
  }
  document.body.appendChild(fragment);
}
