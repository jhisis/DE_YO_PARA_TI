// ----- Configuración personalizable -----
const LETTER_PARAGRAPHS = [
  "Gracias por ser como eres.",
  "Gracias por acompañarme incluso en la distancia.",
  "Este regalo es pequeño, pero lo hice con todo mi amor 💙"
];

// Rutas de tus fotos (ponlas dentro de /assets)
const PHOTOS = [
  { src: "assets/foto1.jpg", caption: "Nuestro inicio" },
  { src: "assets/foto2.jpg", caption: "Una de mis favoritas" },
  { src: "assets/foto3.jpg", caption: "Risa que me enamora" },
  { src: "assets/foto4.jpg", caption: "Contigo, a todas" }
];

// ¿Quieres música? Coloca cancion.mp3 en /assets
const MUSIC_ENABLED = true;
const MUSIC_SRC = "assets/cancion.mp3";

document.getElementById("openLetterBtn").addEventListener("click", () => {
  document.getElementById("hero").classList.add("hidden");
  document.getElementById("letter").classList.remove("hidden");
  document.getElementById("music").classList.remove("hidden"); // ← importante
  // ... lo demás que ya tengas (galería, texto, etc.)
});

document.getElementById("openLetterBtn").addEventListener("click", async () => {
  // Oculta la portada
  document.getElementById("hero").classList.add("hidden");

  // Muestra la carta
  document.getElementById("letter").classList.remove("hidden");

  // Muestra la música
  const musicSection = document.getElementById("music");
  musicSection.classList.remove("hidden");

  // Texto de la carta
  document.getElementById("letterContent").innerHTML = `
    <p>Gracias por ser como eres.</p>
    <p>Gracias por acompañarme incluso en la distancia.</p>
    <p>Este regalo es pequeño, pero lo hice con todo mi amor 💙</p>
  `;

  // Intentar reproducir la música
  const audio = document.getElementById("audio");
  try {
    await audio.play();
  } catch (e) {
    // En celulares puede requerir tocar Play
    console.log("El usuario debe presionar play manualmente");
  }
});

// ----- Lógica -----

function renderLetter(paragraphs) {
  const container = document.getElementById("letterContent");
  container.innerHTML = "";
  paragraphs.forEach(p => {
    const el = document.createElement("p");
    el.textContent = p;
    container.appendChild(el);
  });
}

function renderGallery(items) {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = "";

  // Pequeña rotación aleatoria para el efecto polaroid apilado
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
  img.src = src;
  lb.classList.remove("hidden");
}
function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
}
document.getElementById("lightbox").addEventListener("click", closeLightbox);

// Inicial
document.getElementById("openLetterBtn").addEventListener("click", async () => {
  // Mostrar secciones
  document.getElementById("hero").classList.add("hidden");
  document.getElementById("letter").classList.remove("hidden");
  document.getElementById("gallery").classList.remove("hidden");

  // Música
  const musicSection = document.getElementById("music");
  const audioEl = document.getElementById("audio");
  if (MUSIC_ENABLED && MUSIC_SRC) {
    musicSection.classList.remove("hidden");
    // Asegurar que el <source> tenga la ruta correcta (por si editas el HTML)
    const source = audioEl.querySelector("source");
    if (source) source.src = MUSIC_SRC;
    audioEl.load();
    try { await audioEl.play(); } catch (_) { /* En móviles puede requerir tocar Play */ }
  }

  // Carta y galería
  renderLetter(LETTER_PARAGRAPHS);
  renderGallery(PHOTOS);

  // Subir al inicio
  window.scrollTo({ top: 0, behavior: "smooth" });
});
``
