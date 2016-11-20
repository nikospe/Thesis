<?php
    require_once('../php/database_connect.php');

    if(isset($_POST["username"])) $username = $_POST['username'];
    if(isset($_POST["password"])){
        $password = md5($_POST['password']);
    }

    $sql = "SELECT * FROM users WHERE username = '$username' and password = '$password' ";
    $result = $database_connection->query($sql); 
    if ( mysqli_num_rows($result) > 0 ) {
        $username_retrieved = mysqli_fetch_assoc($result)['username'];
        
        session_start();
        $_SESSION['username'] = $username_retrieved;
        
        $response['user_found']=true;
        $response['username'] = $username_retrieved;
    }
    else{
        //echo 'Username and Password NOT Found';
        $response['user_found']=false;
    }

    $response['mysql_error'] = mysqli_error($database_connection);
    echo json_encode($response);        

    $database_connection->close();
?>

