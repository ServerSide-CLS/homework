#!/bin/bash

usage() {
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s The number of special char to the password'
  echo '  -o Order in disorder'
  echo '  -u Username'
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

while getopts ol:s:u: OPTION
do
  case "${OPTION}" in
    o)  
      VERBOSE='true'
      ;;
    l)   
      LEN="${OPTARG}"
      ;;
    s) 
      USE_SPEC_CHAR='true'
      len="${OPTARG}"
      ;;
    u)
      USER_NAME='true'
      user="${OPTARG}"
      ;;
    ?)
      usage
      ;;
  esac
done

log 'Generation a password'

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})
#判断是否有特殊字符
if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
  log 'select a random special char.'
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | tr -d '\n' | head -c${len} )
  l=$[LEN-len]
  PASSWORD=$(echo ${PASSWORD} | head -c${l})
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
fi
#判断是否随机排序
if [[ "${VERBOSE}" = 'true' ]]
then
  PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf | tr -d '\n')
fi
#判断用户名是否存在
if [[ "${USER_NAME}" = 'true' ]]
then
  useradd -m ${user}
  echo ${user}:${PASSWORD}|chpasswd
  passwd -e ${USER_NAME}
fi

log 'Done.'
log 'Here is the password:'

echo "${PASSWORD}"

exit 0