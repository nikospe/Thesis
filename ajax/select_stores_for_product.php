<?php
    require_once('../php/database_connect.php');

    if (isset($_POST['id'])) $id = $_POST['id'];

    $sql = "SELECT s.address,s.id,s.name,r.rating_strength FROM stores AS s INNER JOIN products_to_stores AS p ON p.store_id = s.id LEFT JOIN ratings AS r ON r.store_id = s.id WHERE p.prod_id = '$id'";
    $result = $database_connection->query($sql);
    $response['stores'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $response['mysql_error'] = mysqli_error($database_connection);

    echo json_encode($response);

    $database_connection->close();
?>