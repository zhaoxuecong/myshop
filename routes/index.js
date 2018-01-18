var express = require('express');
var router = express.Router();
var UserModel = require("../model/User");
var GoodsModel = require("../model/Goods");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', {});
});

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

router.post('/api/goods_listajax', function(req, res, next) {
	
}

router.get('/home', function(req, res, next) {	
	res.render('home', {});
});

router.get('/errorone', function(req, res, next) {	
	res.render('errorone', {});
});


module.exports = router;
