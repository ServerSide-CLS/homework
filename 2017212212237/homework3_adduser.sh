#!/bin/bash
while getopts l:s:o OPTION
do
        case "${OPTION}" in
                l)
                        LEN="${OPTARG}"
                        ;;
                s)
                        USE_SPEC_CHAR='true'
                        LEN_RANDOM="${OPTARG}"
                        ;;
                o)
                        FlagRandom='true'
                        ;;
                ?)
                        echo "Error Option"
                        exit 1
                        ;;
        esac
done

USER_NAME=${@: -1}

NUM_LEN=$[LEN-LEN_RANDOM]
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${NUM_LEN})
if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
        SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w${LEN_RANDOM}  | shuf | head -c${LEN_RANDOM} )
#       echo "${SPECIAL_CHAR}"
        PASSWORD="${PASSWORD}${SPECIAL_CHAR}"
fi
echo 'USER_NAME IS'
echo ${USER_NAME}
echo ""

echo 'PASSWORD IS'
if [[ "${FlagRandom}" = "true" ]]
then
        echo "${PASSWORD}" | fold -w1 |shuf|tr -d '\n'
        echo ""
else
        echo "${PASSWORD}"
        echo ""
fi

useradd -c "${USER_NAME}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd  //对 user 用户修改密码，密码为 password 

passwd -e ${USER_NAME}

