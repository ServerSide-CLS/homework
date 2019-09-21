#!/bin/bash

let LEN=8
let SPEC_LEN=0
SHUF='false'
let x=1

if [ $# -eq 0 ];
then
	echo "Please enter your usernmae"
	exit 1
fi

while getopts l:s:o OPTION
do 
	case "${OPTION}" in
		l)
			let LEN=${OPTARG}
			((x += 2))
			;;
		s)
			let SPEC_LEN=${OPTARG}
			((x += 2))
			;;
		o)
			SHUF='true'
			((x += 1))
			;;
		?)
			echo 'invalid option' >&2
			exit 1
			;;
	esac
done

USERNAME=${!#}

PASS=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})

let i=1

while [ $i -le $SPEC_LEN ]
do 
	PASS=${PASS}$(echo '!@#$%^&*()_+' | fold -w1 | shuf | head -c1)
	((i += 1))
done

if [ ${SHUF} = "true" ];
then
	PASS=$(echo ${PASS} | fold -w1 | shuf | tr -d '\n')
fi

useradd -c "${USERNAME}" -m "${USERNAME}"

echo ${USERNMAE}:${PASS}|chpasswd

passwd -e ${UERNAME}

echo ${PASS}
