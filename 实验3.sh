#!/bin/bash

while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)   
      LEN="${OPTARG}"
      ;;
    s) 
      USE_SPEC_CHAR='true'
      LEN1="${OPTARG}"
      ;;
      o)
      LX="true"
      ;;
    ?)
      echo "Error!"
      ;;
  esac
done
if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
  SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w${LEN1}  | shuf | head -c${LEN1} )
  Clen=$[LEN-LEN1]
  PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${Clen} )
else
    PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN} )
fi
PASSWORD=${PASSWORD}${SPECIAL_CHAR}
if [[ "${LX}" = "true" ]]
then
  echo "${PASSWORD}" | fold -w1 |shuf|tr -d '\n'
else
  echo "${PASSWORD}"
fi