<?php
    require_once('../php/database_connect.php');
    
    $sql = "SELECT * FROM users";
    $result = $database_connection->query($sql);

    $rows = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    
    $response['users'] = $rows;
    
    echo json_encode($response);

    $database_connection->close();
?>