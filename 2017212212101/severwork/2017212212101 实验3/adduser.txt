#!/bin/bash

usage() {
  echo "Usage: ${0} [-l LENGTH] [-s LENGTH] [-o] [username]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length'
  echo '  -s Append a special char to the password'
  echo '  -o Out of order characters'
  exit 1
}


log() {
  local MSG="${@}"
  if [[ "${VERBOSE}" = 'true' ]]
  then
    echo "${MSG}"
  fi
}

USERS_PARAMAS="${#}"
if [[ "${USERS_PARAMAS}" -lt 1 ]]
then
  usage
  exit 1
fi

LEN=20

USERNAME=${!#}

while getopts vl:s:o OPTION
do
  case "${OPTION}" in
    v) 
      VERBOSE='true'
      log 'verbose mode on'
      ;;
    l)  
      LEN="${OPTARG}"
      ;;
    s)
      USE_SPEC_CHAR='true'
      S_LEN="${OPTARG}"
      ;;
    o)
      USE_DIS='true'
      ;;
    ?)
      usage
      ;;
  esac
done

log 'Generation a password'

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c $((${LEN}-${S_LEN})))

if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
for((i=0;i<$S_LEN;++i))
do
  log 'select a random special char.'
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
done
fi

if [[ "${USE_DIS}" = 'true' ]]
then
  PASSWORD=$(echo $PASSWORD|fold -w1|shuf|tr -d '\n')
fi


useradd -c "${COMMENT}" -m ${USERNAME}

echo ${USERNAME}:${PASSWORD}|chpasswd

echo "ÃÜÂë£º${PASSWORD}"

exit 0