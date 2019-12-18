#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT


# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

INT=$(echo '0123456789' | fold -w1 | shuf | head -c12 )

SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c4 )

PASSWD="$INT""$SPECIAL_CHAR"
PASS=$(echo "$PASSWD" | shuf | tr - d'\n')

echo "$PASS" 

# 创建密码
echo ${USER_NAME}:${PASSWORD}|chpasswd

# 首次登录修改密码
passwd -e ${USER_NAME}