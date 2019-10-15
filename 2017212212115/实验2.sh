# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 输入密码
read -p 'Enter password:' PASSWORD

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 创建密码
PASSWORD=$(date +%s%N | sha256sum | head -c6 )
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w2 | shuf | head -c2)
# echo "${PASSWORD}${SPECIAL_CHAR}"
PS1="${PASSWORD}${SPECIAL_CHAR}"
# PS1=$(echo "${PASSWORD}${SPECIAL_CHAR}" | shuf)
echo ${PS1} | fold -w1 | shuf | xargs | sed 's/ //g'



