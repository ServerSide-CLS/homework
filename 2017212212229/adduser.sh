#!/bin/bash

read -p 'Enter username:' USER_NAME

a=$((${RANDOM}%7))
b=$((${RANDOM}%7))
while((a == b))
do
a=$((${RANDOM}%7))
b=$((${RANDOM}%7))
done

min=0
lenth=0
if [ $a -gt $b ]
then
	min=$b
	lenth=$a-$b
else
	min=$a
	lenth=$b-$a
fi

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c6 )
paswd1=${PASSWORD: 0: $min}
paswd2=${PASSWORD: $min: $lenth}
paswd3=${PASSWORD: $min+$lenth}

SPECIAL_CHAR1=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
SPECIAL_CHAR2=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
password=$paswd1$SPECIAL_CHAR1$paswd2$SPECIAL_CHAR2$paswd3

useradd -m ${USER_NAME}
echo ${USER_NAME}:${password}|chpasswd
echo 'User created successfully!'
echo 'Your username:' $USER_NAME
echo 'Your password:' $password

