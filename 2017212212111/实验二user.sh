
read -p 'Enter username:' User_name

read -p 'Enter person info:' commit

SPECIAL_CHAR=$(echo '!@#$%^&*()_+' | fold -w2 | shuf | head -c2)

PWD=$(date +%s%N | sha256sum | head -c6 )

PASSWORD="${PWD}${SPECIAL_CHAR}"

PASS=$(echo ${PASSWORD} | shuf)

echo "$PASS"

adduser -c "${commit}" -m ${User_name}

echo ${User_name}:${PASSWORD}|chpasswd

#passwd -e ${User_name}
