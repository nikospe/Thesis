checkDivs();
var productId = '';

function ShowProdRatings(){ 
    var prodData = { 'id' : productId }; 
    $.post('ajax/select_product_ratings.php', prodData, function (data) {                    
        var ratings = data.ratings;
        if ( ratings.length ) {
            $("<h4 class='submain-color marg'>Ratings: </h4><hr>").appendTo( "#product-ratings-list" );
            for( var rating of ratings ) { 
                rating.rating_strength = rating.rating_strength / 2;
                $("<h4 class='capitals'><b>"+rating.username+"</b></h4>"
                +"<h5>"+rating.title+"</h5>"   
                +"<h5>Rate: ("+rating.rating_strength+" / 5)</h5>"            
                +"<h6 class='text_to_end'>"+rating.time+"</h6>"           
                +"<hr>").appendTo( "#product-ratings-list" );                
            }
        }
    }, 'json'); 
}

function productRating() {
    rdata = { 'id' : productId };
    $.post('ajax/get_product_rating.php', rdata, function (response) {
        if (response.error) {
            alert(response.error);
            return;
        }
        for ( var rating of response.rating ) {
            var $el = $('.stable-rating');
            rating.rAvg =  Number( Math.round( (rating.rAvg/2) * 2 ) / 2 );

            $el.html( drawRatingStars(rating.rAvg) + '(' + rating.rAvg + ')' ); 
        }         
    }, 'json');
}

if (screen.width > 1000) {
    $(window).scroll( function() {
        var element = $('.profile');
        if ( $(document).scrollTop() > 128 ) {
            element.removeClass('absolute'); 
            var elemTop2 = $('.footer-header').offset().top - 145;
            var height = $('.profile').height();
            var width = $('.profile').width();
            var temp = elemTop2 - height -50;
            element.addClass('fixed');
            $('.fixed').css('height', (height+30));
            $('.fixed').css('width', (width+30));
            if ( $(document).scrollTop() >= temp) {
                element.removeClass('fixed');
                element.addClass('bottom');
            }
            else{
                element.addClass('fixed');
                element.removeClass('bottom');
            }
        } else {
            element.addClass('absolute');
            element.removeClass('fixed');
        }
    });
}

var element = $('.tores');
if (screen.width < 960) {
    element.removeClass('stores-left');
}
else {
    element.addClass('stores-left');
}

$(window).resize(function() {
    var element = $('.stores');
    if (screen.width < 960) {
        element.removeClass('stores-left');
    }
    else {
        element.addClass('stores-left');
    }
});


if ( urlParams.hasOwnProperty('id') ) {
        $.post('ajax/get_product.php', urlParams, function (data) {
            if(data.product){
                $('.no-display').hide();
                $('.empty-page').hide();
                $('.for-display').show();
                var product = data.product;
                $('#prod-title').html(product.name);
                $('#product-title').html(product.name);
                $('#product-type').html(product.type);
                $('#product-description').html(product.description);
                $('#element').attr("placeholder", product.name);
                productId = product.id;                
            } 
            else {                
                $('.for-display').hide();                
            } 
            storesLoad();
            productRating();
            ShowProdRatings();       
        }, 'json');
}
else if ( !('' in urlParams) ) {
    if ( urlParams.hasOwnProperty('search-product') ){
        mdata = { 'name' : urlParams['search-product'] }
    } else {
        mdata = { 'name' : decodeURIComponent(Object.keys(urlParams)[0]) }
    }
    $.post('ajax/get_product_by_name.php', mdata, function (data) {            
        var products = data.product;
        if ( !products.length ) {
            $('.for-display').hide();
            $('.dynamically-row').hide();
            $('.no-display').show();
            $('.empty-page').show();                        
            $('#prod-tit').html(mdata.name);                
            return;
        }

        if ( products.length == 1 ) {
            $('.no-display').hide();
            $('.dynamically-row').hide();
            $('.empty-page').hide();
            $('.for-display').show(); 
            $('#prod-title').html(products[0].name);
            $('#product-title').html(products[0].name);
            $('#product-type').html(products[0].type);
            $('#product-description').html(products[0].description);
            productId = products[0].id;
            $('#element').attr("placeholder", products[0].name);
        }
        else {
            $('.no-display').hide();
            $('.for-display').hide();                
            $('dynamically').show();                      
            for ( item of products ){                        
                $("<div class='row row-fix-bottom products-row'>"
                +"<div class='col-md-12 grey-background products'><h4>"
                +"Product: <a class='title' href='product.html?id="+item.id
                +"'>"+item.name+"</a></h4><h4 class='submain-color'><span class='black'>Category: </span>"+item.type
                +"</h4><h4 class='submain-color'><span class='black'>Description: </span>"+item.description
                +"</h4></div></div>").appendTo("dynamically");  
            }                
        }
        storesLoad();
        productRating();
        ShowProdRatings();
    }, 'json');
}
else {
    $('.empty-page').show();
}

$.getScript("js/star-rating.js", function(){         
            }); 

$('#productRate').submit(function( event ) {
    event.preventDefault();   
    if ( $('#rate-title').val() == 0 || $('#rate-product').val() == 0 ) {
        $('#leave-blank').show();
    }         
    else {
        var mData = $(this).serialize().concat( '&id='+productId );   
        $.post('ajax/insert_product_rating.php', mData, function (data) {                
            if (data.mysql_query_status) {
                window.location = window.location.href;
            } else if (data.mysql_error) {
                alert(data.mysql_error);
            }
        }, 'json');  
    }           
});