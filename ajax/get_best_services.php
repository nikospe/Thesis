<?php
    require_once('../php/database_connect.php');

    $sql = "SELECT s.name, ss.type, ss.id, s.address, AVG( r.rating_strength ) AS avg
            FROM services_to_stores AS st
            JOIN stores AS s ON st.store_id = s.id
            JOIN ratings AS r ON r.store_id = s.id
            JOIN services AS ss ON st.serv_id = ss.id
            GROUP BY s.name
            ORDER BY avg DESC ";

    if( isset($_POST['limit']) ) {
        $limit = $_POST['limit'];
        $sql = $sql . "LIMIT $limit";
    }

    $result = $database_connection->query($sql);

    $response['services'] =  mysqli_fetch_all($result, MYSQLI_ASSOC);
    
    $response['mysql_error'] = mysqli_error($database_connection);
    
    echo json_encode($response);

    $database_connection->close();
?>