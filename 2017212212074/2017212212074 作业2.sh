#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME

# 创建用户
useradd -m ${USER_NAME}

char1=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
char2=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
num1=$(echo '0123456789' | fold -w1 | shuf | head -c1 )
num2=$(echo '0123456789' | fold -w1 | shuf | head -c1 )
num3=$(echo '0123456789' | fold -w1 | shuf | head -c1 )
num4=$(echo '0123456789' | fold -w1 | shuf | head -c1 )
num5=$(echo '0123456789' | fold -w1 | shuf | head -c1 )
num6=$(echo '0123456789' | fold -w1 | shuf | head -c1 )

PASSWORD=$(echo ${char1}${char2}${num1}${num2}${num3}${num4}${num5}${num6} | fold -w1 | shuf | tr -d '\n')

echo ${USER_NAME}:${PASSWORD}|chpasswd

echo "${PASSWORD}"