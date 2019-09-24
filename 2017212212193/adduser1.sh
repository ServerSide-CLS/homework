#!/bin/bash

# 输入用户名
read -p 'Enter username:' user_name

#输入用户描述
read -p 'Enter person info:' comment

#创建密码
Password=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
password=${Password}${SPECIAL_CHAR}${SPECIAL_CHAR}
password=$(echo "${password}" | fold -w1 | shuf | tr -d "\n")
echo "password is ${password}"

useradd -c "${comment}" -m ${user_name}

echo ${user_name}:${password}|chpasswd

passwd -e ${user_name}




