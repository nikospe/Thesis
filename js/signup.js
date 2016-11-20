$("#checkbox").change(function() {
    if(this.checked) {
        $("#company_name_form").css({"display": "block"});
    }
    else {
        $("#company_name_form").css({"display": "none"});
    }
});


$('#company_name').keyup(function() {
    if ( $('#company_name').val().length > 0 ) {
        if ( $('#company_name').val().length < 2 || $('#company_name').val().length > 60 ) {
            $('#company-check').show();            
        }
        else {
            $('#company-check').hide();
        }
    }
    else {
        $('#company-check').hide();
    }
    $('#company-check').trigger('cssChanged');
});
$('#firstname').keyup(function() {
    if ( $('#firstname').val().length > 0 ) {
        if ( $('#firstname').val().length < 2 || $('#firstname').val().length > 60 ) {
            $('#firstname-check').show();            
        }
        else {
            $('#firstname-check').hide();
        }
    }
    else {
        $('#firstname-check').hide();
    }
    $('#firstname-check').trigger('cssChanged');
});
$('#lastname').keyup(function() {
    if ( $('#lastname').val().length > 0 ) {
        if ( $('#lastname').val().length < 2 || $('#lastname').val().length > 60 ) {
            $('#lastname-check').show();            
        }
        else {
            $('#lastname-check').hide();
        }
    }
    else {
        $('#lastname-check').hide();
    }
    $('#lastname-check').trigger('cssChanged');
});
$('#email').keyup(function() {
    if ( $('#email').val().length > 0 ) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'ajax/check_email_exist.php',
            data:'keyword='+$(this).val(),
            success: function(data){
                if ( data.emailFound ) {
                    $('#email-exist-check').show();
                    checkCode();
                }
                else{
                    $('#email-exist-check').hide();
                    checkCode();
                }
            }
        });
        if ( $('#email').val().length < 2 || $('#email').val().length > 60 ) {
            $('#email-check').show();            
        }
        else {
            $('#email-check').hide();
        }
    }
    else {
        $('#email-check').hide();
    }
    $('#email-check').trigger('cssChanged');
});
$('#username').keyup(function() {
    if ( $('#username').val().length > 0 ) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'ajax/check_username_exist.php',
            data:'keyword='+$(this).val(),
            success: function(data){
                if ( data.usernameFound ) {
                    $('#username-exist-check').show();
                    checkCode();
                }
                else{
                    $('#username-exist-check').hide();
                    checkCode();
                }
            }
        });
        if ( $('#username').val().length < 4 || $('#username').val().length > 20 ) {
            $('#username-check').show();            
        }
        else {
            $('#username-check').hide();
        }
    }
    else {
        $('#username-check').hide();
    }
    $('#username-check').trigger('cssChanged');
});
$('#password').keyup(function() {
    if ( $('#password').val().length > 0 ) {
        if ( $('#password').val().length < 4 || $('#password').val().length > 20 ) {
            $('#password-check').show();            
        }   
        else {
            $('#password-check').hide();
        } 
    }
    else {
        $('#password-check').hide();
    }
    $('#password-check').trigger('cssChanged');
});
$('#confirm_password').keyup(function() {
    if ( $('#password').val().length > 0 ) {
       if ( $('#confirm_password').val() != $('#password').val() ) {
            $('#confirm-password-check').show();
        } 
        else {
            $('#confirm-password-check').hide();
        }
    }
    else {
        $('#confirm-password-check').hide();
    }
    $('#confirm-password-check').trigger('cssChanged');
});
$('input:checkbox').change( function() {
    if ($(this).is(':checked')) {
        checkCode();
    }
    else {
        checkCode();
    }
});

$('.spans').bind('cssChanged', function(){
    checkCode();
});

function checkCode() {
    if ( $('#firstname-check').css('display') == 'none'
    && $('#lastname-check').css('display') == 'none' 
    && $('#email-check').css('display') == 'none' 
    && $('#username-check').css('display') == 'none' 
    && $('#password-check').css('display') == 'none' 
    && $('#confirm-password-check').css('display') == 'none'
    && !($('#username-exist-check').css('display') == 'inline')
    && !($('#email-exist-check').css('display') == 'inline')
    && $('#lastname').val().length > 0
    && $('#firstname').val().length > 0
    && $('#email').val().length > 0
    && $('#username').val().length > 0
    && $('#password').val().length > 0
    && $('#confirm_password').val().length > 0 ) {
        if ( $('#checkbox').is(":checked") ){
            if ( $('#company-check').css('display') == 'none'
            && $('#company_name').val().length > 0 ){
                $('#signupButton').prop("disabled", false);
            }
            else {
                $('#signupButton').prop("disabled", true);
            }
        }
        else {
            $('#signupButton').prop("disabled", false);
        }                
    }
    else {
        $('#signupButton').prop("disabled", true);
    }
}

$("#signup-new_user-form").submit(function (event) {
    event.preventDefault();
    $.post("ajax/add_new_user.php", $(this).serialize(), function (data) {
        if (data.mysql_query_status) {
            window.location = 'index.html';
        } else if (data.mysql_error) {
            alert(data.mysql_error);
        }
    }, 'json');
});