$("#tab-title .tab-back").click(function(){
	;
	var ind = $(this).index();
	$(".tab-back").removeClass("tab-front").eq(ind).addClass("tab-front");
	$("table").removeClass("checked").eq(ind).addClass("checked");
});