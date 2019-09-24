#!/bin/bash
TOTAL_LENGTH=0
SPECIAL_CHAR_LEN=0
ORDER='false'

while getopts l:s:o OPTION
do
		case "${OPTION}" in
				l)
					TOTAL_LENGTH="${OPTARG}"	
						;;
			    s)
					SPECIAL_CHAR_LEN="${OPTARG}"
						;;
				o)
					ORDER='true'
						;;
		esac
done

USER_NAME=${@:(-1)}
count=0

	


if [[ "${ORDER}" = 'false' ]];
then
		len=` expr ${TOTAL_LENGTH} - ${SPECIAL_CHAR_LEN}`
		NUM=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$len)
		SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w10 | shuf | head -c${SPECIAL_CHAR_LEN})
		PASSWORD="${NUM}${SPECIAL_CHAR}"

else

		for ((i=1; i<=TOTAL_LENGTH ; i++));do
				{
					x=$(((RANDOM % 10) + 1))
					y=$((($x % 2)))
					if (($y == 0 && count <$SPECIAL_CHAR_LEN ));
					then
							SPECIAL_char=$(echo '!@#$%^&*()_+=' | fold -w10 | shuf |head -c1)
							PASSWORD=$PASSWORD$SPECIAL_char
							count=$(($count+1))
					else
							NUM=$(date +%s%N | sha256sum | head -c1)
							PASSWORD=$PASSWORD$NUM
					fi
				}
		done

fi


#read -p 'Enter person info:' COMMENT

useradd -c "${COMMENT}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd
echo  "$USER_NAME,your password is:$PASSWORD"


