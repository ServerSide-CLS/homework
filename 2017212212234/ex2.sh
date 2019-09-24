#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 生成密码
NORMOL=$(date +%s%N${RANDOM} | sha256sum | head -c6 )
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | tr -d '\n' | head -c2 )
PASSWORD=$(echo ${SPECIAL_CHAR}${NORMOL} | fold -w1 | shuf | tr -d '\n' )

# 创建密码
echo ${USER_NAME}:${PASSWORD}|chpasswd

#显示密码
echo "PASSWORD IS $PASSWORD"