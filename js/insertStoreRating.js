$('.store-rating').submit(function( event ) {
    event.preventDefault();   
    // if ( $('#title').val() == 0 || $('#rating').val() == 0 ) {
    //     $('.leave-blank').show();
    // }         
    //else {
        var storeId = event.target.id;
        var mData = $(this).serialize().concat( '&id='+storeId );   
        $.post('ajax/insert_store_rating.php', mData, function (data) {                
            if (data.mysql_query_status) {
                window.location = window.location.href;
            } else if (data.mysql_error) {
                alert(data.mysql_error);
            }
        }, 'json');  
    //}           
});