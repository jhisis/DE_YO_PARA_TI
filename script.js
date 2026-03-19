// Función principal que se dispara al hacer clic
function abrirCarta() {
  console.log("Botón presionado");

  // Referencias
  const hero = document.getElementById("hero");
  const letter = document.getElementById("letter");
  const music = document.getElementById("music");
  const gallery = document.getElementById("gallery");
  const overlay = document.getElementById("entryOverlay");

  // 1. Mostrar el overlay de "Abriendo..." inmediatamente
  if (overlay) {
    overlay.classList.remove("hidden");
    overlay.style.display = "flex";
  }

  // 2. Pequeño retraso para que la animación se vea
  setTimeout(() => {
    // Ocultar portada
    if (hero) hero.classList.add("hidden");

    // Mostrar contenido
    if (letter) {
        letter.classList.remove("hidden");
        letter.style.display = "block";
    }
    if (music) {
        music.classList.remove("hidden");
        music.style.display = "block";
    }
    if (gallery) {
        gallery.classList.remove("hidden");
        gallery.style.display = "block";
    }

    // Llenar datos dinámicos
    renderLetter();
    renderGallery();

    // Ocultar overlay tras cargar
    if (overlay) {
      setTimeout(() => {
        overlay.classList.add("hidden");
        overlay.style.display = "none";
      }, 500);
    }

    // Ir al inicio de la carta
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 1000);
}

// Datos
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

function renderLetter() {
  const container = document.getElementById("letterContent");
  if (!container) return;
  container.innerHTML = "";
  LETTER_PARAGRAPHS.forEach(p => {
    const el = document.createElement("p");
    el.textContent = p;
    container.appendChild(el);
  });
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = "";

  // Referencias al Lightbox que están al final de tu HTML
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  PHOTOS.forEach((it) => {
    const frame = document.createElement("figure");
    frame.className = "polaroid";

    // --- IMPORTANTE: AGREGAR ESTAS LÍNEAS PARA EL CLIC ---
    // Hacemos que la polaroid sea clicable
    frame.style.cursor = "pointer"; // Cambia el cursor para indicar clic
    frame.addEventListener("click", () => {
        if (lightbox && lightboxImg) {
            lightboxImg.src = it.src; // Pone la foto clicada en el lightbox
            lightboxImg.alt = it.caption; // Pone el pie de foto como alt
            lightbox.classList.remove("hidden"); // Muestra el lightbox
            lightbox.style.display = "flex"; // Lo asegura como flex (centrado)
        }
    });
    // ---------------------------------------------------

    const img = document.createElement("img");
    img.src = it.src;
    img.style.width = "100%";

    const cap = document.createElement("figcaption");
    cap.className = "caption";
    cap.textContent = it.caption;

    frame.appendChild(img);
    frame.appendChild(cap);
    grid.appendChild(frame);
  });

  // --- OBLIGATORIO: CERRAR EL LIGHTBOX AL CLICAR FUERA ---
  // Esta parte asegura que si tocan fuera de la foto, el visor se cierre
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        // Solo cerramos si hacen clic en el fondo, no en la imagen misma
        if (e.target === lightbox) {
            lightbox.classList.add("hidden");
            lightbox.style.display = "none";
            lightboxImg.src = ""; // Limpiamos la imagen
        }
    });
  }
}
