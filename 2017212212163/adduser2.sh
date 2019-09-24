#!/bin/bash

#参数少于1
NUMBER_OF_PARAMS="${#}"
echo "INPUT ${NUMBER_OF_PARAMS} arguments"

if [[ "${NUMBER_OF_PARAMS}" -lt 1 ]]
then
	echo "Usage: ${0} USER_NAME [USER_NAME]..."
  exit 1
fi

LEN=8
SPEC=0

while getopts ":l:s:o" opt
do
	case $opt in
		l)
			LEN=${OPTARG}
			echo "this is -l option.OPTARG=[$OPTARG]"
			;;
		s)
			SPEC=${OPTARG}
			echo "this is -s option.OPTARG={$OPTARG}"
			;;
		o)
			ORDER='true'
			echo "this is -o option"
			;;
		?)
			echo 'Invalid option'
			exit 1
			;;
	esac
done

#通过shift $(($OPTIND - 1))的处理，$*中就只保留了除去选项内容的参数，
#可以在后面的shell程序中进行处理
shift $(($OPTIND - 1))

echo $1

USER_NAME=$1
COMMIT=$1

# 创建用户
useradd -c ${COMMIT} -m ${USER_NAME}

#创建随机8位密码
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$(($LEN - $SPEC)))
SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w2 | shuf | head -c${SPEC} )
PASSWORD="${PASSWORD}${SPEC_CHAR}"

if [[ $ORDER = 'true' ]]
then
	PASSWORD=$(echo ${PASSWORD} | fold -w1|shuf|tr -d '\n')
fi

echo "password: $PASSWORD"

echo ${USER_NAME}:${PASSWORD}|chpasswd

# 首次登录修改密码
passwd -e ${USER_NAME}


exit 0




