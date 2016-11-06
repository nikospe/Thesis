<?php
    require_once('../php/database_connect.php');

    if (isset($_POST['username'])) {
        
        session_start();
        
        if ($_POST['username'] == $_SESSION['username']) {
            $username = $_POST['username'];
        } else {
            $response['error'] = 'No right to access those data!';
            echo json_encode($response);
            die();
        }
    } else {
        $response['error'] = 'No username provided!';
        echo json_encode($response);
        die();
    }

    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = $database_connection->query($sql);
    $response['user'] = mysqli_fetch_assoc($result);

    $response['mysql_error'] = mysqli_error($database_connection);

    echo json_encode($response);

    $database_connection->close();
?>