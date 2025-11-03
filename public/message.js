import { database, ref, set, push } from './firebase';

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