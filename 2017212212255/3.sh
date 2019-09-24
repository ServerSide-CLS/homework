#!/bin/bash

usage() {
  echo "Usage: ${0} [-s SPECIAL_CHAR_LENGTH] [-l LENGTH] [-o]"
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s Append a special char to the password'
  echo '  -o Change the order'
  exit 1
}

LEN=48

USERNAME=${!#}

while getopts l:s:o OPTION
do
  case "${OPTION}" in
    o)  
      SHUFFLE='true'
      ;;
    l)   
      LEN="${OPTARG}"
      ;;
    s)
      SPEC='true' 
      SPECIAL_CHAR_LENGTH="${OPTARG}"
      ;;
    ?)
      usage
      ;;
  esac
done

echo "Generation a password.  Comment same as username."

if [[ "${SPEC}" = 'true' ]]
then
  PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$((${LEN}-${SPECIAL_CHAR_LENGTH})))
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | tr -d '\n' | head -c${SPECIAL_CHAR_LENGTH})
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
else
  PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})
fi


if [[ "${SHUFFLE}" = 'true' ]]
then
  FINAL_CHAR=$(echo "${PASSWORD}" | fold -w1 | shuf | tr -d '\n'})
else
  FINAL_CHAR=${PASSWORD}
fi

echo "${FINAL_CHAR}"

useradd -c "${USERNAME}" -m ${USERNAME}
echo ${USERNAME}:${FINAL_CHAR}|chpasswd

