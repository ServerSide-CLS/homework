read -p 'Enter username:' USER_NAME
read -p 'Enter person info:' INFO

useradd -c "${INFO}" -m ${USER_NAME}

WORD1=$(date +%s%N | sha256sum | head -c6)
WORD2=$(echo "!@#$%^&*)_+=" | fold -w2 | shuf | head -c2 )
PASSWORD=$(echo "${WORD1}${WORD2}" | fold -w1 | shuf | tr -d '\n' )

echo "You Password is ${PASSWORD}"

echo ${USER_NAME}:${PASSWORD} | chpasswd
