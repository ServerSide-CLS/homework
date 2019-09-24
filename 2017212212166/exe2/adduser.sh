#!/bin/bash
# 输入用户名
read -p 'Enter username:' USER_NAME
# 输入用户描述
read -p 'Enter person info:' COMMENT
# 生成密码
function rand(){   
    min=$1   
    max=$(($2-$min+1))   
    num=$(date +%s%N)   
    echo $(($num%$max+$min))   
}   
PASSWORD=''
specialnum=0
normalnum=0
for((i=0;i<8;i+=1))
do
	PASSWORD1=$(date +%s%N | sha256sum | head -c1 )
	PASSWORD2=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
	rnd=$(rand 1 2) 
	if [[ $specialnum < 2 && $rnd > 1 ]]
	then
		PASSWORD=${PASSWORD}${PASSWORD2}
		specialnum=$(($specialnum+1))
	elif [[ $normalnum >=6 ]]
	then
		PASSWORD=${PASSWORD}${PASSWORD2}
		specialnum=$(($specialnum+1))
	else
		PASSWORD=${PASSWORD}${PASSWORD1}
		normalnum=$(($normalnum+1))
	fi
done
echo "your password:${PASSWORD}"
# 创建用户
sudo useradd -c "${COMMENT}" -m ${USER_NAME}
# 创建密码
echo ${USER_NAME}:${PASSWORD}|chpasswd

