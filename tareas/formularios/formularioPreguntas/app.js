var respuestas = {
    R1: document.getElementById("respuesta1").value,
    R2: document.getElementById("respuesta2").value,
    R3: document.getElementById("respuesta3").value,
    R4: document.getElementById("respuesta4").value,
    R5: document.getElementById("respuesta5").value,
    R6: document.getElementById("respuesta6").value,
    R7: document.getElementById("respuesta7").value,
    R8: document.getElementById("respuesta8").value,
    R9: document.getElementById("respuesta9").value,
    R10: document.getElementById("respuesta10").value
}

function obtener() {

    Object.values(respuestas).forEach(element => {
        console.log(element);
    });

}