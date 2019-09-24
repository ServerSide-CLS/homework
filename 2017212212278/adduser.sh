#!/bin/bash
read -p 'Enter username:' USER_NAME
useradd -m ${USER_NAME}
x=0
for ((i=0;i<8;i++));do
{
        c=$RANDOM
        d=$(($c%2))
        if((d == 0 && x < 2));
        then
        SPECIAL_CHAR=$(echo '!@#$%^&()_+=' | fold -w1 | shuf |head -c1)
        #echo -n ${SPECIAL_CHAR}
        PASSWORD=$PASSWORD$SPECIAL_CHAR
        x=$(($x+1))
        else
        PASSW=$(date +%s%N${RANDOM}${RANDOM} |sha256sum |head -c1)
        #echo -n ${PASSW}
        PASSWORD=$PASSWORD$PASSW
fi
}
done
echo ${USER_NAME}:${PASSWORD}|chpasswd
echo "NAME:${USER_NAME},PASSWORD:${PASSWORD}"

