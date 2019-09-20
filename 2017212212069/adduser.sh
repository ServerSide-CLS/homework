#!/bin/bash

read -p 'Enter username:' USER_NAME

read -p 'Enter person info:' COMMENT

useradd -c "${COMMENT}" -m "${USER_NAME}"

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )

SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w 1 | shuf | head -c1 )
 
PASSWORD=${PASSWORD}${SPECIAL_CHAR}

SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w 1 | shuf | head -c1 )
 
PASSWORD=${PASSWORD}${SPECIAL_CHAR}

PASSWORD=$(echo "${PASSWORD}" | fold -w 1 | shuf | tr -d '\n')
echo "Your password is: ${PASSWORD}"                                              

echo ${USER_NAME}:${PASSWORD}|chpasswd

passwd -e ${USER_NAME}

