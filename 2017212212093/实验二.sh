#!/bin/bash

#读取用户名

read -p 'Enter username:' USER_NAME

#comment与用户名一致

USER_COMMENT=${USER_NAME}

#創建新用戶

useradd -c "${USER_COMMENT}" -m "${USER_NAME}"

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )

Specialpart=$(echo '@#$%^&&*()(*&^%+_)(*' | fold -w5 | shuf | head -c2)



PASSWORD="${PASSWORD}${Specialpart}"

PASSWORD=$(echo "${PASSWORD}" | fold -w1 | shuf |tr -d '\n')


echo "${USER_NAME},您的初始密碼是${PASSWORD}"
