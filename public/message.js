import { database, ref, set, push, get, child } from './firebase';

/* -----------------------------
   GUARDAR RESEÑAS EN FIREBASE
------------------------------ */
const enviarResena = async (datos) => {
  try {
    // Referencia a /reseñas
    const referencia = ref(database, "reseñas");
    const nuevaRef = push(referencia);

    await set(nuevaRef, {
      nombre: datos.nombre,
      ocupacion: datos.ocupacion,
      rating: datos.rating,
      texto: datos.comentario,
      fecha: Date.now()
    });

    return {
      status: true,
      message: "Reseña guardada correctamente"
    };

  } catch (error) {
    console.error("Error guardando reseña:", error);
    return {
      status: false,
      message: "Error al guardar la reseña"
    };
  }
};

/* -----------------------------
   EVENTO PARA EL FORMULARIO
------------------------------ */
const formulario = document.getElementById("formResena");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const datos = {
    nombre: document.getElementById("nombre").value,
    ocupacion: document.getElementById("ocupacion").value,
    rating: parseInt(document.getElementById("rating").value),
    comentario: document.getElementById("comentario").value
  };

  const exito = await enviarResena(datos);

  if (exito.status) {
    alert("Reseña enviada correctamente");
    formulario.reset();
    cargarReseñas(); // Recarga el carrusel automáticamente
  } else {
    alert("Hubo un error al enviar tu reseña");
  }
});

/* -----------------------------
   CARGAR RESEÑAS DESDE FIREBASE
------------------------------ */
async function cargarReseñas() {
  const dbRef = ref(database);

  try {
    const snapshot = await get(child(dbRef, "reseñas"));

    if (snapshot.exists()) {
      const reseñas = Object.values(snapshot.val());
      mostrarReseñas(reseñas);
    } else {
      console.log("No hay reseñas disponibles.");
    }
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
  }
}

/* -----------------------------
   MOSTRAR RESEÑAS EN CARROUSEL
------------------------------ */
function mostrarReseñas(reseñas) {
  const contenedor = document.getElementById("carousel");
  contenedor.innerHTML = "";

  reseñas.forEach((r) => {
    const item = document.createElement("div");
    item.className = "w-full flex-shrink-0 px-6";
    item.innerHTML = `
      <div class="bg-indigo-50 p-8 rounded-2xl shadow-md max-w-3xl mx-auto">
        <p class="text-lg text-gray-700 italic mb-4">“${r.texto}”</p>
        <h4 class="font-semibold text-indigo-600">${r.nombre}</h4>
        ${r.ocupacion ? `<p class="text-gray-500 text-sm">${r.ocupacion}</p>` : ""}
        <p class="text-yellow-400 text-sm mt-2">
          ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
        </p>
      </div>
    `;
    contenedor.appendChild(item);
  });

  inicializarCarrusel(); // ← MUY IMPORTANTE
}


document.addEventListener("DOMContentLoaded", cargarReseñas);
