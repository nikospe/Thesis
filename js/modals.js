$('.form-add-product').submit(function (event) {
    event.preventDefault();
    if ( $('#product_name').val().length < 2 || !$('#vertical_category_selector').val() ) {
        $('.names-check').show();
    }
    else {
        $.post('ajax/add_new_product.php', $(this).serialize(), function (data) {
            if (data.mysql_query_status) {
                window.location = 'product.html?id='+data.id;
            } else if (data.mysql_error) {
                alert(data.mysql_error);
            }
        }, 'json');
    }
});
$('.form-add-store').submit(function (event) {
    event.preventDefault();
    var place = autocomplete.getPlace();
    if ( $('#store_name').val().length < 2 || $('#address').val().length < 2 || !place) {
        $('.names-check').show();
    }
    else {
        var formData = '';
        if ( window.location.pathname.includes('product') ) {
            formData = $(this).serialize().concat( '&id='+productId );
            formData = formData.concat( '&service=product' );
        } 
        else if ( window.location.pathname.includes('service') ) {
            formData = $(this).serialize().concat( '&id='+serviceId );
            formData = formData.concat( '&service=service' );
        }
        $.post('ajax/add_new_store.php', formData, function (data) {
            //console.log(data);
            if (data.mysql_query_status) {
                window.location = window.location.href;
            } else if (data.mysql_error) {
                alert(data.mysql_error);
            }
        }, 'json');
    }
});
$('.form-add-service').submit(function (event) {
    event.preventDefault();
    if ( $('#service_name').val().length < 2 || !$('#vertical_category_selector_s').val() ) {
        $('.names-check').show();
    }
    else {        
        $.post('ajax/add_new_service.php', $(this).serialize(), function (data) {
            if (data.mysql_query_status) {
                window.location = 'service.html?id='+data.id;
            } else if (data.mysql_error) {
                alert(data.mysql_error);
            }
        }, 'json');
    }
});

$('.close').click( function (e) {
    e.preventDefault();
    $('.names-check').hide();
});