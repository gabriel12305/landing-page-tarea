"use strict";

let terminos = document.querySelector("#terms");
terminos.addEventListener("click", function() {
  alert("Tu confia")
})

const carousel = document.getElementById("carousel");
  const slides = carousel.children.length;
  const dots = document.querySelectorAll(".dot");
  let index = 0;

  function showSlide(i) {
    index = (i + slides) % slides;
    carousel.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, dIndex) => {
      dot.classList.toggle("bg-indigo-600", dIndex === index);
      dot.classList.toggle("bg-indigo-300", dIndex !== index);
    });
  }

  document.getElementById("next").onclick = () => showSlide(index + 1);
  document.getElementById("prev").onclick = () => showSlide(index - 1);
  dots.forEach((dot, dIndex) => dot.onclick = () => showSlide(dIndex));

  // Cambio automático cada 6 segundos
  setInterval(() => showSlide(index + 1), 6000);

  // Mostrar la primera
  showSlide(0);