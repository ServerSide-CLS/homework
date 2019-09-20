#!/bin/bash

read -p 'Enter username:' USER_NAME

read -p 'Enter user info:' COMMENT

PASSWORD_NUM=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6)

PASSWORD_CHAR1=$(echo '!@#$%^&*()_+=' | shuf | fold -w1 | shuf | head -c2 )

PASSWORD_CHAR2=$(echo '!@#$%^&*()_+=' | shuf | fold -w1 | shuf | head -c2 )

PASSWORD_TOTAL="${PASSWORD_NUM}${PASSWORD_CHAR1}${PASSWORD_CHAR2}"

PWD=$(echo ${PASSWORD_TOTAL} | fold -w1 | shuf | tr -d '\n' )

useradd -c "${COMMENT}" -m ${USER_NAME}

echo ${USER_NAME}:${PWD}|chpasswd

passwd -e ${USER_NAME}

echo "Your password is:${PWD}"
