#!/bin/bash

while getopts "l:s:o" arg
    do
        case $arg in
            l)
                PASSWORD_PRELEN="$OPTARG"
                PASSWORD_LEN=$[$PASSWORD_PRELEN]
                ;;
            s)
                FLAGS=true
                PASSWORD_LEN=$[$PASSWORD_PRELEN-$OPTARG]
                SPECIAL_CHARLEN=$[$OPTARG]
                ;;
            o)
                FLAGO=true
                ;;
            ?)
                echo "unkonw argument"
        exit 1
        ;;
    esac
done

TEMP_PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$PASSWORD_LEN )

if [ ! $FLAGS ] ;then

    PASSWORD=$(echo "${TEMP_PASSWORD}")

else

    SPECIAL_CHAR=$(echo '!@#$^&*()_+=' | fold -w$SPECIAL_CHARLEN | shuf | head -c$SPECIAL_CHARLEN )

    PASSWORD=$(echo "${TEMP_PASSWORD}${SPECIAL_CHAR}")

fi

if [ ! $FLAGO ] ;then

    PASSWORD=$(echo "${PASSWORD}")

else
   
    PASSWORD=$(echo "${PASSWORD}" | fold -w1 | shuf | tr -d '\n')

fi

USER_NAME=${@: -1}

echo "Your username: $USER_NAME"
echo "Your password: $PASSWORD"

useradd -c "${COMMENT} " -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd

passwd -e ${USER_NAME}