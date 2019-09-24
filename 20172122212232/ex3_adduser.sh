#! /bin/bash

usage(){
    echo "Usage: ${0} [-l TOTAL_LEN] [-s SPECIAL_LEN] [-o] [msg]"
    echo '-l total_pwd_length'
    echo '-s special_char_amount in your pwd'
    echo '-o luanxu'
    echo 'msg username'
    exit 1
}

TOTAL_LEN=48
SPECIAL_LEN=48

while getopts l:s:o  OPTION
do
    case "${OPTION}" in 
    l)
        TOTAL_LEN="${OPTARG}"
        ;;
    s)
        SPECIAL_LEN="${OPTARG}"
        USE_SPEC_CHAR='true'
        ;;
    o)
        USE_LUANXU='true'   
        ;;
    ?)
        usage
        ;;
    esac 
done

#SET USR_NAME,PWD
USER_NAME=$3
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${TOTAL_LEN})

#SET USR_NAME,PWD
if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then 
    USER_NAME=$5
    TOTAL_LEN=$[${TOTAL_LEN}-${SPECIAL_LEN}]
    SPECIAL_LEN=$[${SPECIAL_LEN}*2]
    SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c${SPECIAL_LEN})
    PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${TOTAL_LEN})
    PASSWORD=$(echo "${PASSWORD}${SPEC_CHAR}" | tr -d '\n')
fi

#SET USR_NAME,PWD
if [[ "${USE_LUANXU}" = 'true' ]]
then 
    USER_NAME=$6
    TOTAL_LEN=$[${TOTAL_LEN}+${TOTAL_LEN}+${SPECIAL_LEN}]
    PASSWORD=$(echo "${PASSWORD}" | fold -w1 | shuf |head -${TOTAL_LEN} | tr -d '\n')
fi

echo 'Username:'${USER_NAME}''

echo 'Password:'${PASSWORD}''

#add user
useradd -c "${COMMENT}" -m ${USER_NAME}

#add pwd
echo ${USER_NAME}:${PASSWORD}|chpasswd

#reset pwd
passwd -e ${USER_NAME}

exit 0