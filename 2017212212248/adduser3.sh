#!/bin/bash
usage(){
	echo "Usage: ${0} [-l All_length] [-s SPECIALCHAR_length] [-o DISORDER] USERNAME" >&2
	echo 'Generate an acount with USERNAME and PASSWORD'
	echo ' -l All_length the total length of password'
	echo ' -s SPECIALCHAR_length Append special chars to the password'
	echo ' -o Disordering the password'
	echo ' input your username'
	exit 1
}

All_length=8
SPECIALCHAR_length=0

while getopts l:s:o OPTION
do
	case "${OPTION}" in
		l)
			All_length="${OPTARG}"
			;;
		s)
			USE_SPE_CHAR='true'
			SPECIALCHAR_length="${OPTARG}"
			;;
		o)
			DISORDER='true'
			;;
		?)
			usage
			exit 1
			;;
	esac
done

RANDOM_CHAR=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${All_length})
PASSWORD="${RANDOM_CHAR}"

if [[ "${USE_SPE_CHAR}" = 'true' ]]
then
	LENGTH=`expr ${All_length} - ${SPECIALCHAR_length}`
	RANDOM_CHAR=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LENGTH})
	SPECIAL_CHAR=$(echo '!@#$%^&*()_' |fold -w1 | shuf |tr -d '\n' | head -c${SPECIALCHAR_length})
	PASSWORD="${RANDOM_CHAR}${SPECIAL_CHAR}"
fi

if [[ "${DISORDER}" = 'true' ]]
then
	PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf |tr -d '\n' | head -c${All_length})
fi

USERNAME=${!#}
useradd -m ${USERNAME}
echo "Username:${USERNAME}"
echo "Password:${PASSWORD}"