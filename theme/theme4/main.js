$('#menu .maxMenu').on('scroll', function(e){

	var menuA = $('#menu .maxMenu a');
	menuA.addClass('disable');
})
$('#menu .maxMenu').on('touchend', function(e){
    
	var menuA = $('#menu .maxMenu a');
    setTimeout(function(){
        menuA.removeClass('disable')
    }, 100)
})

$('#menu .subMenu').on('scroll', function(e){

	var menuB = $('#menu .subMenu a');
	menuB.addClass('disable');
})
$('#menu .subMenu').on('touchend', function(e){
    
	var menuB = $('#menu .subMenu a');
    setTimeout(function(){
        menuB.removeClass('disable')
    }, 100)
})
$("#menu .home").off("touchstart").on("touchstart",function(){
	console.log("Theme 4 init thing")

	ARGO.init("flow1",0);
});