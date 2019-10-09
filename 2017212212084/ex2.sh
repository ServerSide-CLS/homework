#!/bin/bash

#输入用户名
read -p 'Enter username:' USER_NAME

#输入用户描述
read -p 'Enter person info:' COMMENT

#创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

#生成密码
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 |shuf | head -c4)
NORMAL=$(date +%s%N${RANDOM} |sha256sum |head -c6)
PASSWORD=${NORMAL}${SPECIAL_CHAR}

#创建密码
echo ${USER_NAME}:${PASSWORD}|chpasswd
echo "The password is : "
echo "${PASSWORD}"
