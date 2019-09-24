#!/bin/bash

LEN=8
SPECIAL=1
RAND=false

usage() {
  echo "Usage: ${0} [-s SPECIAL] [-o] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s special char length in the password'
  echo '  -o disorder the password'
  exit 1
}

USERNAME=${!#}

if [[ $# -lt 1 ]]
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
			SPECIAL=${OPTARG}
			;;
		o)
			RAND=true
			;;
		?)
			usage
			;;
	esac
done

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$((${LEN}-${SPECIAL})))

SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w 1 | shuf | head -c1 )

PASSWORD=${PASSWORD}${SPECIAL_CHAR}

SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w 1 | shuf | head -c1 )

PASSWORD=${PASSWORD}${SPECIAL_CHAR}

if [[ ${RAND} = true ]]
then
	PASSWORD=$(echo "${PASSWORD}" | fold -w 1 | shuf | tr -d '\n')
fi

useradd -m "${USERNAME}"

echo ${USERNAME}:${PASSWORD}|chpasswd

passwd -e ${USERNAME}

echo "username:${USERNAME}"
echo "password:${PASSWORD}"
