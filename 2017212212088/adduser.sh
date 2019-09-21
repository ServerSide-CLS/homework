#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME
sudo useradd -m ${USER_NAME}

# 随机生成8位密码，其中包含两个特殊字符
cnt=1
numNormal=0
numSpecial=0
while [ $cnt -le 8 ]
do
	cnt=$(( $cnt+1 ))
	tmp="${RANDOM}"
	if [[ "${tmp}"%4 -eq 0 ]] && [[ numSpecial -le 1 ]] || [[ numNormal -ge 6 ]]
	then
		Special=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
		PASSWORD=${PASSWORD}${Special}
		numSpecial=$(( $numSpecial+1 ))
	else
		Normal=$(date +%s%N | sha256sum | head -c1 )
		PASSWORD=${PASSWORD}${Normal}
		numNormal=$(( $numNormal+1 ))
	fi
done

# 创建密码
#sudo passwd ${USER_NAME}
#echo $USER_NAME:$PASSWORD|chpasswd
#echo "123456" | passwd –stdin ${USER_NAME}
#echo ${USER_NAME}:${PASSWORD}|chpasswd
echo ${PASSWORD} | passwd ${USER_NAME} --stdin > /dev/null 2>&1

echo "Your initial password is:${PASSWORD}"

