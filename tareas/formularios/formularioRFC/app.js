var dato = {
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    fecha: ""
};

function generar() {
    var nombre = document.getElementById("rfcN").value.toUpperCase();
    var apellidoPa = document.getElementById("rfcP").value.toUpperCase();
    var apellidoMa = document.getElementById("rfcS").value.toUpperCase();
    var fecha = document.getElementById("rfcF").value;

    dato.nombre = nombre;
    dato.primerApellido = apellidoPa;
    dato.segundoApellido = apellidoMa;
    dato.fecha = fecha;

    Object.values(dato).forEach(element => {
        console.log(element);
    });


}