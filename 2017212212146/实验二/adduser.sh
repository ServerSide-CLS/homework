#!/bin/bash
read -p 'Enter username:' USER_NAME
read -p 'Enter person info:' COMMENT
useradd -c "${COMMENT}" -m ${USER_NAME}
# sha256sum + RANDOM + head
PWD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=?' | fold -w2 | shuf | tr -d '\n' | head -c2 )
FINALPWD=$(echo "${PASSWORD}${SPECIAL_CHAR}" | fold -w1 |shuf | tr -d '\n' )
echo ${FINALPWD}
echo ${USER_NAME}:${FINALPWD} | chpasswd
