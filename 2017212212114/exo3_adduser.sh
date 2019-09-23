#!/bin/bash

#LSB Version: :core-4.1-amd64:core-4.1-noarch
#Distributor ID: CentOS
#Description: CentOS Linux release 7.4.1708 (Core)
#Release: 7.4.1708
#Codename: Core

INPUT="${#}"
LEN=8
S_LEN=0
SORT=0

while getopts l:s:o INPUT
do
    case $INPUT in
    l)
        LEN=$OPTARG
        ;;
    s)
        S_LEN=$OPTARG
        ;;
    o)
        SORT=1
        ;;
    esac
done

if [[ "${S_LEN}" > 0 ]]
then
    if [[ "${SORT}" = 1 ]]
    then
        # 获取用户名
        USER_NAME="${@: -1}"
        # 获取英文数字位数
        ((NUM = ${LEN}-${S_LEN}))
        # 生成密码
        PASSWORD=$(echo '!@#$%^&*()_+=' | fold -w${S_LEN} | shuf | head -c${S_LEN} )$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${NUM} )
        PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf | xargs |sed 's/ //g')
    else
        # 获取用户名
        USER_NAME="${@: -1}"
        # 获取英文数字位数
        ((NUM = ${LEN}-${S_LEN}))
        # 生成密码
        PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${NUM} )$(echo '!@#$%^&*()_+=' | fold -w${S_LEN} | shuf | head -c${S_LEN} )
    fi
else
    # 获取用户名
    USER_NAME="${@: -1}"
    # 生成密码
    PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN} )
fi

# 创建用户
useradd -c "${COMMENT}"  -m "${USER_NAME}"

# 创建密码
echo ${USER_NAME}:${PASSWORD} | chpasswd
#echo ${PASSWORD} | passwd --stdin ${USER_NAME}
echo ${USER_NAME}:${PASSWORD}



