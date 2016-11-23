<?php
    require_once('../php/database_connect.php');

    if (isset($_POST['id'])) $id = $_POST['id'];

    $sql = "SELECT  s.address,s.id,s.name,r.rating_strength 
    FROM stores AS s INNER JOIN services_to_stores AS ss 
    ON s.id = ss.store_id 
    LEFT JOIN ratings AS r 
    ON r.store_id = s.id 
    WHERE ss.serv_id = '$id' ";
    
    if (isset($_POST['address'])) {
        $address = $_POST['address'];
        $sql = $sql."and s.address like '%". $address . "%' ";
    }

    $result = $database_connection->query($sql); 
    $response['stores'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $response['mysql_error'] = mysqli_error($database_connection);
        $response['id'] = $id;
    echo json_encode($response);

    $database_connection->close();
?>