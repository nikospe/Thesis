<?php 
    session_start();  
    session_destroy();
    $response['status']='ok';
    echo json_encode($response);    
?>
