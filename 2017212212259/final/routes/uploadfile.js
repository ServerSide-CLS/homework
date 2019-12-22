var multer  = require('multer')
var formidable=require("formidable")
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
    //设置保存文件的路径
    cb(null, 'uploads/'+ req.body.type)
},
filename: function (req, file, cb) {
    //修改上传文件名称
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
}
})
var upload = multer({ storage: storage });
var postTip=require('../mongodb/postdb');
module.exports = {
	uploadfile(req,res,postTip){
		var date=new Date();
		var year=date.getFullYear();
		var month=date.getMonth()+1;
		var strdate=date.getDate();
		var hour=date.getHours();
		var min=date.getMinutes();
		var sec=date.getSeconds();
		if(month>=1&&month<=9){
			month="0"+month;
		}
		if(strdate>=1&&strdate<=9){
			strdate="0"+strdate;
		}
		if(hour>=1&&hour<=9){
			hour="0"+hour;
		}
		if(min>=1&&min<=9){
			min="0"+min;
		}
		if(sec>=1&&sec<=9){
			sec="0"+sec;
		}
		var time=year+"-"+month+"-"+strdate+" "+hour+":"+min+":"+sec;
		var uploadFile = "";
		var form = new formidable.IncomingForm();
		form.encoding = 'utf-8';                  //上传文件编码格式
		form.uploadDir = "upload";                //上传文件保存路径
		form.keepExtensions = true;               //保持上传文件后缀
		form.maxFieldsSize = 300 * 1024 * 1024;  
		form.parse(req,function(err,fields,files){
			let p_title = fields.p_title;
			let aticle=fields.aticle;
			let part=fields.part;
			let uploadFile=files.file.path;
			let msg="";
			let is_empty=false;
			if(p_title==""){
				msg+="标题不得为空 ";
				is_empty=true;
			}
			if(aticle==""){
				msg+="帖子内容不得为空 ";
				is_empty=true;
			}
			if(is_empty){
				res.render("postinfo",{is_login:true,id:req.session.now_user.id,empty_tip:msg});
			}else{
				var newpostTip=new postTip({
					title:p_title,
					part:part,
					time:time,
					aticles:aticle,
					Pfile:uploadFile,
					look_count:0,
					good_count:0,
					author:req.session.now_user.id
				})
				newpostTip.save(function(err,postTip){
					if(err)
						res.render("isCorrectRegister",{fail:"数据库连接失败"});
					else
						res.render("home",{is_login:true,postSuccess:"发帖成功！",id:req.session.now_user.id,is_active1:"active",isTable:true});
				});
			}

		});
	}
}