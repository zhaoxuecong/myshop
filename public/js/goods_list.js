$(function(){
	var pageCurrent = $(".selectPage .on").html()
	function Gajax(){
		$.ajax({
			type:"post",
			url:"/api/goods_listajax",
			data:{
				condition: $(".keyword").val(),
				pageNO : pageCurrent,
				perPageCnt : $("#pageSize").val()
			},
			success:function(res){
				console.log(res)
				var data = res.data
				var tol = res.total;
			
				for(var key in data){
						var str = "";
					str += `<tr>
							<td>
								<input type="checkbox" />${data[key].id}
							</td>
							<td><span>${data[key].sname}</span></td>
							<td><span>${data[key].num}</span></td>
							<td><span>${data[key].price}</span></td>
							<td><img src="/images/home/no.gif"/> </td>
							<td><img src="/images/home/yes.gif"/> </td>
							<td><img src="/images/home/yes.gif"/> </td>
							<td><img src="/images/home/yes.gif"/> </td>
							<td><span>${data[key].sort}</span></td>
							<td><span>${data[key].stock}</span></td>
							<td><span>${data[key].sales}</span></td>
							<td>
								<a href="javascript:;"><img src="/images/home/icon_view.gif" /> </a>
								<a href="javascript:;"><img src="/images/home/icon_edit.gif" /> </a>
								<a href="javascript:;"><img src="/images/home/icon_copy.gif" /> </a>
								<a href="javascript:;"><img src="/images/home/icon_trash.gif" /> </a>
							</td>
						</tr>`	
					$(".shop_list").append(str)
				}
				
				$("#totalRecords").html(tol);
				var PagS = Math.ceil(tol/$("#pageSize").val());
				$("#totalPages").html(PagS);
				
				var optionLen = $(".selectPage option").length;
				var len = PagS-1;
				if(PagS>optionLen){
					for(var k = optionLen+1;k<=PagS;k++){
						var _option = "";
						_option += `<option value=${k}>${k}</option>`;
						$(".selectPage").append(_option);
					}
				}else{
					$(".selectPage").children("option:gt("+len+")").remove();
				}
				
				$("#pageCurrent").html(pageCurrent)
			}
		})
	}
	
	Gajax();
	//搜索
	$("#subtn").click(function(){
		$(".shop_list tr:gt(0)").remove();
		pageCurrent = 1;
		Gajax();
	})
	//分页
	$("#pageSize").keydown(function(e){
		if(e.keyCode == 13){
			$(".shop_list tr:gt(0)").remove();
			$(".selectPage").children("optin").eq(0).attr("selected",true);
			$(".selectPage").children("optin").eq(0).siblings().attr("selected",true);
			Gajax();
		}
	})
	
	var len = $(".selectPage option").length-1;
	//第一页
	$(".no1").click(function(){
		var page = 0;		
		skipPage(page);
	})
	
	//上一页
	$(".UpPage").click(function(){
		var page = parseInt($("#pageCurrent").html());		
		if(page<=1){
			page=0;
		}else{
			page -= 2;
		}
		skipPage(page);
	})
	
	//下一页
	$(".NextPage").click(function(){
		var page = parseInt($("#pageCurrent").html());		
		skipPage(page);
	})
	
	//最末页
	$(".LastPage").click(function(){
		var len = $(".selectPage option").length-1;
		var page = len;		
		skipPage(page);
	})
	
	//下拉页
	$(".selectPage").change(function(){
		var page = $(this).children("option:selected").val()-1;
		skipPage(page);
	})
	
	//跳转页函数
	function skipPage(page){
		var slectPage = $(".selectPage").children("option").eq(page)
		slectPage.attr("selected",true);
		slectPage.addClass("on").siblings().removeClass().attr("selected",false);
		pageCurrent = $(".selectPage .on").html()	
		$(".shop_list tr:gt(0)").remove();
		Gajax();

	}
})