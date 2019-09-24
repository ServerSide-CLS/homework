#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 输入密码

PASSWORD=$(date +%s%N | sha256sum | head -c6 )
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w2 |head -c2 )

PASSWORD=$PASSWORD$SPECIAL_CHAR

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 创建密码
echo ${USER_NAME}:${PASSWORD}|chpasswd
echo "your password:"$PASSWORD

# 首次登录修改密码
passwd -e ${USER_NAME}
