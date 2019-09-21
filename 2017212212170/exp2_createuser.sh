#!/bin/bash
# Hu si yuan

# 随机化 
# arg1 待随机化字符串 // arg2 取头部k个字符 可选
randomize () {

    # 错误 Incorrect Usage
    if [ ! $1 ]; then
        exit 2
    fi

    if [ ! $2 ]; then
        echo $1 | fold -w1 | shuf | tr -d '\n'
    fi

    # echo "$1" | fold -w1 | shuf | tr -d '\n' | head -c"$2"
    echo $1 | fold -w1 | shuf | tr -d '\n' | head -c"${2}" 2> /etc/null
}

# 生成6个字母/数字和2个特殊字符
RAND_CHAR=$(randomize "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 6)
SPECIAL_CHAR=$(randomize "!@#$%^&*()_+=" 4)

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 生成密码
PASSWORD=$(randomize "$RAND_CHAR$SPECIAL_CHAR")

# 创建密码
echo ${USER_NAME}:${PASSWORD}|chpasswd

echo "[WARNING]: YOUR DEFAULT PASSWORD IS $PASSWORD"