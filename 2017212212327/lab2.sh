#!/bin/bash

read -p 'Enter new username:' USER_NAME
read -p 'Enter person info:' COMMENT

PASSWORD1=$( date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )
PASSWORD2=$( echo "!@#$%^&*()_+" | fold -w1 | shuf | tr -d '\n' | head -c2 )
PASSWORD=$( echo ${PASSWORD1}${PASSWORD2} | fold -w1 | shuf | tr -d '\n' | head -c8 )

useradd -c "${COMMENT}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD} | chpasswd
echo "Password: ${PASSWORD}"