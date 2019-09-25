PASSWORD="${RANDOM}${RANDOM}${RANDOM}"
PASSWORD=${PASSWORD:0:5}
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w2 | shuf | head -c2 )
PASSWORD=${PASSWORD}${SPECIAL_CHAR}
PASSWORD=$(echo ${PASSWORD} | fold -w1| shuf | tr -d '\n')
echo ${PASSWORD}

read -p 'Enter username:' USER_NAME
read -p 'Enter person info:' COMMENT
useradd -c "${COMMENT}" -m ${USER_NAME}
echo ${USER_NAME}:${PASSWORD}|chpasswd
