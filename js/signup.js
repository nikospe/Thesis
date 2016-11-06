$("#checkbox").change(function() {
    if(this.checked) {
        $("#company_name_form").css({"display": "block"});
    }
    else {
        $("#company_name_form").css({"display": "none"});
    }
});

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