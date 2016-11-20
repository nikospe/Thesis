<?php
    require_once('../php/database_connect.php');

    if(isset($_POST["store_name"])) $store_name = $_POST['store_name'];
    if(isset($_POST["address"])) $address = $_POST['address'];
    if(isset($_POST["id"])) $id = $_POST['id'];
    if(isset($_POST["service"])) $serv = $_POST['service'];

    $stmt = $database_connection->prepare("INSERT INTO stores (name, address) "
            . "VALUES (?, ?)");
    $stmt->bind_param('ss',$store_name, $address);    
    $response['mysql_query_status'] = $stmt->execute();
    $storeId = mysqli_insert_id($database_connection);

    if( $serv == 'service' ) {
        $stmt2 = $database_connection->prepare("INSERT INTO services_to_stores (serv_id, store_id) "
                . "VALUES (?, ?)");
        $stmt2->bind_param('si', $id, $storeId);    
        $response['mysql_query_status2'] = $stmt2->execute();
    }
    else {
        $stmt2 = $database_connection->prepare("INSERT INTO products_to_stores (prod_id, store_id) "
                . "VALUES (?, ?)");
        $stmt2->bind_param('ii',$id, $storeId);    
        $response['mysql_query_status2'] = $stmt2->execute();   
    }
    $response['mysql_error'] = mysqli_error($database_connection);
    echo json_encode($response);
    $stmt->close();
    $database_connection->close();
?>