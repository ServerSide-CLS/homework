#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 创建随机8位密码，其中两位特殊字符
PASSWORD="${RANDOM}${RANDOM}${RANDOM}${RANDOM}${RANDOM}${RANDOM}"
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w2 | shuf | head -c2 )
PASSWORD=${PASSWORD:1:6}${SPECIAL_CHAR}
echo ${PASSWORD}

echo ${USER_NAME}:${PASSWORD}|chpasswd

# 首次登录修改密码
passwd -e ${USER_NAME}




