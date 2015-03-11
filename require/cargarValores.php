<?php

$atributoSeleccionado = $_GET['atributoSeleccionado'];
//$atributoSeleccionado = "nombre";

$nombreTabla = "poligono";
//$idPoligono = 18;

// include db connect class
require_once __DIR__ . '/connectbd.php';

// connecting to db
$db = new DB_Connect();

//get all products from products table
$result = mysql_query("SELECT ".$atributoSeleccionado." FROM ".$nombreTabla) or die(mysql_error());

//echo $result;

// check for empty result
if (mysql_num_rows($result) > 0) {
    $response = array();
    while ($row = mysql_fetch_array($result)) {
        // temp user array
        $datos = array();
        $datos[$atributoSeleccionado] = $row[0];
        // push single product into final response array
        array_push($response, $datos);
    }
    echo json_encode($response);
} else {
    // no products found
    $response["success"] = 0;
    $response["message"] = "No se encontraron Datos";

    // echo no users JSON
    echo json_encode($response);
}
	
//// check for empty result
//if (mysql_num_rows($result) > 0) {
//    $response = array();
//    while ($row = mysql_fetch_array($result)) {
//        // temp user array
//        $poligono = array();
//        $poligono["id"] = $row["id"];
//       // $cliente_cc["Geom"] = $row["Geom"];
//        // push single product into final response array
//        array_push($response, $poligono);
//    }
//    // success
//    //$response["success"] = 1;
//    // echoing JSON response
//    echo json_encode($response);
//} else {
//    // no products found
//    $response["success"] = 0;
//    $response["message"] = "No se encontraron poligonos";
//    // echo no users JSON
//    echo json_encode($response);
//}

?>
