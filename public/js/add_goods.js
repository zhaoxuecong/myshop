
$("#tab-title .tab-back").click(function(){
	;
	var ind = $(this).index();
	$(".tab-back").removeClass("tab-front").eq(ind).addClass("tab-front");
	$("table").removeClass("checked").eq(ind).addClass("checked");
});



$("#confirm").click(function(){
	//console.log(document.getElementById("goods_img").files[0])
	Upload();
})

function Upload(){
	var form = new FormData();
	form.append("sname",$(".goods_name").val());
	form.append("num",$("#num").val());
	form.append("type",$("#goods_type").children("option:selected").val());
	form.append("brand",$("#brand").children("option:selected").val());
	form.append("price",$("#shop_price").val());
	form.append("market_price",$("#market_price").val());
	form.append("stock",$("#stock").val());
	form.append("weight",$("#weight").val());
	form.append("sales",$("#sales").val());
	form.append("img",document.getElementById("goods_img").files[0]);
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/api/goods_upload");
	xhr.onreadystatechange = function(res){
		if (xhr.readyState==4 && xhr.status==200) {
			console.log(xhr.responseText);
			var res = JSON.parse(xhr.responseText);
			alert(res.message);
		}
	}
	xhr.send(form);
}





