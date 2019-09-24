#!/bin/bash

#l 总长度 s特殊字符数量 o编码顺序
usage() {
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo '  -l Total Length of the password' 
  echo '  -s Sum of Special chars'
  echo '  -o Disorder'
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
      log 'verbose mode on'
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

log 'Generation a password'

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})

log 'Create User'

USER_NAME=${!#}
useradd -c "${USER_NAME}" -m ${USER_NAME}
echo ${USER_NAME}:${PASSWORD}|chpasswd

if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
  log 'select a random special char.'
  lenth=$[LEN-len]
  PASSWORD=$(echo ${PASSWORD} | head -c${lenth})
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | tr -d '\n' |head -c${len})
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
fi

if [[ "${Disorder}" = 'true' ]]
then  
  PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf | tr -d '\n' )
fi

log 'Done.'
log 'Here is the username and password:'

echo "user name:${USER_NAME}"
echo "password:${PASSWORD}"

exit 0