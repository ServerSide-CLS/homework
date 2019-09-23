#!/bin/bash

read -p 'Enter usrname:' USER_NAME

read -p 'Enter person info:' COMMENT

s1=$(echo '!@#$%^&*()_+=' | fold -w 1 | shuf | head -c 1)

s2=$(echo '!@#$%^&*()_+=' | fold -w 1 | shuf | head -c 1)

m1=$(echo '0123456789' | fold -w 1 | shuf | head -c 1)

m2=$(echo '1234567890' | fold -w 1 | shuf | head -c 1)

m3=$(echo '1234567890' | fold -w 1 | shuf | head -c 1)

m4=$(echo '1234567890' | fold -w 1 | shuf | head -c 1)

m5=$(echo '1234567890' | fold -w 1 | shuf | head -c 1)

m6=$(echo '1234567890' | fold -w 1 | shuf | head -c 1)


PASSWORD=$(echo ${s1}${s2}${m1}${m2}${m3}${m4}${m5}${m6} | fold -w1 | shuf | head -c 16 | tr -d '\n')

echo "Your Password is: ${PASSWORD}"

useradd -c "${COMMENT}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd

passwd -e ${USER_NAME}














