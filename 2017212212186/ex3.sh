#!/bin/bash
usage() {
    	echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
    	echo 'Generate a random password'
    	echo '  -l LENGTH specify the password length' 
    	echo '  -s Append a special char to the password'
    	echo '  -o Shuffle password'
    	exit 1
}

log() {
	local MSG="${@}"
	echo "${MSG}"
}


LEN=48
LEN1=0

while getopts ol:s: OPTION
do
	case "${OPTION}" in
        	o)  
            	SHUF_CHAR='true'
            	;;
        	l)   
            	LEN="${OPTARG}"
            	;;
        	s) 
            	USE_SPEC_CHAR='true'
			LEN1="${OPTARG}"
            	;;
        	?)
            	usage
            	;;
    	esac
done

log 'Generation a password'

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})

if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
	log 'select a random special char.'
    	SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | tr -d '\n' |head -c${LEN1})
    	PASSWORD="${PASSWORD}${SPEC_CHAR}"
fi

if [[ "${SHUF_CHAR}" = 'true' ]]
then
	log  'shuffling password.'
	PASSWORD=$(echo "${PASSWORD}" | fold -w1 | shuf | tr -d '\n' )
fi

log 'Done.'
log 'Here is the password:'

echo "${PASSWORD}"

USER_NAME=${@: -1}

echo "${USER_NAME}"

useradd ${USER_NAME}
echo ${USER_NAME}:${PASSWORD} | chpasswd

exit 0