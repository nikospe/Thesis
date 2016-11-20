<?php
    require_once('../php/database_connect.php');

    if (isset($_POST['id'])) $id = $_POST['id'];

    $sql = "SELECT * FROM ratings WHERE prod_id= '$id' ";
    $result = $database_connection->query($sql);
    $response['ratings'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $response['mysql_error'] = mysqli_error($database_connection);
    
    echo json_encode($response);

    $database_connection->close();
?>