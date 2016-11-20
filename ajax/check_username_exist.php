<?php
    require_once('../php/database_connect.php');
    
    if(!empty($_POST['keyword'])) {
        $username = $_POST['keyword'];
        $sql = "SELECT * FROM users WHERE username= '$username' ";
        $result = $database_connection->query($sql);
        if ( mysqli_num_rows($result) > 0 ) {
            $response['usernameFound'] = true;
        }
        else {
            $response['usernameFound'] = false;
        }
    }
    
    $response['mysql_error'] = mysqli_error($database_connection);
    echo json_encode($response);        
    $database_connection->close();
?>