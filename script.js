// ----- Configuración personalizable -----
const LETTER_PARAGRAPHS = [
  "Gracias por ser como eres.",
  "Gracias por acompañarme incluso en la distancia.",
  "Este regalo es pequeño y quiza sin valor alguno, pero lo hice con todo mi amor 💙"
];

// Rutas de tus fotos (ponlas dentro de /assets)
const PHOTOS = [
  { src: "assets/1.jpeg", caption: "Cres que se me iba a olvidar que me dedicaste esta luna?" },
  { src: "assets/2.jpeg", caption: "Una de mis favoritas, de las primeras cuando inciamos" },
  { src: "assets/3.jpeg", caption: "Esta me Enacanta JAJAJA, jamas pense que pasara lo de esa noche y si nos ponemos a pensar es una locura." },
  { src: "assets/4.jpeg", caption: "LA FOTO HABLA POR SI SOLA" },
  { src: "assets/5.jpeg", caption: "Ayyy esta fue en una de tus citas favoritas?" },
  { src: "assets/6.jpeg", caption: "esta fue casi antes de terminar, creo jeje" },
  { src: "assets/7.jpeg", caption: "Gracias a Dios hemos cambiado un poco JAJ" },
  { src: "assets/8.jpeg", caption: "Obviamente mi Moto es mas bonita" }
];
function renderGallery(items) {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = "";

  const rotations = [-2, -1, 0, 1.5, 2.5]; // toque “polaroid” ligeramente girado

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

document.getElementById("openLetterBtn").addEventListener("click", () => {
  // (lo que ya tienes)
  document.getElementById("hero").classList.add("hidden");
  document.getElementById("letter").classList.remove("hidden");
  document.getElementById("music").classList.remove("hidden");   // si usas la sección de música
  document.getElementById("gallery").classList.remove("hidden"); // ← mostrar galería

  // Renderizar la galería
  renderGallery(PHOTOS);

  // (tu carta / scroll / etc.)
});





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
