<?php
    require_once('../php/database_connect.php');

    if (isset($_POST['storeId'])) $id = $_POST['storeId'];

    $sql = "SELECT * FROM ratings WHERE store_id= '$id' ";
    $result = $database_connection->query($sql);
    $response['ratings'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $response['mysql_error'] = mysqli_error($database_connection);
    
    echo json_encode($response);

    $database_connection->close();
?>