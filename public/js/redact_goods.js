

$("#tab-title .tab-back").click(function(){
	;
	var ind = $(this).index();
	$(".tab-back").removeClass("tab-front").eq(ind).addClass("tab-front");
	$("table").removeClass("checked").eq(ind).addClass("checked");
});


Reajax();
$("#confirm").click(function(){
	//console.log(document.getElementById("goods_img").files[0])
	Upload();
	
})

function Upload(){
	var sname = $(".goods_name").val();
	var num = $("#num").val();
	var type = $("#goods_type").children("option:selected").val();
	var brand = $("#brand").children("option:selected").val();
	var price = $("#shop_price").val();
	var market = $("#market_price").val();
	var stock = $("#stock").val();
	var weight = $("#weight").val();
	var sales = $("#sales").val()
	console.log(sname)
	$.ajax({
		type:"post",
		url:"/api/redact_goods_upload",
		data:{
			sname : sname,
			num : num,
			type : type,
			brand : brand,
			price : price,
			market :market,
			stock : stock,
			weight : weight,
			sales : sales
		},
		success:function(){
			alert("更改商品信息成功")
		}
	});
//	var form = new FormData();
//	form.append("sname",);
//	form.append("num",);
//	form.append("type",);
//	form.append("brand",);
//	form.append("price",);
//	form.append("market_price",);
//	form.append("stock",);
//	form.append("weight",);
//	form.append("sales",);
//	form.append("img",document.getElementById("goods_img").files[0]);
//	
//	var xhr = new XMLHttpRequest();
//	xhr.open("POST", "/api/redact_goods_upload");
//	xhr.onreadystatechange = function(res){
//		if (xhr.readyState==4 && xhr.status==200) {
//			console.log(xhr.responseText);
//			var res = JSON.parse(xhr.responseText);
//			alert(res.message);
//		}
//	}
//	xhr.send(form);
}


	
//	var hp = window.location.href;
//	
//	var add = hp.split("?")[1]	
//	var id = add.split("=")[1];
//	console.log(id);
//获取后台商品信息
function Reajax(){
	var hp = window.location.href;
	var add = hp.split("?")[1];
	var id = add.split("=")[1];
	
	$.ajax({
		type:"post",
		url:"/api/goods_redact",
		data:{
			sum : id
		},
		success:function(d){
			//console.log(d)
			var data = d.data;
			for(var key in data){
				console.log(data[key].type)
				$(".goods_name").val(data[key].sname);
				$("#num").val(data[key].num);
				$("#goods_type").children("option:selected").val(data[key].type);
				$("#brand").children("option:selected").val(data[key].brand);
				$("#shop_price").val(data[key].price);
				$("#market_price").val(data[key].market_price);
				$("#stock").val(data[key].stock);
				$("#weight").val(data[key].weight);
				
			}
			
			
			
		}
	});
}



