/**Display username after login and logout link */
$.post('ajax/get_session.php', null, function (data) {
    if (data.username) {
        $('#anthrwpaki').html('<a href="user.html">' + data.username + '</a>');
        var txt = '<li><a href="#" data-toggle="modal" data-target="#myModal2">Logout!</a></li>';
        $('#anthrwpaki').after(txt);
        $('#insert').css('display', 'block');
        $('#insert-service').css('display', 'block');
        $('#index_info_hide').css('display', 'none');
        $('#index_info_hide2').css('display', 'none');

        var element = $('#add-comment-disabled');        
        element.removeClass('iflogout');
        element.addClass('iflogin');
        var element2 = $('#add-comment-enable');
        element2.removeClass('iflogin');
        element2.addClass('iflogout');
    }
    else {
        $('.add-buttons').on('show.bs.modal', function (e) {
            e.preventDefault();
            alert('Login first!');
        });
    }
}, 'json');

/**Check if data for loging in is correct */
$('#signin-form').submit(function (event) {
    event.preventDefault();
    $.post('ajax/check_login.php', $(this).serialize(), function (data) {
        if (data.user_found) {
            window.location = window.location.href;
        } else if (data.mysql_error) {
            alert(data.mysql_error);
        }
    }, 'json');
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
        //debugger
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


// $("#input-image-3").fileinput({
//     uploadUrl: "/site/image-upload",
//     allowedFileExtensions: ["jpg", "png", "gif"],
//     maxImageWidth: 200,
//     maxImageHeight: 150,
//     resizePreference: 'height',
//     maxFileCount: 1,
//     resizeImage: true
// }).on('filepreupload', function() {
//     $('#kv-success-box').html('');
// }).on('fileuploaded', function(event, data) {
//     $('#kv-success-box').append(data.response.link);
//     $('#kv-success-modal').modal('show');
// });

var autocomplete;
function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical location types.
    autocomplete = new google.maps.places.Autocomplete((document.getElementById('address') ), {types: ['geocode']});
    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', addressSelected);
}

function addressSelected() {
    var place = autocomplete.getPlace();

    var temp = place.formatted_address.split(",");
    var address = temp[0];
    var regionPostalCode = temp[1];

     var mdata = {'id' : place.id, 'url' : place.url,
     'streetNumber' : place.address_components[0].long_name,
     'streetName' : place.address_components[1].long_name,
     'areaName' : place.address_components[2].long_name,
     'countryName' : place.address_components[6].long_name,
     'postalcode' : place.address_components[7].long_name};
    if ( !place.address_components[7].long_name ) {
        mdata = {'town' : place.address_components[0].long_name,
        'area' : place.address_components[3].long_name,
        'countryName' : place.address_components[6].long_name};
    }
    console.log(mdata);
}

var element = $('.test');
if (screen.width < 960) {
    element.removeClass('r-inline');
}
else {
    element.addClass('r-inline');
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