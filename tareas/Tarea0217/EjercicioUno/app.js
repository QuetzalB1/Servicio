async function obtenerPersonajes() {
    try {
        const response = await fetch("https://dragonball-api.com/api/characters");
        const personajes = await response.json();
        return personajes.items;
    } catch (error) {
        alert("Error al obtener los personajes:", error);
    }
}

async function mostrarPersonajes() {
    const personajes = await obtenerPersonajes();
    const personajeSelect = document.getElementById("personajeSelect");
    personajes.forEach(personaje => {
        const option = document.createElement("option");
        option.value = personaje.id;
        option.textContent = personaje.name;
        personajeSelect.appendChild(option);
    });
}

async function imprimirPersonaje(id) {
    const response = await fetch(`https://dragonball-api.com/api/characters/${id}`);
    const personaje = await response.json();


    document.getElementById("infoKi").textContent = personaje.ki;
    document.getElementById("infoRaza").textContent = personaje.race;
    console.log(personaje.ki);

}

document.addEventListener("DOMContentLoaded", () => {
    mostrarPersonajes();

    document.getElementById("personajeSelect")
        .addEventListener("change", function () {

            const id = this.value;

            if (!id) return;

            imprimirPersonaje(id);
        });

});