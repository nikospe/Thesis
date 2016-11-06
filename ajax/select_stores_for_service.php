<?php
    require_once('../php/database_connect.php');

    if (isset($_POST['id'])) $id = $_POST['id'];

    $sql = "SELECT * FROM stores AS s INNER JOIN services_to_stores as ss ON ss.serv_id = '$id' AND s.id = ss.store_id";
    $result = $database_connection->query($sql);
    $response['stores'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $response['mysql_error'] = mysqli_error($database_connection);

    echo json_encode($response);

    $database_connection->close();
?>