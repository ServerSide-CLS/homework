#!/bin/bash

# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT


# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 生成密码
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c 4 )
SPECIAL_INT=$(echo '1234567890' | fold -w1 | shuf | head -c 12 )
PASSWORD="$SPECIAL_CHAR""$SPECIAL_INT"
echo "Your password is: "
a=$(echo "${PASSWORD}" | shuf | tr -d '\n')
echo ""
echo "$a"

# 创建密码
 echo ${USER_NAME}:${a}|chpasswd

 # 首次登录修改密码
passwd -e ${USER_NAME}
