#!/bin/bash

read -p 'Enter username:' USER_NAME

read -p 'Enter person info:' COMMENT

SPECIAL_CHAR=$(echo '!@#$%^&*()_+' | fold -w2 | shuf | head -c2)

PWD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6)

PASSWORD="${PWD}${SPECIAL_CHAR}"

PASS=$(echo ${PASSWORD} | shuf)

echo "$PASS"

useradd -c "${COMMENT}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd

#passwd -e ${USER_NAME}
