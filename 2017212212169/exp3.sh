#!/bin/bash

usage() {
    echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
    echo 'Generate a random password'
    echo '  -l The password length'
    echo '  -s The special char length'
    echo '  -o Unordered password'
    exit 1
}

LEN=48

while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)
      LEN="${OPTARG}"
      ;;
    s)
      USE_SPEC_CHAR='true'
      L="${OPTARG}"
      ;;
    o)
      OUT_OF_ORDER='true'
      ;;
    ?)
      usage
      ;;
  esac
done

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c ${LEN})

if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | tr -d '\n' | head -c${L})
  l=$[LEN-L]
  PASSWORD=$(echo ${PASSWORD} | head -c${l})
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
fi

if [[ "${OUT_OF_ORDER}" = 'true' ]]
then
  PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf | tr -d '\n' | head -c${LEN})
fi

USER_NAME=${!#}
useradd -m ${USER_NAME}
echo ${USER_NAME}:${PASSWORD}|chpasswd

echo "${USER_NAME}:${PASSWORD}"

exit 0