#!/bin/bash

SPECIAL_CHAR=$(echo '!@#$%^&*()+=' | fold -w2 | shuf | head -c2)
#echo "${SPECIAL_CHAR}"

PASSWORD=$(date +%s%N${RANDOM}${RANDOM}${RANDOM} | sha256sum |head -c6)
#echo "${PASSWORD}"

PASSWORD=$(echo "${SPECIAL_CHAR}${PASSWORD}"| fold -w1 | shuf | tr -d '\n')

read -p 'Enter username:' USER_NAME
read -p 'Enter person info:' COMMENT

echo "The generated password is"
echo "${PASSWORD}"

useradd -c "${COMMENT}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd
