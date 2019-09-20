#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

#生成密码
PASSWORD=$(date +%s%N | md5sum | /usr/bin/head -c 6)
function rand(){
    min=$1
    max=$(($2-$min+1))
    num=$(date +%s%N)
    echo $(($num%$max+$min))
}

rnd=$(rand 0 6)
SPECIAL_CHAR1=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | /usr/bin/head -c1 )
SPECIAL_CHAR2=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | /usr/bin/head -c1 )
PASSWORD1=${PASSWORD:0:$rnd}${SPECIAL_CHAR1}${PASSWORD:$rnd}
rnd=$(rand 0 7)
PASSWORD2=${PASSWORD1:0:$rnd}${SPECIAL_CHAR2}${PASSWORD1:$rnd}
echo "password is : ${PASSWORD2}"

# 创建密码
echo ${USER_NAME}:${PASSWORD2}|chpasswd

# 首次登录修改密码
passwd -e ${USER_NAME}
