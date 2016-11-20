<?php
    require_once('../php/database_connect.php');

    if(isset($_POST["vertical_category_selector"])) $vertical_category_selector = $_POST['vertical_category_selector'];
    if(isset($_POST["service_name"])) $service_name = $_POST['service_name'];   

    $stmt = $database_connection->prepare("INSERT INTO services (type,name) "
            . "VALUES (?,?)");
    
    $stmt->bind_param('ss',$vertical_category_selector,$service_name);    
    
    $response['mysql_query_status'] = $stmt->execute();

    $response['id'] = mysqli_insert_id($database_connection);
    
    $response['mysql_error'] = mysqli_error($database_connection);
    echo json_encode($response);
    
    $stmt->close();
    $database_connection->close();
?>