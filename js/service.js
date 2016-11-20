var temp = window.location.search.substring(1);
var serviceId = '';
var serviceName = '';
var servAddress = '';

if (temp.length > 0) {
    var res = temp.split("=");
    if ( res[0] == "id" ) {
        var str = res[1];
        var id = parseInt(str);
        var mdata = {'id' : id};

        $.post('ajax/get_service.php', mdata, function (data) {
            if(data.service){
                $('.no-display').hide();
                $('.empty-page').hide();
                $('.for-display').show();
                var service = data.service;
                $('#service-searched').html(service.name);
                //$('#searched-address').html(service.address);
                serviceId = service.id;
                serviceName = service.name;
                $('#element').attr("placeholder", service.name);
            } 
            else {
                $('.for-display').hide();
                $('.empty-page').show();
                $('.no-display').show();
            }  
            storesLoad();      
        }, 'json');
    }
    else {
        var an = temp.split('&');
        temp = an[1];
        var addr = an[0];
        res = temp.split('=');
        var t = addr.split('=');
        var str = res[1];
        var stra = t[1];
        temp = str.split('+');
        addr = stra.split('+');
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
        
        if(addr.length > 1) {
            str = "";
            for (i=0;i<addr.length;i++) {
                str = str + addr[i] + " ";
            }
            servAddress = str;
        }
        else {
            str = addr[0];
            servAddress = str;
        }
        $.post('ajax/get_service_by_name.php', mdata, function (data) {
            if(data.service){
                $('.no-display').hide();
                $('.empty-page').hide();
                $('.for-display').show();            
                var service = data.service;
                $('#service-searched').html(service.name);
                //$('#searched-address').html(service.address);
                serviceId = service.id;
                serviceName = service.name;
                $('#element').attr("placeholder", service.name);
            }  
            else {
                $('.for-display').hide();
                $('.no-display').show();
                $('.empty-page').show();            
                $('#serv-tit').html(mdata.name);
            }
            storesLoad();
        }, 'json');
    }
}
else {
    $('.empty-page').show();
}