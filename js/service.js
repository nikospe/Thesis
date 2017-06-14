var serviceId = '';
var serviceName = '';
var servAddress = '';

if ( urlParams.hasOwnProperty('id') ) {
    if ( !urlParams['search-address'] == null ) {
        servAddress = urlParams['search-address'];
    }
    $.post('ajax/get_service.php', urlParams, function (data) {
        if(data.service){
            $('.no-display').hide();
            $('.empty-page').hide();
            $('.for-display').show();
            var service = data.service;
            $('#service-searched').html(service.name);
            serviceId = service.id;
            serviceName = service.name;
            $('#element').attr("placeholder", service.name);
            storesLoad(); 
        } 
        else {
            $('.for-display').hide();
            $('.empty-page').show();
            $('.no-display').show();
        }  
                
    }, 'json');
}
else if ( !('' in urlParams) ) {
    if ( urlParams.hasOwnProperty('search-service') ){
        mdata = { 'name' : urlParams['search-service'] }
        servAddress = urlParams['search-address'];
    } else {
        mdata = { 'name' : decodeURIComponent(Object.keys(urlParams)[0]) }
        servAddress = urlParams['search-address'];
    }
    $.post('ajax/get_service_by_name.php', mdata, function (data) {
        if(data.service){
            $('.no-display').hide();
            $('.empty-page').hide();
            $('.for-display').show();            
            var service = data.service;
            $('#service-searched').html(service.name);
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
else {
    $('.empty-page').show();
}