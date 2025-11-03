import { database, ref, set, push, get, child } from './firebase';

const enviarDatos = async (datos) => {
    try{
        const referencia = ref(database, "contactos");
        const newRef = push(referencia);

        await set(newRef, {
            email: datos.email,
            password: datos.password
        })
        
        return {
                status: true,
                message: "Data sent successfully"
        }

    }catch (error){
        console.error("Error saving data: ", error);
        return {
            status: false,
            message: "Error saving data"
        }
    }
};

const formulario = document.getElementById("formRegistrar")

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }

    const exito = await enviarDatos(datos);
  
    if (exito) {
        alert('Mensaje enviado correctamente');
        formulario.reset();
    } else {
        alert('Error al enviar el mensaje');
    }
});

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
        <p class="text-yellow-400 text-sm mt-2">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</p>
      </div>
    `;

    contenedor.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", cargarReseñas);