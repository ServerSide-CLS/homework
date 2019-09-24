#!/bin/bash
read -p 'Enter username:' USER_NAME

read -p 'Enter person info:' COMMENT

count=0
for i in {1..8};do
		{
				x=$(((RANDOM % 10) + 1))
				y=$(($x % 2))
				if (($y == 0 && $count < 2));
				then
				SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w2 |shuf |head -c1)
				PASSWORD=$PASSWORD$SPECIAL_CHAR
				count=$(($count + 1))
				else
				NUM=$(date +%s%N | sha256sum |head -c1)
				PASSWORD=$PASSWORD$NUM
				fi
}
done
echo "$PASSWORD"

#read -p 'Enter password:' PASSWORD

useradd -c "${COMMENT}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd
echo "NAME:${USER_NAME},PASSWORD:${PASSWORD}"

passwd -e ${USER_NAME}
