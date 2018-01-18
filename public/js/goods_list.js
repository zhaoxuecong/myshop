
$(function(){
	$.ajax({
		type:"get",
		url:"/api/goods_listajax",
		success:function(data){
			var str = "";
			for(var key in data){
				str += `<tr>
						<td>
							<input type="checkbox" />101
						</td>
						<td><span>钻戒</span></td>
						<td><span>ECS000101</span></td>
						<td><span>1999.00</span></td>
						<td><img src="/images/home/no.gif"/> </td>
						<td><img src="/images/home/yes.gif"/> </td>
						<td><img src="/images/home/yes.gif"/> </td>
						<td><img src="/images/home/yes.gif"/> </td>
						<td><span>100</span></td>
						<td><span>0</span></td>
						<td><span>0</span></td>
						<td>
							<a href="javascript:;"><img src="/images/home/icon_view.gif" /> </a>
							<a href="javascript:;"><img src="/images/home/icon_edit.gif" /> </a>
							<a href="javascript:;"><img src="/images/home/icon_copy.gif" /> </a>
							<a href="javascript:;"><img src="/images/home/icon_trash.gif" /> </a>
						</td>
					</tr>`
				$(".list-div table tbody").append(str)
			}
		}
	})
})
