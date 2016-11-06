$('.form-add-product').submit(function (event) {
    event.preventDefault();
    $.post('ajax/add_new_product.php', $(this).serialize(), function (data) {
        if (data.mysql_query_status) {
            console.log(data.id);
            window.location = 'product.html?id='+data.id;
        } else if (data.mysql_error) {
            alert(data.mysql_error);
        }
    }, 'json');
});
$('.form-add-store').submit(function (event) {
    event.preventDefault();
    var formData = '';
    if ( window.location.pathname.includes('product') ) {
        formData = $(this).serialize().concat( '&id='+productId );
    } 
    else if ( window.location.pathname.includes('service') ) {
        formData = $(this).serialize().concat( '&id='+serviceId );
        formData = formData.concat( '&service=service' );
    }
    $.post('ajax/add_new_store.php', formData, function (data) {
        if (data.mysql_query_status) {
            window.location = window.location.href;
        } else if (data.mysql_error) {
            alert(data.mysql_error);
        }
    }, 'json');
});
$('.form-add-service').submit(function (event) {
    event.preventDefault();
    $.post('ajax/add_new_service.php', $(this).serialize(), function (data) {
        if (data.mysql_query_status) {
            window.location = 'service.html?id='+data.id;
        } else if (data.mysql_error) {
            alert(data.mysql_error);
        }
    }, 'json');
});