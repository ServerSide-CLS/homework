#!/bin/bash

Usage() {

	echo -e "\nUsage: ${0} [-l LENGTH] [-s SPECIAL_NUM] [-o IS_SHUF]\n" >&2
	
	echo -e 'create a new user\n'
	
	echo -e '-l LENGTH specify the password length\n'
	
	echo -e '-s LENGTH specify the special char length\n'
	
	echo -e '-o Judge whether to shuf password or not\n'
	
	exit 1
}

LENGTH=8

SPECIAL_NUM=2

FLAG=false

USER_NAME=${!#}

echo ${USER_NAME}

while getopts ol:s: OPTION
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
		Usage
		;;
	esac
done

if [[ -z $USER_NAME ]]
	then 
		echo 'user name is empty!'
else
	CHAR_NUM=$((${LENGTH}-${SPECIAL_NUM}))

	PASSWD_CHAR=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${CHAR_NUM})

	for((i=0;i<${SPECIAL_NUM};i++))
	do
		SPECIAL=$(echo '!@#$%^&*()_+' | fold -w1 | shuf | head -c1)

		WORD=${WORD}${SPECIAL}
	done

	PASSWORD=${PASSWD_CHAR}${WORD}

	if ${FLAG}
		then PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf| tr -d '\n')
	fi


	echo ${PASSWORD}

	useradd -c "${USER_NAME}" -m ${USER_NAME}

	echo ${USER_NAME}:${PASSWORD} | chpasswd

fi



