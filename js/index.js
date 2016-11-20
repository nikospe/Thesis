function setActiveNavPill(index) {
    $('.nav.nav-pills li').removeClass('active');
    $('.nav.nav-pills li').slice(index,index+1).addClass('active');
    var type = $('.nav.nav-pills li.active').text().trim().toLowerCase();
    updateSearchFields(type);
}

function updateSearchFields(type) {
    if ( type == 'products') {
        $('#product-search-bar').css('display', 'block');
        $('#service-search-bar').css('display', 'none');
        $('#store-search-bar').css('display', 'none');
    }
    else if ( type == 'services') {
        $('#service-search-bar').css('display', 'block');
        $('#product-search-bar').css('display', 'none');
        $('#store-search-bar').css('display', 'none');
    }
    else {
        $('#store-search-bar').css('display', 'block');
        $('#product-search-bar').css('display', 'none');
        $('#service-search-bar').css('display', 'none');
    }
}


