"use strict";

let index = 0;
let slides = 0;
let dots = [];
let slideWidth = 0; // ancho en px de un slide visible (viewport)
let autoIntervalId = null;

function inicializarCarrusel() {
  const carousel = document.getElementById("carousel");
  const wrapper = carousel.parentElement; // wrapper que tiene overflow-hidden
  slides = carousel.children.length;

  // Si no hay slides no hacemos nada
  if (slides === 0) {
    // limpiar dots y desactivar botones si existen
    const dotsContainerEmpty = document.getElementById("dotsContainer");
    if (dotsContainerEmpty) dotsContainerEmpty.innerHTML = "";
    return;
  }

  // calcular ancho visible (viewport) y guardarlo en slideWidth
  slideWidth = wrapper.clientWidth;

  // asegurarnos que cada slide tenga exactamente el ancho del viewport
  Array.from(carousel.children).forEach((child) => {
    child.style.flex = "0 0 100%"; // ocupa 100% del viewport
    child.style.maxWidth = "100%";
  });

  // crear dots
  const dotsContainer = document.getElementById("dotsContainer");
  dotsContainer.innerHTML = "";

  for (let i = 0; i < slides; i++) {
    const dot = document.createElement("button");
    dot.className = "dot w-3 h-3 rounded-full bg-indigo-300";
    dot.type = "button";
    dot.addEventListener("click", () => showSlide(i));
    dotsContainer.appendChild(dot);
  }

  dots = document.querySelectorAll(".dot");

  // asignar eventos a botones prev/next
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  // limpiar listeners previos (por si se inicializa varias veces)
  if (nextBtn) {
    nextBtn.replaceWith(nextBtn.cloneNode(true));
  }
  if (prevBtn) {
    prevBtn.replaceWith(prevBtn.cloneNode(true));
  }

  // reasignar referencias después del replace (si hubo)
  const nextBtn2 = document.getElementById("next");
  const prevBtn2 = document.getElementById("prev");

  if (nextBtn2) nextBtn2.addEventListener("click", () => showSlide(index + 1));
  if (prevBtn2) prevBtn2.addEventListener("click", () => showSlide(index - 1));

  // reiniciar índice si se sobrepasa
  index = index % slides;

  // mostrar la primera (o la actualizada)
  showSlide(index);

  // reiniciar intervalo automático
  if (autoIntervalId) clearInterval(autoIntervalId);
  autoIntervalId = setInterval(() => showSlide(index + 1), 6000);
}

// showSlide ahora usa px en lugar de %
function showSlide(i) {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;
  if (slides === 0) return;

  index = ((i % slides) + slides) % slides; // safe modulo

  // mover en pixeles según el ancho visible
  const offset = -index * slideWidth;
  carousel.style.transform = `translateX(${offset}px)`;

  // actualizar dots
  dots.forEach((dot, d) => {
    dot.classList.toggle("bg-indigo-600", d === index);
    dot.classList.toggle("bg-indigo-300", d !== index);
  });
}

// Actualizar slideWidth al redimensionar ventana (responsive)
window.addEventListener("resize", () => {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;
  const wrapper = carousel.parentElement;
  if (!wrapper) return;

  // recalcular ancho visible
  slideWidth = wrapper.clientWidth;

  // volver a alinear al slide actual con el nuevo ancho
  carousel.style.transition = "none"; // quitar transición momentáneamente
  showSlide(index);
  // forzar reflow para que la desactivación de transición no sea visual
  // eslint-disable-next-line no-unused-expressions
  carousel.offsetHeight;
  carousel.style.transition = "transform 0.5s ease-in-out";
});

// Optional: observar cambios en children si tus reseñas se añaden dinámicamente
// (si llamas a inicializarCarrusel() desde mostrarReseñas() no es imprescindible)
const carouselEl = document.getElementById("carousel");
if (carouselEl) {
  const observer = new MutationObserver(() => {
    // re-inicializar carrusel si cambia el número de slides
    inicializarCarrusel();
  });
  observer.observe(carouselEl, { childList: true });
}

