#!/bin/bash

usage() {
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s Append special chars to the password'
  echo '  -o Sulf your password'
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
CHAR_LEN=0
NUM_LEN=0

while getopts s:l:?o OPTION
do
  case "${OPTION}" in
    s)
      CHAR_LEN="${OPTARG}"
      ;;
    l)   
      LEN="${OPTARG}"
      ;;
    o) 
      USE_SULF='true'
      ;;
    ?)
      usage
      ;;
  esac
done

# 输入用户名
USER_NAME=${@: -1}
echo ${USER_NAME}

# 输入用户描述
COMMENT=${USER_NAME}


# 创建密码
log 'Generation a password'

NUM_LEN=$((LEN-CHAR_LEN))
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${NUM_LEN})

log 'select random special chars.'
SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf |tr -d '\n'| head -c${CHAR_LEN})
PASSWORD="${PASSWORD}${SPEC_CHAR}"

if [[ "${USE_SULF}" = 'true' ]]
then
 PASSWORD=$(echo ${PASSWORD} |fold -w1 | shuf |tr -d '\n')
fi

#create user and password
log 'Done.'
log 'Here is the password:'

useradd -c "${COMMENT}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd
echo "your password:"$PASSWORD

# 首次登录修改密码
passwd -e ${USER_NAME}



