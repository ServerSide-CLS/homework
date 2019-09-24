#!/bin/bash

order='true'
while getopts l:s:o OPTION
do
	case "${OPTION}" in
		l)
			length="${OPTARG}"
			;;
		s)
			special_char="${OPTARG}"
			;;
		o)
			order='false'
			;;
	esac
done

Leng=$((length - special_char))
Passwd=$(date +%s%N${RANDOM}${RANDOM} |sha256sum |head -c ${Leng} )
for((i=0;i<special_char;i++));do
{
	spec=$(echo '!@#$%^&()_+=' | fold -w1 | shuf |head -c1)
	Passwd=$Passwd$spec
}
done

if (("$order" == "false"));
then
	Passwd=$(echo ${Passwd} | fold -w1 | shuf | tr -d '\n')
fi
USER_NAME=${!#}
useradd -m ${USER_NAME}

echo ${USER_NAME}:${Passwd}|chpasswd
echo "Username: ${USER_NAME} , Password: ${Passwd}"



