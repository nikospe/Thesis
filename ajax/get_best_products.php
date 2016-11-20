<?php
    require_once('../php/database_connect.php');

    $sql = "SELECT p.name, p.type, AVG( r.rating_strength ) AS avg
            FROM products AS p
            JOIN ratings AS r ON r.prod_id = p.id
            GROUP BY p.name
            ORDER BY avg DESC ";

    if( isset($_POST['limit']) ) {
        $limit = $_POST['limit'];
        $sql = $sql . "LIMIT $limit";
    }

    $result = $database_connection->query($sql);

    $response['products'] =  mysqli_fetch_all($result, MYSQLI_ASSOC);
    
    $response['mysql_error'] = mysqli_error($database_connection);
    
    echo json_encode($response);

    $database_connection->close();
?>