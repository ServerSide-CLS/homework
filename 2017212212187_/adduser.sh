#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}
echo "username is ${USER_NAME}"
#创建密码
# sha256sum + RANDOM + head
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )

#特殊字符
SPACIAL_CHAR1=$(echo !'!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
SPACIAL_CHAR2=$(echo !'!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)

echo ${USER_NAME}:${PASSWORD}${SPACIAL_CHAR1}${SPACIAL_CHAR2}|chpasswd

#首次登录修改密码
passwd -e ${USER_NAME}

#输出用户名，密码
echo "password is ${PASSWORD}${SPACIAL_CHAR1}${SPACIAL_CHAR2}"
