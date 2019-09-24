#!/bin/bash

usage() {
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s Append some special char to the password'
  echo '  -o Shuffle it!'
  exit 1
}

LEN=48

Username=${!#}

while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)   
      LEN="${OPTARG}"
      ;;
    s)
      SPEC='true' 
      USE_SPEC_CHAR="${OPTARG}"
      ;;
    o) 
      order='false'
      ;;
    ?)
      usage
      ;;
  esac
done

echo 'Generation a password'

if [[ "${SPEC}" = 'true' ]]
then
  PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$((${LEN}-${USE_SPEC_CHAR})))
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | tr -d '\n' | head -c${USE_SPEC_CHAR})
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
else
  PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})
fi
 

if [[ "${order}" = 'false' ]]
then
  FINAL_CHAR=$(echo "${PASSWORD}" | fold -w1 | shuf | tr -d '\n'})
else
  FINAL_CHAR="${PASSWORD}"
fi

echo "${FINAL_CHAR}"

echo ${Username}:${FINAL_CHAR}|chpasswd
