function test( id ) {
    if($('.'+id).css('display') == 'none') {
        $('.'+id).show();
        return;
    }
    $('.'+id).hide();
}

window.onload = function () {
    if ( window.location.pathname.includes('product') ) {
        mdata = { 'id' : productId };
        $.post('ajax/select_stores_for_product.php', mdata, function (data) {
            var stores = data.stores;
             if( stores.length ) {
                 for( var store of stores ) {
                     $("<div class='row row-fix-bottom marg-left'><div class='col-md-8 descript-stores white-background stores stores-left'>"
                     +"<div class='row'><div class='col-md-2 visible-lg-block shop-logo-row'>"               
                     +"<a class='shop-logo' href='javascript:;' onClick='test("+store.id+");'><img class='stores-image' alt='' data-src='' src='icons/map.png'></a>"
                     +"<br><h4 class='titles'>Store Rating</h4>"                
                     +"</div><div class='col-md-10'><h3 class='titles'>"+store.name+"</h3><h4 class='addresses'>"+store.address+"</h4>"
                     +"<h6>Click the store icon to find it on Google map</h6>"
                     +"<a class='rating-button' href='javascript:;' onClick='test("+store.id+");'>Rate this store<span class='glyphicon glyphicon-chevron-right'></span>"
                     +"</a></div></div><div class='row google_map_none "+store.id+"'>"
                     +"<div class='col-md-12'><h1>MAP</h1><h3>Rate this store:</h3></div></div></div></div>").appendTo("dyn-stores");
                 }
             }
        }, 'json');
    }
    else if ( window.location.pathname.includes('service') ) {
        mdata = { 'id' : serviceId };
        $.post('ajax/select_stores_for_service.php', mdata, function (data) {
            var stores = data.stores;
             if( stores.length ) {
                 for( var store of stores ) {
                     $("<div class='row row-fix-bottom'><div class='col-md-8 descript-stores white-background stores-service-left'>"
                     +"<div class='row'><div class='col-md-2 visible-lg-block shop-logo-row'>"               
                     +"<a class='shop-logo' href='javascript:;' onClick='test("+store.id+");'><img class='stores-image' alt='' data-src='' src='icons/map.png'></a>"
                     +"<br><h4 class='titles'>Store Rating</h4>"                
                     +"</div><div class='col-md-10'><h3 class='titles'>"+store.name+"</h3><h4 class='addresses'>"+store.address+"</h4>"
                     +"<h6>Click the store icon to find it on Google map</h6>"
                     +"<a class='rating-button' href='javascript:;' onClick='test("+store.id+");'>Rate this store<span class='glyphicon glyphicon-chevron-right'></span>"
                     +"</a></div></div><div class='row google_map_none "+store.id+"'>"
                     +"<div class='col-md-12'><h1>MAP</h1><h3>Rate this store:</h3></div></div></div></div>").appendTo("dyn-stores");
                 }
             }
        }, 'json');
    }
}

