#!/bin/bash

# 声明变量
declare -i a b i
PASSWORD=""
a=$RANDOM%8
b=$RANDOM%8

# 生成随机密码
for((i=0;i<8;i++));
do
if [[ (i -ne $a)&&(i -ne $b) ]]
then
char=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c1 )
else
char=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
fi
PASSWORD=$PASSWORD$char
done

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 创建密码
echo ${USER_NAME}:${PASSWORD}|chpasswd

# 输出结果
echo "用户$USER_NAME已创建，密码为$PASSWORD"
