#!/bin/bash

read -p 'Enter username:' USER_NAME

read -p 'Enter person info:' COMMENT

s=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 ) 

s1=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)

PASSWORD=$(date +%s%N | sha256sum | head -c6 )

PASSWORD=${PASSWORD}${s}${s1}

echo 'PASSWORD IS'
echo ${PASSWORD}

useradd -c "${COMMENT}" -m ${USER_NAME}

//echo ${USER_NAME}:${PASSWORD}|chpasswd  //对 user 用户修改密码，密码为 password 

passwd -e ${USER_NAME}

