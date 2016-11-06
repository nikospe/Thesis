<?php
    require_once('../php/database_connect.php');

    if (isset($_POST['name'])) $name = $_POST['name'];

    $sql = "SELECT * FROM products WHERE name LIKE '%" . $name . "%' ";
    $result = $database_connection->query($sql);
    $response['product'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
    $response['mysql_error'] = mysqli_error($database_connection);

    echo json_encode($response);

    $database_connection->close();
?>