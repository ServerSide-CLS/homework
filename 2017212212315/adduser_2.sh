#!/bin/bash

usage() {
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo '  -l 密码总长度' 
  echo '  -s 特殊字符个数'
  echo '  -o 乱序'
  exit 1
}

LEN=64
SPE=0
FLAG=0
USER_NAME=${!#}

while getopts ol:s: OPTION
do
  case "${OPTION}" in
    o)  
      FLAG=1
      ;;
    l)   
      LEN="${OPTARG}"
      ;;
    s) 
      SPE="${OPTARG}"
      ;;
    ?)
      usage
      ;; 
  esac
done

CHAR=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c `expr ${LEN} - ${SPE}` )
SPECIAL_CHAR=$(echo '!@#$%^&()_+=' |fold -w2| shuf | head -c ${SPE} )
PASSWORD=${CHAR}${SPECIAL_CHAR}

if [[ ${FLAG} == 1 ]]
then
	PASSWORD=$(echo "${PASSWORD}"| fold -w1 | shuf | tr -d [:space:] )
fi

echo "your password is" ${PASSWORD}

# 创建用户
useradd -m ${USER_NAME}
# 创建密码
echo ${USER_NAME}:${PASSWORD}|chpasswd

# 首次登录修改密码
passwd -e ${USER_NAME}

exit 0
