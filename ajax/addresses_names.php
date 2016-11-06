<?php
    require_once('../php/database_connect.php');

    if(!empty($_POST["keyword"])) {

        $query ="SELECT * FROM stores WHERE address LIKE '%" . $_POST["keyword"] . "%' LIMIT 5";
        $result = $database_connection->query($query); 
        $response['address'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
        $response['mysql_error'] = mysqli_error($database_connection);
        
        echo json_encode($response);
    } 
    
    $database_connection->close();
?>