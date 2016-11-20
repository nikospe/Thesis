$(window).scroll( function() {
    var element = $('#users-info');
    var elem = $('#activity-head');
    var height = 0;
        if ( $(document).scrollTop() >= $('#users-activity').height() - 300 ) {
            element.removeClass('fixed-pos');
            element.addClass('absolute-pos');
        }
        else{
            element.addClass('fixed-pos');
            element.removeClass('absolute-pos');
            
        }
        if ( $(document).scrollTop() >= $('#users-activity').height() - element.height() + 80 ) {
            elem.removeClass('fixed-poss');
            elem.addClass('absolute-poss');
        }
        else {
            elem.addClass('fixed-poss');
            elem.removeClass('absolute-poss');
        }
});

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

$.post('ajax/get_user_activity.php', null, function (data) {
    if ( data.com_activities.length ) {
        var activities = data.com_activities;
        for ( activity of activities ) {
            $("<h5>Comment: "+activity.comment+"</h5>"
            +"<h5>Store: "+activity.name+"</h5>"
            +"<h5>Address: "+activity.address+"</h5>"
            +"<h5 class='text_to_end'>"+activity.time+"</h5><hr>").appendTo('#activity-comment-info');
        }
    }
}, 'json');

$.post('ajax/get_user_rate_activity.php', null, function (data) {
    if ( data.activities.length ) {
        var activities = data.activities;
        for ( activity of activities ) {
            if ( activity.pname == null ) {
                $("<h5>Title: "+activity.title+"</h5>"
                +"<h5>Rate Value: "+(activity.rating_strength/2)+"</h5>"
                +"<h5>Name: "+activity.name+"</h5>"
                +"<h5>Address: "+activity.address+"</h5>"
                +"<h5 class='text_to_end'>"+activity.time+"</h5><hr>").appendTo('#rate-activity-comment-info');
            }
            else {
               $("<h5>Title: "+activity.title+"</h5>"
                +"<h5>Rate Value: "+(activity.rating_strength/2)+"</h5>"
                +"<h5>Name: "+activity.pname+"</h5>"
                +"<h5 class='text_to_end'>"+activity.time+"</h5><hr>").appendTo('#rate-activity-comment-info'); 
            }
        }
    }
}, 'json');