#!/bin/bash

LEN=8
USE_SPEC_CHAR=0
ISMIX=false
while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)
      LEN="${OPTARG}"
      ;;
    s)
      USE_SPEC_CHAR="${OPTARG}"
      ;;
    o)
      ISMIX=true
      ;;
  esac
done
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$((LEN-USE_SPEC_CHAR)))
while [[ $USE_SPEC_CHAR > 0 ]]
do
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
  USE_SPEC_CHAR=$((${USE_SPEC_CHAR}-1))
  PASSWORD=${PASSWORD}${SPEC_CHAR}
done
if [[ "${ISMIX}" = 'true' ]]
then
  PASSWORD=$(echo $PASSWORD | fold -w1 | shuf |tr -d '\n')
fi
user_name=${!#}
comment=${user_name}
useradd -c "${comment}" -m "${user_name}"
echo ${user_name}:${PASSWORD}|chpasswd
echo "Here is the password:"${PASSWORD}
exit 0
