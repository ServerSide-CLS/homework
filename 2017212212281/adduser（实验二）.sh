read -p 'Enter username:' USER_NAME
read -p 'Enter person info:' COMMENT

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c48 )
PASSWORD=${PASSWORD:0:6}
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
PASSWORD=${PASSWORD}${SPECIAL_CHAR}
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
PASSWORD=${PASSWORD}${SPECIAL_CHAR} 
PASSWORD=$(echo ${PASSWORD} | fold -w1| shuf | tr -d '\n')
echo ${PASSWORD}

useradd -c "${COMMENT}" -m ${USER_NAME}
echo ${USER_NAME}:${PASSWORD}|chpasswd
