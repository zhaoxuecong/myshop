var express = require('express');
var router = express.Router();
var UserModel = require("../model/User");
var GoodsModel = require("../model/Goods");
var multiparty = require("multiparty");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', {});
});

//登录
router.post('/api/login4ajax', function(req, res, next) {
	var username = req.body.username;
	var psw = req.body.psw;
	var num = req.body.num;
	var num_code = req.body.num_code;
	console.log(num);
	var result = {
		code: 1,
		message: "登录成功"
	};
	if(num != num_code){
		result.code = -202;
		result.message = "验证码错误"
	}else{
		UserModel.find({username: username, psw: psw}, (err, docs)=>{			
			if(docs.length == 0) {			
				result.code = -101;
				result.message = "您的账号或密码错误。请重新登录。"
			}
			res.json(result);
	})
		
	}
})

//添加商品
router.post('/api/goods_upload', function(req, res, next) {
	var form = new multiparty.Form({
		uploadDir : "public/images/goods_img"
	});
	var result = {
		code : 1,
		message : "商品保存成功"
	};
	form.parse(req,function(err,body,files){
		if(err){
			console.log(err);
		}
		console.log(body);
		var sname = body.sname[0];
		var num = body.num[0];
		var type = body.type[0];
		var price = body.price[0];
		var market_price = body.market_price[0];
		var brand = body.brand[0];
		var stock = body.stock[0];
		var weight = body.weight[0];
		var sales = body.sales[0];
		var imgPath = files["img"][0].path.replace("public\\","");
		var flag = 1;
		
		var gm = new GoodsModel();
		gm.sname = sname;
		gm.num = num;
		gm.type = type;
		gm.price = price;
		gm.market_price = market_price;
		gm.brand = brand;
		gm.stock = stock;
		gm.weight = weight;
		gm.sales = sales;
		gm.imgPath = imgPath;
		gm.flag = flag;
		gm.save(function(err){
			if(err){
				result.code = -101;
				result.message = "商品保存失败"
			}
			res.json(result);
		})
	})
	
})

//获取并查找以及删除商品
router.post('/api/goods_listajax', function(req, res, next) {
	var condition = req.body.condition;
	//console.log(condition);
	var dele = req.body.dele;
	console.log(dele)
	var pageNO = req.body.pageNO || 1;
	pageNO = parseInt(pageNO);
	var perPageCnt = req.body.perPageCnt || 10;
	perPageCnt = parseInt(perPageCnt);
	
	GoodsModel.count({flag : 1,type:{$regex: condition}}, function(err, count){
		console.log("数量:" + count);
		GoodsModel.update({num:dele},{$set:{flag:0}},function(err){
			var query = GoodsModel.find({flag:1,type:{$regex: condition}});
		
			query.limit(perPageCnt).skip((pageNO-1)*perPageCnt);
			query.exec(function(err,docs){
				//console.log(err,docs);
				var result = {
					total : count,
					data : docs,
					pageNo : pageNO
				}
				res.json(result)
			})
		});
		
	})
})

//编辑商品信息
router.post('/api/goods_redact', function(req, res, next) {
		
	var sum = req.body.sum;
		
	GoodsModel.find({flag:1,num:sum},function(err,docs){
		
		var result = {					
			data : docs					
		}
		res.json(result)
	})
	
});

router.post('/api/redact_goods_upload', function(req, res, next) {
	
	var result = {
		code : 1,
		message : "商品更改成功"
	};
	var sname = req.body.sname;
	var num = req.body.num;
	var type = req.body.type;
	var price = req.body.price;
	var market = req.body.market;
	var brand = req.body.brand;
	var stock = req.body.stock;
	var weight = req.body.weight;
	var sales = req.body.sales;
		
	GoodsModel.update({flag:1,num:num},{$set:{sname:sname,type:type,price:price,market_price:market,brand:brand,stock:stock,weight:weight,sales:sales}},function(err){
		
		if(err){
				result.code = -101;
				result.message = "商品保存失败"
			}
		res.json(result)
	})
	
});
			


router.get('/home', function(req, res, next) {	
	res.render('home', {});
});

router.get('/errorone', function(req, res, next) {	
	res.render('errorone', {});
});


module.exports = router;
