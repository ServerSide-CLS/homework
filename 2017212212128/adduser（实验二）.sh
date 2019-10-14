read -p 'Enter username:' USER_NAME
read -p 'Enter person info:' COMMENT
useradd -c "${COMMENT}" -m ${USER_NAME}

S="!@#$%^&*()_+="
PASSWORD1=$(echo ${S} | fold -w2 | shuf | head -c2)
PASSWORD2=$(date +%s%N | sha256sum | head -c6 )
PASSWORD=$(echo ${PASSWORD1}${PASSWORD2} | fold -w1 | shuf | tr -d '\n' )

echo ${USER_NAME}:${PASSWORD}|chpasswd
echo "Password is ${PASSWORD}"

