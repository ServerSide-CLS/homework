#!/bin/bash

#LSB Version: :core-4.1-amd64:core-4.1-noarch
#Distributor ID: CentOS
#Description: CentOS Linux release 7.4.1708 (Core)
#Release: 7.4.1708
#Codename: Core

INPUT="${#}"
LEN="${2}"

if [[ "${3}" = '-s' ]]
then
    if [[ "${5}" = '-o' ]]
    then
        # 获取用户名
        USER_NAME="${6}"
        # 获取特殊字符位数
        PASS_NUM="${4}"
        # 获取英文数字位数
        ((NUM = ${LEN}-${PASS_NUM}))
        # 生成密码
        PASSWORD=$(echo '!@#$%^&*()_+=' | fold -w${PASS_NUM} | shuf | head -c${PASS_NUM} )$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${NUM} )
        PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf | xargs |sed 's/ //g')
    else
        # 获取用户名
        USER_NAME="${5}"
        # 获取特殊字符位数
        PASS_NUM="${4}"
        # 获取英文数字位数
        ((NUM = ${LEN}-${PASS_NUM}))
        # 生成密码
        PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${NUM} )$(echo '!@#$%^&*()_+=' | fold -w${PASS_NUM} | shuf | head -c${PASS_NUM} )
    fi
else
    # 获取用户名
    USER_NAME="${3}"
    # 生成密码
    PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN} )
fi

# 创建用户
useradd -c "${COMMENT}"  -m "${USER_NAME}"

# 创建密码
echo ${USER_NAME}:${PASSWORD} | chpasswd
#echo ${PASSWORD} | passwd --stdin ${USER_NAME}
echo ${USER_NAME}:${PASSWORD}
