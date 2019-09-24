#!/bin/bash
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | shuf -n2 | xargs | sed s/[[:space:]]//g )
SPECIAL_CHA=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )
PASSWORD=$(echo "${SPECIAL_CHAR}${SPECIAL_CHA}" | fold -w1 | shuf | shuf -n8 | xargs | sed s/[[:space:]]//g )
read -p 'Enter username:' USER_NAME
read -p 'Enter person info:' COMMENT
echo "Enter password:${PASSWORD}"
useradd -c "${COMMENT}" -m ${USER_NAME}
echo ${USER_NAME}:${PASSWORD}|chpasswd
