#!/bin/bash

while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)
      LEN="${OPTARG}"
      ;;
    s)
     SPE_FLAG='true'
      SPE_CHAR="${OPTARG}"
      ;;
    o)
      DISORDER='true'
      ;;
    *)
      echo 'input a valid option' >&2
      exit 1
      ;;
  esac
done

if [[ "${SPE_FLAG}" = 'true' ]]
then
  LEN=$[${LEN}-${SPE_CHAR}]
  PWD=$(date +%s%N | sha256sum | head -c${LEN} )
  SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w2 | shuf | head -c2 )
  PWD=$(echo "${PWD}${SPECIAL_CHAR}")
else
  PWD=$(date +%s%N | sha256sum | head -c${LEN} )
fi

if [[ "${DISORDER}" = 'true' ]]
then
  PWD=$(echo ${PWD} | fold -w1 |shuf|tr -d '\n')
fi

for v in "${@}"
do
  USER_NAME="${v}"
done

useradd -c "${USER_NAME}" -m ${USER_NAME}
echo ${USER_NAME}:${PWD}|chpasswd

echo "用户创建成功!"
echo "USER_NAME:${USER_NAME},PWD:${PWD}"
