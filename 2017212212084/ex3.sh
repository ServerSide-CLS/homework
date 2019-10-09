#!/bin/bash

#密码总长度
LEN=8

#特殊字符数量 
NUM=0

#编码顺序乱序
disorder="false"

USER_NAME=${!#}
usage() {
  echo "Usage: ${0} [-l LENGTH] [-s Special characters length] [-o disorder] username" >&2
  echo 'input a username and Generate a random password'
  echo '  -l set length of the password' 
  echo '  -s set length of Special chars'
  echo '  -d Disorder'
  echo 'input username'
  exit 1
}

while getopts l:s:o:u OPTION
do
	case "${OPTION}" in
		l) LEN="${OPTARG}" ;;
		s) NUM="${OPTARG}" ;;
		o) disorder="true" ;;
		u) usage ;;
	esac
done

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$((LEN-NUM)))
SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w${NUM} | shuf | head -c${NUM})
PASSWORD="${PASSWORD}${SPECIAL_CHAR}"

if ${disorder}
then
	PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf|tr -d '\n')
fi

#创建用户
useradd -c "${USER_NAME}" -m ${USER_NAME}

#输入用户描述
read -p 'Enter person info:' COMMENT

#创建密码
echo ${USER_NAME}:${PASSWORD}|chpasswd
echo "The password is :"${PASSWORD}
