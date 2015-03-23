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
        //$("#filtros").hide();
    }
    else{
        mostrarFiltro = true;
        $("#filtros").modal();
    }
    cargarAtributos();
    cargarOperadores();
}
var consultaUsuario ="";

//guardo el atributo que seleccione
var atributoSeleccionado;
var tipoAtributoSeleccionado;
function valorAtributo(valor){
    //console.log(valor);
    //convertir el value a array en valor y descripcion y hacer una variable como operadorConsultaFiltro.
    var atributo = valor.split(",");
    atributoSeleccionado = atributo[0]; //clave (id, nombre, cualquier cosa)
    tipoAtributoSeleccionado = atributo[1];

    //console.log(atributoSeleccionado);
    //console.log(tipoAtributoSeleccionado);
}


//guardo el operador seleccionado
var operadorSeleccionado;
function valorOperador(valor){
    //console.log(valor);
    operadorSeleccionado = valor;
    consultaUsuario += operadorSeleccionado + " ";
    document.getElementById("filtroCreado").value= consultaUsuario; 
}


//Al seleccionar un operador del select para hacer la consulta con 
var operadorConsultaFiltro;
function cargarOperador(value){

    operadorConsultaFiltro = value;
    //console.log(operadorConsultaFiltro);
    document.getElementById("cargarOperador").innerHTML = "<button onclick='operadorConsulta()' type='button' class='btn btn-success fa fa-arrow-down'></button>";    
}

function operadorConsulta(){
    if(operadorConsultaFiltro==undefined || consultaUsuario == undefined || atributoSeleccionado == undefined || operadorSeleccionado == undefined || valorSeleccionado == undefined){
        alert("Primero genere una consulta");
    }else{
        //console.log(operadorConsultaFiltro);
        consultaUsuario += operadorConsultaFiltro + " ";
        document.getElementById("filtroCreado").value= consultaUsuario; 
    }
}


//guardo el valor seleccionado
var valorSeleccionado;
function valorValor(valor){
    valorSeleccionado = valor;
}

function inputValor(valor){
    valorSeleccionado = valor;
    //console.log(valor);
}

function seleccionarAtributo(){
    if (atributoSeleccionado == undefined){
        alert("Primero seleccione un atributo");
    }
    else{
        console.log();
        consultaUsuario += atributoSeleccionado + " ";
        document.getElementById("filtroCreado").value= consultaUsuario;
    }
}

function seleccionarValor(){
    if(valorSeleccionado == undefined){
        alert("Primero cargue un valor");
    }
    else{
        //encontrar el texto en una variable
        var varchar = "varchar";
        if (tipoAtributoSeleccionado.indexOf(varchar) != -1) {
            //console.log("es texto");
            consultaUsuario += '"'+valorSeleccionado +'" ';
            document.getElementById("filtroCreado").value= consultaUsuario;
        }
        else{
            //console.log("No es texto");
            consultaUsuario += valorSeleccionado + " ";
            document.getElementById("filtroCreado").value= consultaUsuario;
        }
    }
}




function borrarFiltro(){
    consultaUsuario = "";
    document.getElementById("filtroCreado").value= consultaUsuario;    
}



//boton consultar
function consultar(){

    if (consultaUsuario == undefined || atributoSeleccionado == undefined || operadorSeleccionado == undefined || valorSeleccionado == undefined){
        alert("Primero genere una consulta");
    }
    else{
        var consulta = document.getElementById("filtroCreado").value;
        console.log("consultar: "+consulta);
    }
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

            out += "<option value='"+arr2[0]+","+arr2[1]  +"'"+">"+arr2[0]+"</option>";
            a++;
        }
        document.getElementById("listaAtributos").innerHTML = out;
    }
}


function cargarOperadores(){
    var xmlhttp = new XMLHttpRequest();
    var url = "require/cargarOperadores.php";

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
            out += "<button data-tooltip='"+arr2[3]+"' onclick='valorOperador(this.value)' type='button' class='btn-sm btn-default' value='"+arr2[2]+"'"+">"+arr2[2]+"</button>";
            a++;
        }
        document.getElementById("operadores").innerHTML = out;
    }
}



function cargarValores(){
    if (atributoSeleccionado == undefined){
        alert("Primero seleccione un atributo");
    }
    else{
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
                //console.log(arr[a][atributoSeleccionado]);
                out += "<option value='"+arr[a][atributoSeleccionado]  +"'"+">"+arr[a][atributoSeleccionado]+"</option>";
                a++;
            }
            document.getElementById("listaDatos").innerHTML = out;
        }
    }
}













