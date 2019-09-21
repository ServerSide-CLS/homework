#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}
PASSWORD=$(date +%s%N | sha256sum | head -c6 )
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w2 | shuf | head -c3 )
# 创建密码
echo ${USER_NAME}:${PASSWORD}${SPECIAL_CHAR}|chpasswd
echo "${PASSWORD}${SPECIAL_CHAR}"
