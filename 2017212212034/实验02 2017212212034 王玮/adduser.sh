#!/bin/bash
#Author:WangWei
#Date:2019/09/15

#Input username
read -p 'Enter username:' USER_NAME

#Input user info
read -p 'Enter person info:' COMMENT

#create user
useradd -c "${COMMENT}" -m ${USER_NAME}

#generate password
function generatePwd(){
 
  # At first, I randomly generate two special chars
  SPECIAL_CHARS=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | tr -d '\n' |head -c2)
 
  # Secondly, I randomly generate six chars
  TMP_PWD=$(date +%s%N | sha256sum | head -c6)
 
  # After that, I splice SPECIAL_CHARS and TMP_PWD
  SEEDS=${TMP_PWD}${SPECIAL_CHARS}
 
  # At last, I use SEEDS to generate the real PASSWORD
  PASSWORD=$(echo $SEEDS | fold -w1 | shuf | tr -d '\n')
  echo $PASSWORD
}
PASSWORD=`generatePwd`
echo ${USER_NAME} "'s password is :" ${PASSWORD}
echo ${USER_NAME}:${PASSWORD}|chpasswd

passwd -e ${USER_NAME}
