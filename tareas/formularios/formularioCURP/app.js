  //objeto
        var persona = {
            nombre:"Juan",
            apellidoAP: "Perez",
            apellidoMa:"Gonzalez",
            fechaDeNacimiento: "",
            entidadFederativa:"SR",
            sexo:"por favor"

        }
        //funcion

        function obtenerDatos(){
            var cajaDeTextoNombre =
            document.getElementById("cajaDeTextNombre");
            var cajaDeTextoApellido =
            document.getElementById("cajaDeTextApellido");
            var cajaDeTextApellidoMa =
            document.getElementById("cajaDeTextApellidoMa");
            var fecha =
            document.getElementById("fecha");
            var sexo = 
            document.getElementById("sexo");
            var entidadFederativa = 
            document.getElementById("estado");
            

            persona.nombre = cajaDeTextoNombre.value;
            persona.apellidoAPapellido = cajaDeTextoApellido.value;
            persona.apellidoMa = cajaDeTextApellidoMa.value;
            persona.fechaDeNacimiento = fecha.value;
            persona.sexo = sexo.value;
            persona.entidadFederativa = entidadFederativa.value;

            Object.values(persona).forEach(element => {
                console.log(element);
            });
        }