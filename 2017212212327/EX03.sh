#!/bin/bash

usage() {
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo 'create an account and random password'
  echo ' -l password length' 
  echo ' -s the number of special char'
  echo ' -o random your password'
  exit 1
}

LENGTH=8
USER_NAME="user"
SPECIAL_NUM=0
FLAG=false
COMMENT="user"
str=${@: -1}


while getopts l:s:o: OPTION
do 
	case "${OPTION}" in

	l)
		LENGTH=${OPTARG}
		;;
	s)
		SPECIAL_NUM=${OPTARG}
		;;
	o)
		FLAG=true
		;;
	?)
		usage
        exit 1
		;;
	esac
done

CHAR_NUM=$((${LENGTH}-${SPECIAL_NUM}))

PASS=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${CHAR_NUM})

for((i=0;i<${SPECIAL_NUM};i++))
do
	SPECIAL=$(echo '!@#$%^&*()_+' | fold -w1 | shuf | head -c1)

	WORD=${WORD}${SPECIAL}
	
done

PASSWORD=${PASS}${WORD}

if ${FLAG}

	then PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf| tr -d '\n')

fi

useradd -c "${COMMENT}" -m ${str}
echo ${str}:${PASSWORD} | chpasswd

echo "username:${str}"
echo "password:${PASSWORD}"