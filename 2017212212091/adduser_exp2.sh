#!/bin/bash

SPECIAL_CHAR1=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )

SPECIAL_CHAR2=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )

NEWPASSWORD=$(echo $SPECIAL_CHAR1$SPECIAL_CHAR2$PASSWORD | fold -w1 | shuf )

NEWPASSWORD=$(echo $NEWPASSWORD | tr -d " ")
#echo ${NEWPASSWORD}

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 创建密码
echo ${USER_NAME}:${NEWPASSWORD}|chpasswd
echo 'password is '${NEWPASSWORD}

# 首次登录修改密码
passwd -e ${USER_NAME}