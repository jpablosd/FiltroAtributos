/* MODIFICAR LOS SIGUIENTES ARCHVOS

/require/config.php
por los datos de la bd

/require/cargarAtributos.php
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
    cargarAtributos();
    cargarOperadores();
}

function cargarAtributos(){
    var xmlhttp = new XMLHttpRequest();
    var url = "require/cargarAtributos.php";

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


//guardo el atributo que seleccione
var atributoSeleccionado;
function valor(valor){
    //console.log(valor);
    atributoSeleccionado = valor;
}

function cargarValores(){
    document.getElementById("listaDatos").innerHTML = "";
    //console.log("valores de "+atributoSeleccionado);
    
    
    var xmlhttp = new XMLHttpRequest();
    var url = "require/cargarValores.php?atributoSeleccionado="+atributoSeleccionado;

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(response) {
        var arr = JSON.parse(response);
        //var id          = arr[0].id;
        var out = "";
        //console.log(arr.length);
        var a=0;
        while(a<arr.length){
            //console.log(arr[a]);
            console.log(arr[a][atributoSeleccionado]);
            
            out += "<option value='"+arr[a][atributoSeleccionado]  +"'"+">"+arr[a][atributoSeleccionado]+"</option>";
            a++;
        }
        document.getElementById("listaDatos").innerHTML = out;
    }
}



function cargarOperadores(){
    var xmlhttp = new XMLHttpRequest();
    var url = "require/cargaroperadores.php";

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
            //console.log(" "+arr2[3]); // atributo 1= nombre, 2= simbolo , 3= descripcion
            //console.log(" "+arr2[1]); // descripcion
            out += "<option value='"+arr2[2]  +"'"+">"+arr2[1]+"</option>";
            a++;
        }
        document.getElementById("listaOperadores").innerHTML = out;
    }
}














