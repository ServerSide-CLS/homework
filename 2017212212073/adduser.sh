#!/bin/bash

usage() {
  echo "Usage: ${0} [-l LENGTH] [-s special char] [-o ORDER]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s Append special char to the password'
  echo '  -o ORDER disorder the password'
  exit 1
}

if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
  LEN=`expr ${LEN1} - ${CH}`
  PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w${CH} | shuf | head -c${CH})
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
fi

if [[ "${PWA_ORDER}" = 'true' ]]
then
  LEN=`expr ${LEN1} - ${CH}`
  PASSWORD=$(exho ${PASSWORD} | fold -w1 | shuf | tr -d '\n' | head -c${LEN1})
fi

LEN=8
PAW_ORDER='true'

ARRAY=(${@})
NUM=${#}
USER_NAME=${ARRAY[$NUM-1]}

while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)   
      LEN1="${OPTARG}"
      ;;
    s)   
      CH="${OPTARG}"
      ;;
    o)
      PAW_ORDER='false'
      ;;
    ?)
      echo 'Invalid option' >&2 ; 
      usage
      ;;
  esac
done

useradd -c "${COMMENT}"  -m "${USER_NAME}"

echo "your password : ${PASSWORD}"

echo ${USERNAME}:${PASSWORD}|chpasswd
passwd -e ${USERNAME}