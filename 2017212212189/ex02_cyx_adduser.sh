#!/bin/bash

read -p 'Enter username:' USER_NAME

read -p 'Enter person info:' COMMENT

useradd -c "${COMMENT}" -m ${USER_NAME}

PWD=$(date +%s%N | sha256sum | head -c6 )

for((i=6;i<=7;i+=1))
do
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )

#产生随机的切片位置
rnd=$((${RANDOM}%${i}))

#将字符串随机切片分成两个子串
sub1=$(echo ${PWD:0:$rnd})
sub2=$(echo ${PWD:$rnd})

PWD=$(echo "${sub1}${SPECIAL_CHAR}${sub2}" )
done

echo ${USER_NAME}:${PWD}|chpasswd

echo "PWD:${PWD}"
