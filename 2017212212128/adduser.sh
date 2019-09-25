#!/bin/bash
LENGTH=8
USER_NAME="user"
SPECIAL_NUM=0
FLAG=false
COMMENT="user"
while getopts l:s:o: OPTION
do 
	case "${OPTION}" in

	l)
		LENGTH=${OPTARG}
		USER_NAME="$3"
		;;
	s)
		SPECIAL_NUM=${OPTARG}
		USER_NAME="$5"
		;;
	o)
		FLAG=true
		USER_NAME="$6"
		;;
	?)
		usage
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

useradd -c "${COMMENT}" -m ${USER_NAME}
echo ${USER_NAME}:${PASSWORD} | chpasswd

echo ${PASSWORD}

