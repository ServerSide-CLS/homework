#!/bin/bash

#帮助
usage() {
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo '  -l Length of the password' 
  echo '  -s Append special chars to the password'
  echo '  -o Disorder of coding order'
  exit 1
}

log() {
  local MSG="${@}"
  if [[ "${VERBOSE}" = 'true' ]]
  then 
    echo "${MSG}"
  fi
}

LEN=48

while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)  
      LEN="${OPTARG}"
      ;;
    s)   
      USE_SPEC_CHAR='true'
      len="${OPTARG}"
      ;;
    o) 
      Disorder='true'
      ;;
    ?)
      usage
      ;;
  esac
done

#生成普通英文数字密码
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})

#生成带有特殊字符的密码
if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
  l=$[LEN-len]
  PASSWORD=$(echo ${PASSWORD} | head -c${l})
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | tr -d '\n' |head -c${len})
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
fi

#将密码打乱
if [[ "${Disorder}" = 'true' ]]
then  
  PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf | tr -d '\n' )
fi

#用户名
USER_NAME=${!#}
useradd -m ${USER_NAME}

log 'Done.'

echo "创建用户${USER_NAME} 密码为${PASSWORD}"

exit 0