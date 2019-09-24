#input username
read -p 'Enter username:' USER_NAME

#input userdescription
read -p 'Enter person info:' COMMENT

#set pwd

SIMPLE_PASSWORD=$(date +%s%N | sha256sum | head -c6)

SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c4)

PASSWORD=${SIMPLE_PASSWORD}${SPECIAL_CHAR}

FIN_PWD=$(echo "${PASSWORD}" | fold -w1 | shuf |head -c16)

FIN_PASSWORD=$(echo "${FIN_PWD}" | tr -d '\n')

echo "your password is ${FIN_PASSWORD}"

#add user
useradd -c "${COMMENT}" -m ${USER_NAME}

#add pwd
echo ${USER_NAME}:${FIN_PASSWORD}|chpasswd

#reset pwd
passwd -e ${USER_NAME}
