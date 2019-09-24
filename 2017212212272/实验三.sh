#!/bin/bash

LEN1=48
LEN2=0
isorder=1

while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)
      LEN1="${OPTARG}"
      ;;
    s)
      LEN2="${OPTARG}"
      ;;
    o)
      isorder=0
      ;;
  esac
done
read -p "" USER_NAME
LEN1=$(($LEN1-$LEN2))
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN1})
for ((i = 0 ;i < ${LEN2} ;i++))
do
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
done

if (($isorder==0))
then
  PASSWORD=$(echo ${PASSWORD}|fold -w1|shuf|tr -d '\n')
fi

sudo useradd -m ${USER_NAME}
echo ${USER_NAME}:${PASSWORD}|sudo chpasswd
echo "your password:"${PASSWORD}
sudo passwd -e ${USER_NAME}
