#!/bin/bash

NUMBER_OF_PARAMS="${#}"



if [[ "${NUMBER_OF_PARAMS}" = '3' ]]
then
    if [[ "${1}" = '-l' ]]
    then
       useradd -c "${3}" -m "${3}"
       PASSWORD=$(date +%s%N${RANDOM}${RANDOM} |  sha256sum | head -c"${2}" )
       echo "${3},您打初始密碼是${PASSWORD}"
    fi
elif [[ "${NUMBER_OF_PARAMS}" = '5' ]]
then 
    if [[ "${1}" = '-l' && "${3}" = '-s' ]]
    then
       useradd -c "${5}" -m "${5}"
       PASSWORD=$(date +%s%N${RANDOM}${RANDOM} |  sha256sum | head -c"${2}" )
       Specialpart=$(echo '@#$%^&&*()(*&^%+_)(*' | fold -w5 | shuf | head -c"${4}")
       PASSWORD="${PASSWORD}${Specialpart}"
       echo "${5},您的初始密碼是${PASSWORD}"
    fi
elif [[ "${NUMBER_OF_PARAMS}" = '6' ]]
then
    if [[ "${1}" = '-l' && "${3}" = '-s' && "${5}" = '-o' ]]
    then
       useradd -c "${6}" -m "${6}"
       PASSWORD=$(date +%s%N${RANDOM}${RANDOM} |  sha256sum | head -c"${2}" )
       Specialpart=$(echo '@#$%^&&*()(*&^%+_)(*' | fold -w5 | shuf | head -c"${4}")
       PASSWORD="${PASSWORD}${Specialpart}"
       PASSWORD=$(echo "${PASSWORD}" | fold -w1 | shuf |tr -d '\n')
       echo "${6},您的初始密碼是${PASSWORD}"

    fi
fi













#NO.1

#读取用户名

#read -p 'Enter username:' USER_NAME

#comment与用户名一致

#USER_COMMENT=${USER_NAME}

#創建新用戶

#useradd -c "${USER_COMMENT}" -m "${USER_NAME}"

#NO.1 -l
#PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )


#NO.2 -l -s
#Specialpart=$(echo '@#$%^&&*()(*&^%+_)(*' | fold -w5 | shuf | head -c2)

#PASSWORD="${PASSWORD}${Specialpart}"

#NO.3 -o
#PASSWORD=$(echo "${PASSWORD}" | fold -w1 | shuf |tr -d '\n')


#echo "${USER_NAME},您的初始密碼是${PASSWORD}"
