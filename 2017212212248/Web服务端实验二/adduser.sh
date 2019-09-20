#!/bin/bash

read -p 'Enter username:' USER_NAME
read -p 'Enter person info:' COMMENT

RANDOM_CHAR=$( date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )
SPECIAL_CHAR=$( echo '!@#$%^&*()_' |fold -w1 | shuf |tr -d '\n' | head -c2 )
PASSWORD=$( echo ${RANDOM_CHAR}${SPECIAL_CHAR} | fold -w1 | shuf |tr -d '\n' | head -c8 )

useradd -c "${COMMENT}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD} | chpasswd

echo "Password:${PASSWORD}"
