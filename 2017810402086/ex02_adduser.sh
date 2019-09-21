#!/bin/bash

read -p 'Enter new username:' USER_NAME

read -p 'Enter person info:' COMMENT

PASSWORD_B=$( echo "!@#$%^&*()_+" | fold -w1 | shuf | tr -d '\n' | head -c2 )

PASSWORD_A=$( date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )

PASSWORD=$( echo ${PASSWORD_A}${PASSWORD_B} | fold -w1 | shuf | tr -d '\n' | head -c8 )

useradd -c "${COMMENT}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD} | chpasswd

echo "Username: ${USER_NAME}\nInfo: ${COMMENT}\nPassword: ${PASSWORD}"
