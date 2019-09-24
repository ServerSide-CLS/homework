#!/bin/bash

LEN=8
CHAR=0
CHANGE=false

usage(){
  echo "Usage:${0} [-l] [-s] [-o] [username]" >&2
  echo "To adduser and set random password"
  echo " -l Total length of password"
  echo " -s Number of special characters in the password"
  echo " -o Let password in random order"
  echo "Finally username must be entered!"
  exit 1
}

USERNAME=${!#}

if [[ $# -lt 1 ]];
then 
  usage
fi



while getopts ol:s: OPTION
do
  case "${OPTION}" in
    l)  
      LEN=${OPTARG}
      ;;
    s)   
      CHAR=${OPTARG}
      ;;
    o) 
      CHANGE=true
      ;;
    ?)
      usage
      ;;
  esac
done

PASSWORD_NUM=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$((${LEN}-${CHAR})))

for ((i=0;i < ${CHAR};i++))
do
	PASSWORD_CHAR=$(echo '!@#$%^&*()_+' | fold -w1 | shuf | head -c1)
	WORD=${WORD}${PASSWORD_CHAR}
done
PASSWORD="${PASSWORD_NUM}${WORD}"

if ${CHANGE};
then
    	PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf | tr -d '\n' )
fi	

useradd -c "${USERNAME}" -m ${USERNAME}

echo ${USERNAME}:${PASSWORD}|chpasswd

passwd -e ${USERNAME}

echo "Your password is:${PASSWORD}"


