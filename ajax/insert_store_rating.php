<?php
    require_once('../php/database_connect.php');

    if(isset($_POST["id"])) $id = $_POST['id'];
    if(isset($_POST["title"])) $title = $_POST['title'];
    if(isset($_POST["rate"])) $rate = $_POST['rate'];

    $rate = (float)$rate * 2;

    session_start();    
    $username = $_SESSION["username"];
    
    $stmt = $database_connection->prepare("INSERT INTO ratings (title,username,store_id,rating_strength) "
            . "VALUES (?,?,?,?)");
    
    $stmt->bind_param('sssi',$title,$username,$id,$rate);    
    
    $response['mysql_query_status'] = $stmt->execute();
    
    $response['mysql_error'] = mysqli_error($database_connection);
    echo json_encode($response);
    
    $stmt->close();
    $database_connection->close();
?>