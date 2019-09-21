#!/bin/bash

read -p "Enter username:" USER_NAME


read -p "Enter personInfo:" COMMENT


s=$(echo "!@#$%^&*()_+" | fold -w1 | shuf|tr -d '\n')

n=$(echo "1234567890" | fold -w1 | shuf|tr -d '\n')

PASSWORD=$(echo ${s:1:2}${n:1:6} | fold -w1 | shuf|tr -d '\n')

echo "your password is: ${PASSWORD}"

useradd -c "${COMMENT}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd

passwd -e ${USER_NAME}
