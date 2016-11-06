<?php
    require_once('../php/database_connect.php');

    $sql = "SELECT * FROM products";
    
    if(isset($_POST['sort_by_rating'])) 
        $sql = $sql." ORDER BY ratings DESC LIMIT 5";
    
    $result = $database_connection->query($sql);

    $rows = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    print json_encode($rows);

    $database_connection->close();
?>