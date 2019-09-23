#!/bin/bash

usage() {
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s Append a special char to the password'
  echo '  -o Out of order'
  exit 1
}

USER_NAME=${@: -1}
SPECIAL_CHAR_NUMBER=0
IS_ORDER='true'
while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)   
      LEN="${OPTARG}"
      ;;
    s) 
      USE_SPEC_CHAR='true'
      SPECIAL_CHAR_NUMBER="${OPTARG}"
      ;;
    o)  
      IS_ORDER='false'
      ;;
    ?)
      usage
      ;;
  esac
done

LEN=$(($LEN-$SPECIAL_CHAR_NUMBER))

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN} )

if [[ "${USE_SPEC_CHAR}" = 'true' ]] #添加特殊字符
then
  SPECIAL_CHAR=$(echo '.!@#$%^&*()_+=' | fold -w${SPECIAL_CHAR_NUMBER} | shuf | head -c${SPECIAL_CHAR_NUMBER} )
  PASSWORD="${PASSWORD}${SPECIAL_CHAR}"
fi

LEN=$(($LEN+$SPECIAL_CHAR_NUMBER))
if [[ "${IS_ORDER}" = 'false' ]] #乱序
then
  while(($LEN>0))
  do
  a=$((${RANDOM}%${LEN}))
  paswd=${PASSWORD: $a: 1}$paswd
  PASSWORD=${PASSWORD: 0: $a}${PASSWORD: $a+1}
  LEN=$(($LEN-1))
  done
  password=$paswd
else
  password=$PASSWORD
fi

useradd -m ${USER_NAME}
echo ${USER_NAME}:${password}|chpasswd
echo 'User created successfully!'
echo 'Your username:' $USER_NAME
echo 'Your password:' $password






