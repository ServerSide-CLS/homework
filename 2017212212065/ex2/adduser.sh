#!/bin/bash

read -p 'PLease enter username:' USER_NAME
read -p 'PLease enter person info:' COMMENT
RAND=$(date +%s%N${RANDOM} | sha256sum | head -c6)
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
PASSWORD=${RAND}${SPECIAL_CHAR}
useradd -c "${COMMENT}" -m ${USER_NAME}
echo ${USER_NAME}:${PASSWORD}|chpasswd
echo 'The password is : '${PASSWORD}
passwd -e ${USER_NAME}
