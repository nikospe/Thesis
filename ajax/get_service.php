<?php
    require_once('../php/database_connect.php');

    if (isset($_POST['id'])) $id = $_POST['id'];

    $sql = "SELECT * FROM services WHERE id='$id'";
    $result = $database_connection->query($sql);
    $response['service'] = mysqli_fetch_assoc($result);

    $response['mysql_error'] = mysqli_error($database_connection);

    echo json_encode($response);

    $database_connection->close();
?>