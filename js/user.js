$.post('ajax/get_session.php', null, function (data) {
    if(data.username){
        $.post('ajax/user.php', data, function (data) {
            if(data.user){
                var user = data.user;
                if (user.enterprise == 1){
                    $('#company_name_in-user').css({"display": "block"});
                    $('#user_company_name').html(user.company_name);
                }
                $('#user_fullname').html(user.firstname+ ' ' +user.lastname);
                $('#user_email').html(user.email);
                $('#user_username').html(user.username);
                $('#user_join').html(user.join);
            }
        }, 'json'); 
    }
}, 'json');

