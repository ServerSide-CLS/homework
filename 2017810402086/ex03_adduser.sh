#!/bin/bash

LEN=16
SPECIAL_CHAR_NUMBER=0
IS_RANDOM=0
SPECIAL_CHAR="!@#$%^&*()_+"

#说明
usage(){
	echo "	-l	password length"
	echo "	-s	number of sepcial characters"
	echo "	-o	out of order"
	exit 1
}

#检查参数是否为整数
checkInt(){
	if [[ $( isInt $1 ) -eq 1 ]]
	then
		echo "err: $2 must be integer" >&2
		exit 1
	fi
}

isInt(){
	if [[ $1 -gt 0 ]] 2> /dev/null
	then
		echo 0
	else
		echo 1
	fi
}

while getopts l:s:o OPTION
do
	case "${OPTION}" in
		l)
			LEN="${OPTARG}"
			checkInt ${LEN} "password length"
			;;
		s)
			SPECIAL_CHAR_NUMBER="${OPTARG}"
			checkInt ${SPECIAL_CHAR_NUMBER} "number of sepcial characters"
			;;
		o)
			IS_RANDOM=1
			;;
		?)
			usage
			;;
	esac
done

#检查特殊字符长度是否比密码长度长
if [[ ${SPECIAL_CHAR_NUMBER} -gt ${LEN} ]]
then
	echo "err: number of sepcial characters must less than length of password" >&2
	exit 1
fi

#检查是否输入username
if [[ $OPTIND -le $# ]]
then
	USER_NAME=${!OPTIND}
else
	echo "err: please enter username" >&2
	exit 1
fi

#生成普通字符部分密码
PASSWORD=$( date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$[ LEN-SPECIAL_CHAR_NUMBER ] )

#生成特殊字符部分密码
if [[ ${SPECIAL_CHAR_NUMBER} -gt 0 ]]
then	
	for S_CHAR in $(seq 1 ${SPECIAL_CHAR_NUMBER})
	do
		PASSWORD=$( echo ${PASSWORD}$( echo ${SPECIAL_CHAR} | fold -w1 | shuf | head -c1 ) )
	done
fi

#打乱普通字符与特殊字符
if [[ ${IS_RANDOM} -eq 1 ]]
then
	PASSWORD=$( echo ${PASSWORD} | fold -w1 | shuf | tr -d '\n' )
fi

useradd -m ${USER_NAME}
echo ${USER_NAME}:${PASSWORD} | chpasswd

echo "Username: ${USER_NAME}"
echo "Password: ${PASSWORD}"