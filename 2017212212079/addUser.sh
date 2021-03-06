#!/bin/bash

inputCont="${#}"

if [[ "${inputCont}" -lt 1 ]]
then 
	echo "please input the currect command"
	exit 1
fi

if [[ "${inputCont}" -eq 3 ]]
then
	com="${1}"
	if [[ "${com}" != "-l" ]]
	then
		echo "please input valid option"
		exit 1
	fi	
	len="${2}"
	userName="${3}"
	pwd=$(date +%s%N | sha256sum | head -c ${len} )
	useradd -m ${userName}
	echo ${userName}:${pwd}|chpasswd
	echo "your password is ${pwd}"

elif [[ "${inputCont}" -eq  5 ]]
then
	com1="${1}"
	com2="${3}"
	if [[ "${com1}" != "-l" || "${com2}" != "-s" ]]
	then
		echo "please input valid option"
		exit 1
	fi
	len="${2}"
	userName="${5}"
	specialLen="${4}"
	pwdLen=`expr ${len} - ${specialLen}`
	pwd=$(date +%s%N | sha256sum | head -c ${pwdLen} )
	for((i=1;i<=${specialLen};i++))
	do
		specialPwd=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf |head -c1)
		pwd=${pwd}${specialPwd}
	done
	useradd -m ${userName}
	echo ${userName}:${pwd}|chpasswd
	echo "your password is ${pwd}"
elif [[ "${inputCont}" -eq 6 ]]
then
	com1="${1}"
	com2="${3}"
	com3="${5}"
	if [[ "${com1}" != "-l" || "${com2}" != "-s" || "${com3}" != "-o" ]]
	then
		echo "please input the currect command"
		exit 1
	fi
	len="${2}"
	specialLen="${4}"
	userName="${6}"
	pwdLen=`expr ${len} - ${specialLen}`
	pwd=$(date +%s%N | sha256sum | head -c ${pwdLen} )
	for((i=1;i<=${specialLen};i++))
	do
		specialPwd=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf |head -c1)
		pwd=${pwd}${specialPwd}
	done
	pwd=$(echo ${pwd} | fold -w1 | shuf | tr -d '\n')
	useradd -m ${userName}
	echo ${userName}:${pwd}|chpasswd
	echo "your password is ${pwd}"	
else
	echo "input a valid option"
	exit 1
fi	


