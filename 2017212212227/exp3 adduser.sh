#!/bin/bash

usage() {
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s LENGTH specify special char to the password'
  echo '  -o reordering'
  exit 1
}

LEN=48
SPE_LEN=0
Reo=false
USER_NAME=${@: -1}
echo $USER_NAME
while getopts l:s:o OPTION
do
  case "${OPTION}" in
    o)
      echo '0'
      Reo=true
      ;;
    l)   
      LEN="${OPTARG}"
      ;;
    s)
      SPE_LEN="${OPTARG}"
      USE_SPEC_CHAR='true'
      ;;
    ?)
      usage
      ;;
  esac
done

let LEN=LEN-SPE_LEN

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})

if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w${SPE_LEN} | shuf | head -c${SPE_LEN})
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
fi

if [[ "${Reo}" = 'true' ]]
then
  let LEN=LEN+SPE_LEN
  echo LEN
  PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf | tr '\n' '\0')
fi

COMMENT=${USER_NAME}

echo ${PASSWORD}

useradd -c "${COMMENT}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd

passwd -e ${USER_NAME}
