#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 创建密码
CHAR=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )
SPECIAL_CHAR=$(echo '!@#$%^&()_+=' |fold -w2| shuf | head -c2 )
PASSWORD=$(echo "${CHAR}${SPECIAL_CHAR}"|fold -w1| shuf )
PASSWORD=$(echo ${PASSWORD}|fold -w32|sed 's/ //g')
echo "your password is" ${PASSWORD}
echo ${USER_NAME}:${PASSWORD}|chpasswd

# 首次登录修改密码
passwd -e ${USER_NAME}
