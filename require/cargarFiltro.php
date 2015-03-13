<?php

//header('Content-Type: application/json');
//$atributoSeleccionado = $_GET['atributoSeleccionado'];
//$operadorSeleccionado = $_GET['operadorSeleccionado'];
//$valorSeleccionado    = $_GET['valorSeleccionado'];

$atributoSeleccionado = "id";
$operadorSeleccionado = "<";
$valorSeleccionado    = 30;

//$atributoSeleccionado = "nombre";

$nombreTabla = "bajas_nunoa_jp";
//$idPoligono = 18;

// include db connect class
require_once __DIR__ . '/connectbd.php';

// connecting to db
$db = new DB_Connect();


$result = mysql_query("SHOW COLUMNS FROM ".$nombreTabla);
// check for empty result
if (mysql_num_rows($result) > 0) {
    $response = array();
    while ($row = mysql_fetch_array($result)) {
        // temp user array
        $datos = array();
        $datos[0] = $row[0]; //[0] es el primer atributo (nombre), [1] es el tipo (varchar(200))....

        // push single product into final response array
        array_push($response, $datos);
    }
    echo json_encode($response);
    echo "<br><br>";
}


//get all products from products table
$result2 = mysql_query("SELECT * FROM ".$nombreTabla." WHERE ".$atributoSeleccionado." ".$operadorSeleccionado." ".$valorSeleccionado) or die(mysql_error());

//var_dump($result);
// check for empty result
if (mysql_num_rows($result2) > 0) {
    $response2 = array();
   
     
    while ($row2 = mysql_fetch_array($result2)) {
        // temp user array
        $datos2 = array();
        $datos2[0] = $row2[0];
        
//        $datos[1] = $row[1];
//        $datos[3] = $row[3];
//        $datos[4] = $row[4];
        // push single product into final response array
        array_push($response2, $datos2);
    }
    echo json_encode($response2);
} else {
    // no products found
    $response2["success"] = 0;
    $response2["message"] = "No se encontraron Datos";

    // echo no users JSON
    echo json_encode($response2);
}


?>
