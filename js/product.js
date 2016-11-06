var productId = '';
$(window).scroll( function() {
    var element = $('.profile');
    if ( $(document).scrollTop() > 128 ) {
        element.removeClass('absolute'); 
        var elemTop = $('.footer-header').offset().top - 135;
        var height = $('.profile').height();
        var width = $('.profile').width();
        var heightt = $('.comment-row').height();
        var height2 = $('.rating').height();
        var temp = elemTop - height - heightt - height2 - 155;
        element.addClass('fixed');
        //$('#profile').css('height', (height+30));
        //$('#profile').css('width', (width+30));
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

var temp = window.location.search.substring(1);
if (temp.length > 0) {
    var res = temp.split("=");
    if ( res[0] == "id" ) {
        var str = res[1];
        var id = parseInt(str);
        var mdata = {'id' : id};

        $.post('ajax/get_product.php', mdata, function (data) {
            if(data.product){
                $('.no-display').hide();
                $('.for-display').show();
                var product = data.product;
                //document.getElementById("product-image").src = "icons/apple.png"
                $('#prod-title').html(product.name);
                $('#product-title').html(product.name);
                $('#product-type').html(product.type);
                $('#product-description').html(product.description);
                $('#element').attr("placeholder", product.name);
                productId = product.id;
            } 
            else {
                $('.for-display').hide();
                $('.no-display').show();
            }        
        }, 'json');
    }
    else {
        if ( res.length == 1 ) {
            var str = res[0];
            temp = str.split("%20");
            if ( temp.length == 1 ){
                str = temp[0];
                var mdata = {'name' : str};
            }
            else {
                str = "";
                for (i=0;i<temp.length;i++) {
                    if( i == (temp.length-1) ) {
                        str = str + temp[i];
                    }
                    else {
                        str = str + temp[i] + " ";
                    }
                }
                var mdata = {'name' : str};
            }
        }
        else {
            var str = res[1];
            temp = str.split("+");
            if(temp.length > 1) {
                str = "";
                for (i=0;i<temp.length;i++) {
                    if( i == (temp.length-1) ) {
                        str = str + temp[i];
                    }
                    else {
                        str = str + temp[i] + " ";
                    }
                }
                var mdata = {'name' : str};
            }
            else {
                str = temp[0];
                var mdata = {'name' : str};
            }
        }
        $.post('ajax/get_product_by_name.php', mdata, function (data) {            
            var products = data.product;
            if ( !products.length ) {
                $('.for-display').hide();
                $('.dynamically-row').hide();
                $('.no-display').show();            
                $('#prod-tit').html(mdata.name);                
                return;
            }

            if ( products.length == 1 ) {
                $('.no-display').hide();
                $('.dynamically-row').hide();
                $('.for-display').show(); 
                $('#prod-title').html(products[0].name);
                $('#product-title').html(products[0].name);
                $('#product-type').html(products[0].type);
                $('#product-description').html(products[0].description);
                productId = products[0].id;
                $('#element').attr("placeholder", products[0].name);
                //$('#element').val(productId);
            }
            else {
                $('.no-display').hide();
                $('.for-display').hide();
                $('dynamically').show();
                for ( item of products ){                        
                    $("<div class='row row-fix-bottom products-row'>"
                    +"<div class='col-md-12 grey-background products'><h4><u>Product</u>: <a class='prod-name' href='product.html?"+item.name
                    +"'>"+item.name+"</a></h4><h4><u>Category</u>: "+item.type
                    +"</h4><h4><u>Description</u>: "+item.description
                    +"</h4></div></div>").appendTo("dynamically");  
                }
            }
        }, 'json');
    }
}