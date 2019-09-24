#!/bin/bash

# l总长度 s特殊字符数量 o编码顺序乱序

usage() {
    echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
    echo 'Generate a random password'
    echo '  -l Specify the password length'
    echo '  -s Specify the length of the special char'
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
      ;;
    s)
      USE_SPEC_CHAR='true'
      SPEC_LEN="${OPTARG}"
      ;;
    o)
      DISORDER='true'
      ;;
    ?)
      usage
      ;;
  esac
done

USER_NAME=${!#}
useradd -m ${USER_NAME}

log 'Generation a password.'

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c ${LEN})

if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
  GEN_LEN=$[LEN-SPEC_LEN]
  PASSWORD=$(echo ${PASSWORD} | head -c${GEN_LEN})
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | tr -d '\n' | head -c${SPEC_LEN})
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
fi

if [[ "${DISORDER}" = 'true' ]]
then
  PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf | tr -d '\n')
fi

log 'Done.'
echo "The usename is: ${USER_NAME}"
echo "The password is: ${PASSWORD}"

exit 0