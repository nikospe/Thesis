var temp = window.location.search.substring(1);
var serviceId = '';
if (temp.length > 0) {
    var res = temp.split("=");
    if ( res[0] == "id" ) {
        var str = res[1];
        var id = parseInt(str);
        var mdata = {'id' : id};

        $.post('ajax/get_service.php', mdata, function (data) {
            if(data.service){
                $('.no-display').hide();
                $('.for-display').show();
                var service = data.service;
                $('#service-searched').html(service.name);
                //$('#searched-address').html(service.address);
                serviceId = service.id;
                $('#element').attr("placeholder", service.name);
            } 
            else {
                $('.for-display').hide();
                $('.no-display').show();
            }        
        }, 'json');
    }
    else {
        var an = temp.split('&');
        temp = an[1];
        res = temp.split('=');
        var str = res[1];
        temp = str.split('+');
        if(temp.length > 1) {
            str = "";
            for (i=0;i<temp.length;i++) {
                str = str + temp[i] + " ";
            }
            var mdata = {'name' : str};
        }
        else {
            str = temp[0];
            var mdata = {'name' : str};
        }
        $.post('ajax/get_service_by_name.php', mdata, function (data) {
            if(data.service){
                $('.no-display').hide();
                $('.for-display').show();            
                var service = data.service;
                $('#service-searched').html(service.name);
                //$('#searched-address').html(service.address);
                serviceId = service.id;
                $('#element').attr("placeholder", service.name);
            }  
            else {
                $('.for-display').hide();
                $('.no-display').show();            
                $('#serv-tit').html(mdata.name);
            }
        }, 'json');
    }
}