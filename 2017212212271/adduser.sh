#!/bin/bash
read -p 'enter your username:' USER_NAME
read -p 'enter your person info:' COMMENT
echo 'Hello,'${USER_NAME}
PASSWORD=$(tr -dc "0-9" < /dev/urandom | head -c 6) 
var=$(echo "!@#$%^&*()_+" | fold -w1 | shuf | head -c1 )
var2=$(echo "!@#$%^&*()_+" | fold -w1 | shuf | head -c1 )
var3=${var}${PASSWORD}${var2}
var4=$(echo ${var3} | fold -w1 |shuf|tr -d '\n')
echo -n 'Your password is:'
echo $var4
sudo useradd -c "${COMMENT}" -m "${USER_NAME}"
sudo passwd -e ${USER_NAME}
