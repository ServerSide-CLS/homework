#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT
# 生成2个随机字符
SPECIAL_CHAR1=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
SPECIAL_CHAR2=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
# 随机决定随机字符所在位置
while :
do
	ran1=$((RANDOM % 7 + 1))
	ran2=$((RANDOM % 7 + 1))
	if [[ "${ran1}" -ne "${ran2}" ]]
	then
		break
	fi
done
# 循环添加字符
str=""

for((i=1;i<=8;i++));
do
	if [[ "${i}" -eq "${ran2}" ]]
	then
		str=${str}${SPECIAL_CHAR2} 
	fi
	if [[ "${i}" -eq "${ran1}" ]]
	then
		str=${str}${SPECIAL_CHAR1}
	fi
	if [[ "${i}" -ne "${ran2}" ]] && [[ "${i}" -ne "${ran1}" ]]
	then
	onepwd=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c1 ) 
	str=${str}${onepwd}
	fi	
done
# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 创建密码
echo ${USER_NAME}:${str}|chpasswd

echo "Your password is ${str}"
# 首次登录修改密码
passwd -e ${USER_NAME}

