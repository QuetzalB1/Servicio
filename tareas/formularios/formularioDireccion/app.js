//objeto
var direccion = {
    calle: "",
    numero: 0,
    colonia: "",
    cp: 0,
    estado:""
}

        function obtenerDatos(){
            var calle = document.getElementById("cajaDeTextCalle");
            var numero = 
            document.getElementById("cajaDeNumNumero");
            var colonia = 
            document.getElementById("cajaDeTextColonia");
            var cp =
            document.getElementById("cajaDeNumCp");
            var estado =
            document.getElementById("cajaDeTextEstado");

            direccion.calle = calle.value;
            direccion.numero = parseInt(numero.value);
            direccion.colonia = colonia.value;
            direccion.cp = parseInt(cp.value);
            direccion.estado = estado.value;

            Object.values(direccion).forEach(element => {
                console.log(element);
            });
            
        }