#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 生成随机密码
SPECIAL_CHAR=$(echo '~!@#$%^&*()_+`-=' | fold -w2 | shuf | head -c2 )
NUMBER=$(date +%s%N | sha256sum | head -c6 )
PASSWORD=$(echo ${SPECIAL_CHAR}${NUMBER} | fold -w1 | shuf | tr -d '\n' )

# 创建密码
echo ${USER_NAME}:${PASSWORD}|chpasswd

# 输出密码
echo "Password is ${PASSWORD}"