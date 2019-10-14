#!/bin/bash

#使用说明
usage() {
    echo "Usage: ${0} [-l LENGTH OF PASSWORD] [-s LENGTH OF SPECIAL CHARACTERS] [-o SET DISORDER] username" >&2
    echo 'Generate a random password and create your account.'
    echo '  -l Set the length of password.' 
    echo '  -s Set the length of special characters.'
    echo '  -o Set characters disordered.'
    echo '  Input your username.'
    exit 1        
}

USER_NAME=${!#}
PWD_LEN=8
SPECIAL_LEN=0
ORDER=false

if [ $# -eq 0 ];
then
	echo "Please enter your username:"
	exit 1
fi

while getopts l:s:o OPTION
do
    case "$OPTION" in
        l)
            PWD_LEN=${OPTARG}
        ;;
        s)
            SPECIAL_LEN=${OPTARG}
        ;;
        o)
            ORDER=true
        ;;
        ?)
            usage
            exit 1
        ;;
    esac 
done

NUM_LENGTH=PWD_LEN-SPECIAL_LEN

RANDOM_NUM=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$((${NUM_LENGTH})))

for ((i=0;i < ${SPECIAL_LEN};i++))
do
    SPECIAL_CHAR=$(echo '!@#$%^&*()_+' | fold -w1 | shuf | head -c1)
	RANDOM_WORD=${RANDOM_WORD}${SPECIAL_CHAR}
done

PASSWORD="${RANDOM_NUM_NUM}${RANDOM_WORD}"

if ${ORDER};
then
    PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf | tr -d '\n' )
fi	

useradd -c "${USER_NAME}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd

echo "ACCOUNT:${USER_NAME}'s PASSWORD is:${PASSWORD}."

passwd -e ${USER_NAME}

exit 0
