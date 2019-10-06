#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME

# 创建用户
sudo useradd  -m ${USER_NAME}


num1=0
num2=0
i=0
while [ $i -le 8 ]
do
	i=$(( $i+1 ))
	p="${RANDOM}"
	if  [[ num1 -ge 2 ]]||[[ "${p}"%10 -le 5 ]] && [[ num2 -le 5 ]]
	then
		PASSWORD=${PASSWORD}$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c1 )
		num2=$(( $num2+1 ))
	else

		PASSWORD=${PASSWORD}$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
		num1=$(( $num1+1 ))
	fi
done

# 创建密码
echo ${PASSWORD} | passwd ${USER_NAME} --stdin > /dev/null 2>&1

echo "Your password is "${PASSWORD}"."

