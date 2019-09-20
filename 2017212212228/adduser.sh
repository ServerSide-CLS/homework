#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 创建密码
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
PWD=${PASSWORD}${SPECIAL_CHAR}${SPECIAL_CHAR}
echo "Your random password is ${PWD}" 
echo ${USER_NAME}:${PWD}|chpasswd

# 首次登录修改密码
passwd -e ${USER_NAME}
