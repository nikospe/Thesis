<?php
    require_once('../php/database_connect.php');

    $sql = "SELECT * FROM ratings";
    $result = $database_connection->query($sql);

    $rows = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    print json_encode($rows);

    $database_connection->close();
?>
