var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Goods = new Schema({
	id     :	Number,
	type   : String,	
    sname  : String,
    num    : String,
    price   : String,
    putaway : Boolean,
    perfect : Boolean,
    news : Boolean,
    hot : Boolean,
    sort : Number,
    stock : Number,
    sales : Number,
    imgPat  : String,
    create_date: { type: Date, default: Date.now }
});
// 创建model对象
var GoodsModel = mongoose.model('goods', Goods);
// 公开对象，暴露接口
module.exports = GoodsModel;