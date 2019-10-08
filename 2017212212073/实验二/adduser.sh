#!/bin/bash

read -p 'Enter username:' USER_NAME
read -p 'Enter person info:' COMMENT

NUM="${RANDOM}${RANDOM}"
PN=$(echo "${NUM}" | head -c6)
echo "${PN}"
CH=$(echo '!@#$%^&*()_+=' | shuf | head -c2)
echo "${CH}"
PASSWORD="${PN}${CH}"
PA=$(echo "${PASSWORD}" | fold -w1 | shuf | head -c1 )
echo "${PA}"

useradd -c "${COMMENT}" -m "${USER_NAME}"

echo "your password : $PASSWORD"

echo ${USER_NAME}:${PASSWORD}|chpasswd

passwd -e ${USER_NAME}