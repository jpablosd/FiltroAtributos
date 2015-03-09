/* MODIFICAR LOS SIGUIENTES ARCHVOS

/require/config.php
por los datos de la bd

/require/cargarDatos.php
linea Nº2  por el nombre de la tabla
*/


var mostrarFiltro = false;
function mostrarFiltros(){
    if(mostrarFiltro == true){
        mostrarFiltro = false;
        $("#filtros").hide();
    }
    else{
        mostrarFiltro = true;
        $("#filtros").show();
    }
    cargarPoligonos();
}

function cargarPoligonos(){
    var xmlhttp = new XMLHttpRequest();
    var url = "require/cargarDatos.php";

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(response) {
        var arr = JSON.parse(response);
        var i;
        var out = "";
        //console.log(arr.length);
        var a=0;
        while(a<arr.length){
            //console.log(arr[a]);
            var arr2 = arr[a];
            //console.log(" "+arr2[0]); // atributo
            //console.log(" "+arr2[1]); // descripcion
            out += "<option value='"+arr2[0]  +"'"+">"+arr2[0]+"</option>";
            a++;
        }
        document.getElementById("listaAtributos").innerHTML = out;
    }
}


var atributoSeleccionado;
function valor(valor){
    console.log(valor);
    atributoSeleccionado = valor;
}

function cargarValores(){
    console.log("valores de "+atributoSeleccionado);
}














