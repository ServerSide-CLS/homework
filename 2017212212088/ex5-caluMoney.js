var arguments = process.argv.splice(2);
var flag_n = 0;
var flag_l = 0;
var flag_a = 0;
var flag_name;
var cnt = 0;
var flag_na = 0;
for (var i in arguments){
    if(arguments[i] == "-n"){
    	flag_n++;
    	if(cnt != -1){
			cnt = 1;
    	}
    }
    else if(arguments[i] == "-l"){
    	flag_l++;
    }
    else if(arguments[i] == "-a"){
    	flag_a++;
    }
    else{
    	flag_name = arguments[i];
    	flag_na = 1;
    	if(cnt != 2){
    		cnt = -1;
    	}
    }
    if(cnt != 0 && cnt != -1){
    	cnt++;
    }
}
if(flag_n == 0 && flag_l == 0 && flag_a == 0){
	console.log("请输入参数！");
}
else if(cnt == -1 || flag_n >= 2 || flag_l >= 2 || flag_a >= 2 || flag_a != 0 && (flag_l != 0 || flag_n != 0) || flag_n != 0 && flag_na == 0){
	console.log("输入的参数不合法！");
}
else{
	if(true){
		var fs = require('fs');
		var data = fs.readFileSync('study.txt');
		var Da = data.toString().split(/[ \n]/g);
		var cnt = 0;
		var Name = "";
		for (var i in Da){
			if(Da[i] != ''){
				if(cnt % 4 == 0){
					var Tmp = Name.toString().split(" ");
					var Flag = 1;
					for (var j in Tmp){
						if(Tmp[j] == Da[i]){
							Flag = 0;
							break;
						}
					}
					if(Flag == 1){
						if(Name != ""){
							Name = Name + " ";
						}
						Name = Name + Da[i];
					}
				}
				cnt++;
			}
		}
		Name = Name.toString().split(" ");
		var most_money = -0x3f3f3f3f;
		var most_money_name = "";
		var least_money = 0x3f3f3f3f;
		var least_money_name = "";
		for (var i in Name){
			var totol = 0;
			var flag = 0;
			var cnt = 0;
			var Flag_n_l = 0;
			var Message = "";
			for (var j in Da){
				if(Da[j] != ''){
					if(cnt % 4 == 0 && Name[i] == Da[j]){
						flag = 1;
					}
					else if(cnt % 4 == 0 && Name[i] != Da[j]){
						flag = 0;
					}
					else if(cnt % 4 == 3 && flag == 1){
						totol += parseInt(Da[j]);
					}
					if(flag_l != 0 && flag_n != 0 && flag_name == Name[i]){
						if(cnt % 4 == 0 && flag_name == Da[j]){
							Flag_n_l = 1;
						}
						else if(cnt % 4 == 0 && flag_name != Da[j]){
							Flag_n_l = 0;
						}
						if(cnt % 4 == 0){
							Message = "";
						}
						if(Flag_n_l == 1){
							if(Message != ""){
								Message = Message + " ";
							}
							Message = Message + Da[j];
						}
						if(cnt % 4 == 3 && Flag_n_l == 1){
							console.log(Message);
						}
					}
					cnt++;
				}
			}
			if(flag_l != 0 && flag_n == 0){
				console.log(Name[i] + " " + totol);
			}
			else if(flag_l == 0 && flag_n != 0){
				if(flag_name == Name[i]){
					console.log(totol);
				}
			}
			else if(flag_a != 0){
				if(most_money < totol){
					most_money = totol;
					most_money_name = Name[i];
				}
				else if(most_money == totol){
					most_money_name = most_money_name + " " + Name[i];
				}
				if(least_money > totol){
					least_money = totol;
					least_money_name = Name[i];
				}
				else if(least_money == totol){
					least_money_name = least_money_name + " " + Name[i];
				}
			}
		}
		if(flag_a != 0){
			console.log("赚钱最多的学生:    " + most_money_name);
			console.log("赚钱最少的学生:    " + least_money_name);
			var cnt = 0;
			var date_ = "";
			for (var i in Da){
				if(Da[i] != ''){
					if(cnt % 4 == 1){
						var Tmp = date_.toString().split(" ");
						var Flag = 1;
						for (var j in Tmp){
							if(Tmp[j] == Da[i]){
								Flag = 0;
								break;
							}
						}
						if(Flag == 1){
							if(date_ != ""){
								date_ = date_ + " ";
							}
							date_ = date_ + Da[i];
						}
					}
					cnt++;
				}
			}
			date_ = date_.toString().split(" ");
			var Most_money = -0x3f3f3f3f;
			var Most_money_date = "";
			var Least_money = 0x3f3f3f3f;
			var Least_money_date = "";
			for (var i in date_){
				var totol = 0;
				var flag = 0;
				var cnt = 0;
				for (var j in Da){
					if(Da[j] != ''){
						if(cnt % 4 == 1 && date_[i] == Da[j]){
							flag = 1;
						}
						else if(cnt % 4 == 1 && date_[i] != Da[j]){
							flag = 0;
						}
						else if(cnt % 4 == 3 && flag == 1){
							totol += parseInt(Da[j]);
						}
						cnt++;
					}
				}
				if(Most_money < totol){
					Most_money = totol;
					Most_money_date = date_[i];
				}
				else if(Most_money == totol){
					Most_money_date = Most_money_date + " " + date_[i];
				}
				if(Least_money > totol){
					Least_money = totol;
					Least_money_date = date_[i];
				}
				else if(Least_money == totol){
					Least_money_date = Least_money_date + " " + date_[i];
				}
			}
			console.log("赚钱最多的日子:    " + Most_money_date);
			console.log("赚钱最少的日子:    " + Least_money_date);
		}
	}
}
