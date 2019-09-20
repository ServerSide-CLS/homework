#!/bin/bash

read -p 'Input username: ' USER_NAME

read -p 'Input user info: ' COMMENT

SPECIAL_CHAR=$(echo '!@#$^&*()_+=' | fold -w2 | shuf | head -c2 )

TEMP_PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )

PASSWORD=$(echo "${TEMP_PASSWORD}${SPECIAL_CHAR}" | fold -w1 | shuf | tr -d '\n')

echo "Your password:${PASSWORD}"

useradd -c "${COMMENT} " -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd

passwd -e ${USER_NAME}