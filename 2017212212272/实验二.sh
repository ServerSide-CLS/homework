#!/bin/bash

read -p 'Enter username:' USER_NAME
read -p 'Enter person info:' COMMENT
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )
SPECIAL_CHAR1=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
SPECIAL_CHAR2=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
PASSWORD=${PASSWORD}${SPECIAL_CHAR1}${SPECIAL_CHAR2}
sudo useradd -c "${COMMENT}" -m ${USER_NAME}
echo ${USER_NAME}:${PASSWORD}|sudo chpasswd
echo "your password:"${PASSWORD}
sudo passwd -e ${USER_NAME}
