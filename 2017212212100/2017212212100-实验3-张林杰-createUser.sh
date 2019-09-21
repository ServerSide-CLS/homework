#!/bin/bash

usage(){
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo "Generate a random password"
  echo " -l LENGTH special the password length"
  echo " -s Append a special char to the password"
  echo " -o disruption of order"
  exit -1
}


LEN=48
SPEC_NUM=0
while getopts "l:s:o" OPTION
do
	case "${OPTION}" in
		o)
			Unorder='true'
			;;
		l)
			LEN="${OPTARG}"
			;;
		s)
			USE_SPEC_CHAR='true'
			SPEC_NUM="${OPTARG}"
			;;
		?)
			usage
	esac
done

LENGTH=`expr ${LEN} - ${SPEC_NUM}`

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LENGTH})

if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
	SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w${SPEC_NUM} | shuf | head -c${SPEC_NUM})
	PASSWORD="${PASSWORD}${SPEC_CHAR}"
fi


if [[ "${Unorder}" = 'true' ]]
then
	PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf|tr -d '\n')
fi



USER_NAME=${!#}

echo "${USER_NAME}"

echo "${PASSWORD}"

useradd -c ${USER_NAME} -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd

passwd -e ${USER_NAME}


