#!/bin/bash

#LSB Version: :core-4.1-amd64:core-4.1-noarch
#Distributor ID: CentOS
#Description: CentOS Linux release 7.4.1708 (Core)
#Release: 7.4.1708
#Codename: Core

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 创建用户
useradd -c "${COMMENT}"  -m "${USER_NAME}"

# 生成密码
PASSWORD=$(echo '!@#$%^&*()_+=' | fold -w2 | shuf | head -c2 )$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )
PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf | xargs |sed 's/ //g')

# 创建密码
echo ${USER_NAME}:${PASSWORD} | chpasswd
#echo ${PASSWORD} | passwd --stdin ${USER_NAME}
echo ${USER_NAME}:${PASSWORD}