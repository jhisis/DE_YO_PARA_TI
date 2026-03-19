// Esperamos a que todo el contenido esté listo
window.addEventListener("load", () => {
  console.log("Página cargada correctamente");

  const btnOpen = document.getElementById("openLetterBtn");
  const hero = document.getElementById("hero");
  const letter = document.getElementById("letter");
  const music = document.getElementById("music");
  const gallery = document.getElementById("gallery");

  if (!btnOpen) {
    console.error("No se encontró el botón con ID 'openLetterBtn'");
    return;
  }

  btnOpen.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Click en el botón detectado");

    // 1. Ocultar la portada inmediatamente
    if (hero) {
      hero.style.display = "none"; 
      // Usamos style.display por si la clase .hidden tiene conflictos en el CSS
    }

    // 2. Mostrar las secciones (Carta, Música, Galería)
    const secciones = [letter, music, gallery];
    secciones.forEach(sec => {
      if (sec) {
        sec.classList.remove("hidden");
        sec.style.display = "block"; // Aseguramos que sea visible
      }
    });

    // 3. Ejecutar el llenado de datos
    renderLetter(LETTER_PARAGRAPHS);
    renderGallery(PHOTOS);

    // 4. Subir al inicio
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// --- Datos que alimentan la página ---
const LETTER_PARAGRAPHS = [
  "Gracias por ser como eres.",
  "Gracias por acompañarme incluso en la distancia.",
  "Este regalo es pequeño y quizá sin valor alguno, pero lo hice con todo mi amor 💙"
];

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
  items.forEach((it) => {
    const frame = document.createElement("figure");
    frame.className = "polaroid";
    const img = document.createElement("img");
    img.src = it.src;
    img.style.width = "100%"; // Para que no se rompa el diseño
    const cap = document.createElement("figcaption");
    cap.className = "caption";
    cap.textContent = it.caption;
    frame.appendChild(img);
    frame.appendChild(cap);
    grid.appendChild(frame);
  });
}
