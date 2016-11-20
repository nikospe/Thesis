<?php
    require_once('../php/database_connect.php');
    session_start();
    $username = $_SESSION['username'];
    $sql = "SELECT r.title,r.rating_strength,r.time,p.name as pname,s.name,s.address FROM ratings AS r LEFT JOIN products AS p ON p.id=r.prod_id LEFT JOIN stores AS s ON s.id = r.store_id WHERE r.username = '$username'";
    $result = $database_connection->query($sql);
    $response['activities'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $response['mysql_error'] = mysqli_error($database_connection);

    echo json_encode($response);

    $database_connection->close();
?>