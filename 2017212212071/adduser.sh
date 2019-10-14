#!/bin/bash

read -p 'Please enter username:' USER_NAME

SPECIAL_CHAR_A=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
SPECIAL_CHAR_B=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )

sudo useradd $USER_NAME

echo ${USER_NAME}:${PASSWORD}${SPECIAL_CHAR_A}${SPECIAL_CHAR_B}|chpasswd

echo "Account ${USER_NAME}'s password is ${PASSWORD}${SPECIAL_CHAR_A}${SPECIAL_CHAR_B}"

#首次登陆修改密码
passwd -e ${USER_NAME}

#查看本机所有用户
cat /etc/group
