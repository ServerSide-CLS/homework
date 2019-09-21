#!/bin/bash

# 生成随机数
TEMPLEN=${RANDOM}

# 生成第一部分正常字符长度
let LEN1=$TEMPLEN%6

# 生成随机数
TEMPLEN=${RANDOM}

# 生成第二部分正常字符长度
let LEN2=$TEMPLEN%$((6-$LEN1))

# 获取第三部分正常字符长度
let LEN3=6-$LEN1-$LEN2

# 生成第一部分正常字符
PASS=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$LEN1)

# 生成一个特殊字符
PASS=$PASS$(echo '!@#$%^&*()_+' | fold -w1 | shuf | head -c1)

# 生成第二部分正常字符
PASS=$PASS$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$LEN2)

# 生成一个特特殊字符
PASS=$PASS$(echo '!@#$%^&*()_+' | fold -w1 | shuf | head -c1)

# 生成第三部分正常字符
PASS=$PASS$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$LEN3)

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 输出用户密码
echo "The password is ${PASS}"

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 创建密码
echo ${USER_NAME}:${PASS}|chpasswd

# 首次登陆修改密码
passwd -e ${USER_NAME}

