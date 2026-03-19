// Esperar a que el HTML esté totalmente cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // ----- Configuración personalizable -----
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

    // ----- Referencias a elementos del DOM -----
    const btnOpen = document.getElementById("openLetterBtn");
    const hero = document.getElementById("hero");
    const letter = document.getElementById("letter");
    const music = document.getElementById("music");
    const gallery = document.getElementById("gallery");
    const overlay = document.getElementById("entryOverlay");
    const mainEl = document.querySelector("main");

    // ----- Funciones de Render -----
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
            img.onclick = () => openLightbox(it.src);

            const cap = document.createElement("figcaption");
            cap.className = "caption";
            cap.textContent = it.caption || "";

            frame.appendChild(img);
            frame.appendChild(cap);
            grid.appendChild(frame);
        });
    }

    // ----- Lógica del Botón -----
    if (btnOpen) {
        btnOpen.addEventListener("click", () => {
            // Animación de salida de la portada
            hero.classList.add("fade-out-active");
            overlay.classList.remove("hidden");

            setTimeout(() => {
                hero.classList.add("hidden");
                
                // Mostrar secciones
                letter.classList.remove("hidden");
                music.classList.remove("hidden");
                gallery.classList.remove("hidden");

                renderLetter(LETTER_PARAGRAPHS);
                renderGallery(PHOTOS);

                if (mainEl) mainEl.classList.add("show");

                setTimeout(() => {
                    overlay.classList.add("hidden");
                }, 700);

                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 500);
        });
    }
});

// Estas funciones pueden ir fuera ya que se llaman por evento o dinámicamente
function openLightbox(src) {
    const lb = document.getElementById("lightbox");
    const img = document.getElementById("lightboxImg");
    if (lb && img) {
        img.src = src;
        lb.classList.remove("hidden");
    }
}

function closeLightbox() {
    const lb = document.getElementById("lightbox");
    if (lb) lb.classList.add("hidden");
}
    setTimeout(() => span.remove(), 2600);
  }
  document.body.appendChild(fragment);
}
