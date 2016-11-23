/**Display username after login and logout link */
$.post('ajax/get_session.php', null, function (data) {
    if (data.username) {
        $('#anthrwpaki').html('<a href="user.html" class="capitals">' + data.username + '</a>');
        var txt = '<li><a href="#" data-toggle="modal" data-target="#myModal2">Logout!</a></li>';
        $('#anthrwpaki').after(txt);
        $('#insert').css('display', 'block');
        $('#insert-service').css('display', 'block');
        $('#index_info_hide').css('display', 'none');
        $('#index_info_hide2').css('display', 'none');
    }
    else {
        $('.add-buttons').on('show.bs.modal', function (e) {
            e.preventDefault();
            alert('Login first!');
        });
    }
}, 'json');
function checkDivs () {
    $.post('ajax/get_session.php', null, function (data) {
        if (data.username) {
            $('.dis').prop("disabled", false);
            $('.rating-container').removeClass('rating-disabled');
         }
    }, 'json');
}

var urlParams = getUrlParams();
function getUrlParams() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]).replace(/\+/g,' ');
  });
  return result;
}

/**Check if data for loging in is correct */
$('#signin-form').submit(function (event) {
    event.preventDefault();
    if ( !( $('#login_username').val().length < 3 || $('#login_username').val().length > 20 ) ) {
        if ( !( $('#login_password').val().length < 3 || $('#login_password').val().length > 20 ) ) {
            $.post('ajax/check_login.php', $(this).serialize(), function (data) {                
                if (data.user_found) {
                    window.location = window.location.href;
                } else if (data.mysql_error) {
                    alert(data.mysql_error);
                }
                else {
                    $('#login-check').show();
                }
            }, 'json');
        }
        else {
            $('.names-check').show();
        }
    }
    else {
        $('.names-check').show();
    }
});
/**Function to destroy session and log out */
function logout() {
    var scroll = $(document).scrollTop();
    $.post('ajax/session_close.php', null, function (data) {
        if (data.status === 'ok') {
            window.location = window.location.href;
        }
    }, 'json');
    return false;
}

/**Code for search-boxes to fill them from db */
$(document).ready(function(){  
    $('.search-form-product').submit(function (event) {
        var input = $(this).serialize();
        input = input.split("=");
        input=input[1];
        if ( input.length < 2 ){
            $('.search-alert').css('visibility', 'visible');
            event.preventDefault();
        }  
    }); 
    $('.search-form-service').submit(function (event) {
        var input = $(this).serialize();
        input = input.split("=");
        input=input[input.length-1];
        if ( input.length < 2 ){
            $('#service-alert').css('visibility', 'visible');
            event.preventDefault();
        }  
    }); 
    $('.search-form-store').submit(function (event) {
        var input = $(this).serialize();
        input = input.split("=");
        input=input[1];
        if ( input.length < 2 ){
            $('#store-alert').css('visibility', 'visible');
            event.preventDefault();
        }  
    });     
    $('#search-product').keyup(function(){
        $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'ajax/products_names.php',
        data:'keyword='+$(this).val(),
        success: function(data){
            var str = 'product';
            dropdownfunction(str, data);            
        }
        });
    });
    $('#search-service').keyup(function(){
        $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'ajax/services_names.php',
        data:'keyword='+$(this).val(),
        success: function(data){
            var str = 'service';
            dropdownfunction(str, data);
        }
        });
    });
    $('#search-address').keyup(function(){
        $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'ajax/addresses_names.php',
        data:'keyword='+$(this).val(),
        success: function(data){
            var str = 'address';
            dropdownfunction(str, data);
        }
        });
    });
}); 
/**Functions to create the dropdown menus with data from db */
function dropdownfunction(str, data){
    $('#'+str+'-search-box').html('');
    if( !data[str].length ) {
        $('#'+str+'-search-box-empty').css('display', 'block');
        $('#'+str+'-search-box').css('display', 'none');
    } else {
        for (item of data[str]){
            $('#'+str+'-search-box-empty').css('display', 'none');
            if  ( str == "address" ) {
                $('#'+str+'-search-box').append("<li class=\"dropdown-item\"><a href=\"javascript:;\">"+item.address+"</a></li>");
            }
            else{
                $('#'+str+'-search-box').append("<li class=\"dropdown-item\"><a href=\"javascript:;\">"+item.name+"</a></li>");
            }                        
        }
        $('#'+str+'-search-box').show();
    }    
}
/** Remove dropdown menu on focus out */
$('#search-product').on('focusout', function() {
    var str = 'product';
    put_value(str);
}); 
$('#search-service').on('focusout', function() {
    var str = 'service';
    put_value(str);
});
$('#search-address').on('focusout', function() {
    var str = 'address';
    put_value(str);
});
/**Function to hide dropdown menus or put the value to the field */
function put_value(str){
    if ( $('#'+str+'-search-box-empty li a:active').html() == 'Insert it!' ) {
        $('#'+str+'-search-box').hide();
        $.post('ajax/get_session.php', null, function (data) {
            if (data.username) {
                setTimeout(function() {
                    $('#'+str+'-search-box-empty').hide();
                }, 700);
            }
            else {
                $('#'+str+'-search-box-empty').hide();
                alert("You must log in!");
            }
        }, 'json');
    }
    else {
        var activeItem = $('#'+str+'-search-box li a:active').html();
        if( activeItem ) {
            activeItem =  $('#'+str+'-search-box li a:active');
            $('#search-'+str+'').val( $(activeItem).html() );
            $('#'+str+'-search-box').hide();
            $('#'+str+'-search-box-empty').hide();
        }
        else {
            $('#'+str+'-search-box').hide();
            $('#'+str+'-search-box-empty').hide();
        }  
    }
}

function drawRatingStars(num) {
    var FULL_STAR = '<i class="display-star glyphicon glyphicon-star"></i>';
    var SEMI_STAR = '<i class="display-star glyphicon glyphicon-star-semi"></i>';
    var EMPTY_STAR = '<i class="display-star glyphicon glyphicon-star-empty"></i>';

    var result = FULL_STAR.repeat( parseInt(num) );
    if (num % 1) result += SEMI_STAR;
    result += EMPTY_STAR.repeat( 5 - parseInt( Math.round(num) ) );

    return result;
}
$.post('ajax/get_best_products.php', {limit: 5}, function (response) {
    if (response.error) {
        alert(response.error);
        return;
    }

    for ( var product of response.products ) {
        var index = response.products.indexOf(product);
        var $el = $('#p' + index);
        product.avg =  Number( Math.round( (product.avg/2) * 2 ) / 2 );
        product.link = 'product.html?id=' + product.id;
        $el.find('a').attr('href', product.link);
        $el.find('.prod-name').text(product.name); 
        $el.find('.prod-type').text(product.type); 
        $el.find('.prod-avg').html( drawRatingStars(product.avg) + '(' + product.avg + ')' ); 
    }

}, 'json');
$.post('ajax/get_best_services.php', {limit: 5}, function (response) {
    if (response.error) {
        alert(response.error);
        return;
    }

    for ( var service of response.services ) {
        var index = response.services.indexOf(service);
        var $el = $('#s' + index);
        service.avg =  Number( Math.round( (service.avg/2) * 2 ) / 2 );
        service.link = 'service.html?search-address='+service.address+'&id='+service.id;
        $el.find('a').attr('href', service.link);
        $el.find('.store-name').text(service.name); 
        $el.find('.serv-type').text(service.type); 
        $el.find('.store-avg').html( drawRatingStars(service.avg) + '(' + service.avg + ')' ); 
    }

}, 'json');


var autocomplete;
function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical location types.
    autocomplete = new google.maps.places.Autocomplete((document.getElementById('address') ), {types: ['geocode']});
    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', addressSelected);
}

function addressSelected() {
    // var place = autocomplete.getPlace();

    // var temp = place.formatted_address.split(",");
    // var address = temp[0];
    // var regionPostalCode = temp[1];

    //  var mdata = {'id' : place.id, 'url' : place.url,
    //  'streetNumber' : place.address_components[0].long_name,
    //  'streetName' : place.address_components[1].long_name,
    //  'areaName' : place.address_components[2].long_name,
    //  'countryName' : place.address_components[6].long_name,
    //  'postalcode' : place.address_components[7].long_name};
    // if ( !place.address_components[7].long_name ) {
    //     mdata = {'town' : place.address_components[0].long_name,
    //     'area' : place.address_components[3].long_name,
    //     'countryName' : place.address_components[6].long_name};
    // }
    // console.log(mdata);
}

var element = $('.test');
var boxes = $('.box-left');
var userActivity = $('#users-info');
var userData = $('#users-activity');
var prodRating = $('.rate-left');
var inputRate = $('#rate-title');
var prodStores = $('.marg-left');
var navBar = $('.in');
if (screen.width < 960) {
    boxes.removeClass('box-left');
    element.removeClass('r-inline');
    userActivity.removeClass('fixed-pos');
    userActivity.width('auto');
    userActivity.css("left", "auto");
    userData.width('auto');
    userData.css("left", "auto");
    prodRating.removeClass('rate-left');
    inputRate.width('auto');
    navBar.removeClass('in');
}

$(window).resize(function() {
    var element = $('.test');
    if (screen.width < 960) {
        element.removeClass('r-inline');
    }
    else {
        element.addClass('r-inline');
    }
});