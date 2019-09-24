#!/bin/bash

usage(){
	echo "Usage"
}

LEN=10
SPEC_FLAG=false
SPEC_LEN=0
FLAG=false

while getopts l:s:o OPTION
do
	case "${OPTION}" in
		l)
			LEN=${OPTARG}
			;;
		s) 
			SPEC_FLAG=true
			SPEC_LEN=${OPTARG}
			;;
		o)
			FLAG=true
			;;
	esac
done

LEN=$((${LEN}-${SPEC_LEN}))
#echo ${LEN}
echo 'Generation a password:'

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})
#echo ${PASSWORD}

if [[ "${SPEC_FLAG}" = 'true' ]]
then
	SPEC_STRING=""

	while [[ ${SPEC_LEN} > 0 ]]
	do
		SPEC_CHAR=$(echo "!@#$%^&*()_+=" | fold -w1 | shuf | head -c1)
		SPEC_STRING=${SPEC_STRING}${SPEC_CHAR}
		SPEC_LEN=$((${SPEC_LEN}-1))
	done
fi	
#echo ${SPEC_STRING}

if [[ "${FLAG}" = "true" ]]
then
	PASSWORD=$(echo "${PASSWORD}${SPEC_STRING}" | fold -w1 | shuf | tr -d '\n')
fi
echo ${PASSWORD}

USER_NAME=${@: -1}
COMMENT="new user"

useradd -c "${COMMENT}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd
