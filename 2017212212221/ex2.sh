#!/bin/bash
read -p "Enter Username:" username
read -p "Enter person info:" comment
password=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6)
specialword=$(echo "!@#$%^&*()_+=" | fold -w1 | shuf | head -c1)
password=${password}${specialword}
specialword=$(echo "!@#$%^&*()_+=" | fold -w1 | shuf | head -c1)
password=${password}${specialword}
password=$(echo "${password} " | fold -w1 | shuf | tr -d ' \n')
echo "Your password:"${password}
useradd -c "${comment}" -m ${username}
echo ${username}:${password} | chpasswd
