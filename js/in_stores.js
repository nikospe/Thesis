var address = '';
var locations = [];
var gotScripts = 0;
var name = 0;
var rate = [];
var len = 0;
var sum =[];

function setRate (rate) {
    for ( k=0; k<len; k++ ){
        var val = 0;
        var id = $('.changeme')[k].id;
        rate[id] = rate[id]/sum[id];
        var finalRate = Number( Math.round( ( rate[id]/2 ) * 2 ) / 2 );
        $('#'+id).html(drawRatingStars(finalRate) + '(' + finalRate + ')' );
    }
}

var flag = [];
function test( id, address ) { 
    $('.store-comment-button').prop("disabled", true);
    if($('.'+id).css('display') == 'none') {
        $('.'+id).show();
        $('.leave-blank').hide();
                
        storeMap(address, id);           
        if( !gotScripts ) { 
            $.getScript("js/insertStoreRating.js", function(){         
            });  
            $.getScript("js/star-rating.js", function(){         
            });  
            checkDivs();
            gotScripts = 1;
        }       
        if ( !flag[id] ) {            
            rates(id); 
            flag[id] = 1;
        }
    }
    else {
        $('.leave-blank').hide();
        $('.'+id).hide();
    }
}
function showRatings(id){
    if($('.stor_com'+id).css('display') == 'none') { 
        $('.stor_com'+id).show();
    }
    else {
        $('.stor_com'+id).hide();
    } 
}
function rates(id) {
    var mdata = { 'storeId' : id }; 
    $.post('ajax/select_stores_ratings.php', mdata, function (data) {                    
        var ratings = data.ratings;
        if ( ratings.length ) {
            for( var rating of ratings ) { 
                rating.rating_strength = rating.rating_strength / 2;
                $("<h4 class='capitals'><b>"+rating.username+"</b></h4>"
                +"<h5>"+rating.title+"</h5>"   
                +"<h5>Rate: ("+rating.rating_strength+" / 5)</h5>"            
                +"<h6 class='text_to_end'>"+rating.time+"</h6>"           
                +"<hr>").appendTo( "#rr"+id+"" );                
            }
        }
    }, 'json'); 
}
function storesCalc(store) {
    if ( name == 0 ) { 
        sum['r'+store.id] = 1; 
        rate['r'+store.id] = store.rating_strength;                                                                                 
        name = store.name;  
        len = len + 1;                                                                               
        storeAppend(store);
    }
    else {
        if ( name == store.name ) {  
            rate['r'+store.id] = parseInt(rate['r'+store.id])+parseInt(store.rating_strength); 
            sum['r'+store.id] = parseInt(sum['r'+store.id]) + 1;                                                           
        } 
        else {
            len = len + 1;  
            sum['r'+store.id] = 1; 
            rate['r'+store.id] = store.rating_strength;                     
            storeAppend(store);
        } 
    }                                                                                     
}

function storesLoad() {
    if ( window.location.pathname.includes('product') ) {        
        var sdata = { 'id' : productId };
        $.post('ajax/select_stores_for_product.php', sdata, function (data) {                        
             var stores = data.stores;
             if( stores.length ) {              
                 for( var store of stores ) {  
                     storesCalc(store);                                                                              
                 } 
                 setRate(rate);                
             }
        }, 'json');       
    }
    else if ( window.location.pathname.includes('service') ) {
        mdata = { 'id' : serviceId, 'address': decodeURIComponent(servAddress).trim() };
        $.post('ajax/select_stores_for_service.php', mdata, function (data) {
            var stores = data.stores;
             if( stores.length ) {
                 var count = 0;
                 for( var store of stores ) {                                                                            
                     locations[count] =  store.address;
                     count = count + 1; 
                     storesCalc(store);                               
                 }
                 setRate(rate);
                 allMaps(locations);
             }
        }, 'json');
    }
}

function storeAppend (store) {
    name = store.name;
    address = store.address;
    $("<div class='row marg-left'>"
    +"<div class='col-md-8 descript-stores white-background stores stores-left left-right-shadow'>"
    +"<div class='row'><hr><div class='col-md-3 visible-lg-block shop-logo-row'>"               
    +"<a class='shop-logo' href='javascript:;' onClick='test("+store.id+", \""+address+"\");'>"
    +"<img class='stores-image' alt='' data-src='' src='icons/map.png'></a>"
    +"<br><hr class='fif'><h4 class='titles'>Store Rating</h4>"
    +"<div class='changeme' id='r"+store.id+"'></div><span>"               
    +"</div><p id='r"+store.id+"'></p><div class='col-md-9'><h3 class='titles'>"+store.name+"</h3>"
    +"<h4 class='addresses'>"+store.address+"</h4>"
    +"<h5>Click the store icon to find it on Google map, rate store and comment.</h5>"                    
    +"</div></div><div class='row google_map_none "+store.id+"'>"
    +"<div class='col-md-12'>"
    +"<div class='marg' id='"+store.id+"' style='width:100%;height:350px'>"
    +"</div><hr><h4 class='submain-color'>Rate this store:</h4>"
    +"<form class='store-rating' id='"+store.id+"'>"
    +"<input name='title' id='title' type='text' placeholder='Give a description for yor rating!'/>"
    +"<input id='rating' value='0' type='number' class='rating dis' name='rate' min=0 max=5 step=0.5 data-size=\"sm\">"
    +"<button class='btn btn-success marg dis' value='Submit' type='submit' disabled>Rate!</button>"
    +"<p class='leave-blank' style='display:none;'>Title and rating must not be empty!</p></form>"
    +"</div><div class='col-md-12 marg'><a href='javascript:;' onClick='showRatings("+store.id+")'>See ratings and comments"
    +"<span class='glyphicon glyphicon-chevron-right main-blue'></span></a>"
    +"<div class='marg stor_com"+store.id+"' style='display:none;' id='store-comments'>"
    +"<div id='c"+store.id+"'></div>"
    +"<h4 class='submain-color'>Ratings: </h4><hr><div id='rr"+store.id+"'></div></div></div>"
    +"</div></div></div></div>").appendTo("dyn-stores");                      
}