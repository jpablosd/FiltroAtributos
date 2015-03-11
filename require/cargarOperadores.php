<?php
$nombreTabla = "operador";

// include db connect class
require_once __DIR__ . '/connectbd.php';

// connecting to db
$db = new DB_Connect();

$result = mysql_query("select * FROM ".$nombreTabla);
/*
echo mysql_num_rows (  $result );
$i = 0;
while($prueba = mysql_fetch_array($result)){
    echo '<br>'. '<br>';
    echo $prueba[0].'<br>'.$prueba[1];
    $i ++;
}*/

// check for empty result
if (mysql_num_rows($result) > 0) {
    $response = array();
    while ($row = mysql_fetch_array($result)) {
        // temp user array
        $datos = array();
        $datos[0] = $row[0];
        $datos[1] = $row[1];
        $datos[2] = $row[2];
        $datos[3] = $row[3];
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
?>