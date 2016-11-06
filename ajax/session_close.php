<?php 
    session_start();  
    // destroy the session 
    session_destroy();
    
    $response['status']='ok';
    echo json_encode($response);    
?>
