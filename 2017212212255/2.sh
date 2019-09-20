#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 输入密码
read -p 'Enter extra_password:' PASSWD

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# sha256sum + RANDOM + head
PASSWORD=$(date +%s%N${RANDOM}${RANDOM}${PASSWD} | sha256sum | head -c6 )

SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | tr -d '\n' | head -c2 )

PWD=$(echo "${PASSWORD}${SPECIAL_CHAR}" | fold -w1 | shuf | tr -d '\n' )

echo ${PWD}

# 创建密码
echo ${USER_NAME}:${PWD}|chpasswd