
$(".left-main .list").on("click",".lis",function(){
		
	var ind = $(this).index()+1;
	//console.log("ico_"+ind)
	//console.log($(this).attr("class"))
	if($(this).attr("class")=="lis ico_"+ind){
		
		$(this).removeClass("ico_"+ind).addClass("ico2_"+ind);
		$(this).children().css("display","block").parent().siblings().children().css("display","none");
		var sib = $(this).siblings();
		for(var i=0;i<sib.length;i++){
			//console.log(sib.eq(i))
			sib.eq(i).removeClass().addClass("lis ico_"+(sib.eq(i).index()+1));
				
		}
		$(".lis ul li").click(function(event){
			event.stopPropagation();
			$(this).children().addClass("on").parent().siblings().children().removeClass();
		})
	}else if($(this).attr("class")=="lis ico2_"+ind){
		$(this).removeClass("ico2_"+ind).addClass("ico_"+ind);
		$(this).children().css("display","none");		 	
		
	}
	
})

