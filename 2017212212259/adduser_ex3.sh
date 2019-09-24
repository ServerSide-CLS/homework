#!/bin/bash
LEN=48
SPEC_CHAR_LEN=48
SPEC_SEN=''
while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)
      LEN="${OPTARG}"
      ;;
    s)
      SPEC_WORD='true'
      SPEC_CHAR_LEN="${OPTARG}"
      ;;
    o)
      UPSET_ORDER='true'
   esac
done

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})

if [[ "${SPEC_WORD}" = 'true' ]]
then
  for((integer = 1; integer <= ${SPEC_CHAR_LEN}; integer++))
  do
      SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
      SPEC_SEN="${SPEC_SEN}${SPEC_CHAR}"
  done
LEN=$[LEN-SPEC_CHAR_LEN]
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})
PASSWORD="${PASSWORD}${SPEC_SEN}"
fi

if [[ "${UPSET_ORDER}" = 'true' ]]
then
  PASSWORD=$(echo "${PASSWORD}" | fold -w1 | shuf |tr -d '\n')
fi

USER_NAME=${!#}
echo "USERNAME:${USER_NAME}"
read -p 'Enter person info:' COMMENT
echo "PASSWORD:${PASSWORD}"
useradd -c "${COMMENT}" -m ${USER_NAME}
echo ${USER_NAME}:${PASSWORD}|chpasswd
