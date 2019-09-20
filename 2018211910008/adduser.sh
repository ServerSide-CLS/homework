# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 创建用户
#useradd -c "${COMMENT}" -m ${USER_NAME}

# 创建密码
PASSWORD=$(echo "${RANDOM}${RANDOM}" | head -c6)
P="!@#$%^&*()_+="
NOT_NORMAL=$(echo '!@#$%^&*()_+=' | fold -w8  | head -c2)
PASSWORD="${PASSWORD}${NOT_NORMAL}"
PASSWORD=$(echo ${PASSWORD} | head -c8)
echo "${PASSWORD}"
# 创建密码
#echo ${USER_NAME}:${PASSWORD}|chpasswd
