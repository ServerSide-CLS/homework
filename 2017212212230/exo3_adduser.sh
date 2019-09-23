#!/bin/bash

usage() {
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s Append a special char to the password'
  echo '  -v Increate verbosity'
  echo '  the last is a username'
  exit 1
}

if [ $(id -u) -eq 0 ]; then
	if [ "${#}" -lt 1 ]; then       #如果参数少于1，输出帮助说明
        usage
		exit 2
    fi
    egrep "^${!#}" /etc/passwd >/dev/null       #判断用户是否已经存在
    if [ $? -eq 0 ]; then
        echo "${!#} exists!"
        exit 3
    fi
    username=${!#}
    totalLen=8
    spCharacterLen=0
    isOrder=false
    while getopts l:s:o OPTION
    do
        case $OPTION in
            l)  totalLen=$OPTARG    ;;
            s)  spCharacterLen=$OPTARG  ;;
            o)  isOrder=true   ;;
            ?)  usage   ;;
        esac
    done
    # Script to add a user to Linux system
    read -p "Enter ${!#}'s info : " comment
    #计算普通字符长度
    let characterLen=${totalLen}-${spCharacterLen}
    spCharacter=''
    #生成特殊字符
    if [[ spCharacterLen -gt 0 ]]; then
        S="!@#$%^&*()_+="
        for ((i=1; i<=${spCharacterLen}; i ++))
        do
            spCharacter=$(echo "${spCharacter}$(echo ${S}|fold -w1|shuf|head -c1 )")
        done
        echo "spCharater: ${spCharacter}"
    fi
    #生成普通字符
    character=$( date +%s%N | sha256sum | head -c${characterLen} )
    #组合成最终密码
    if [ isOrder==true ]; then
        password=$(echo "${character}${spCharacter}"|fold -w1|shuf|tr -d '\n')
    else
        password=${character}${spCharacter}
    fi
    useradd -c "${comment}" -m ${username}
    echo ${username}:${password}|chpasswd
    echo "The password is: ${password}"
    [ $? -eq 0 ] && echo "User has been added to system!" || echo "Failed to add a user!"
else
	echo "Only root may add a user to the system"
	exit 4
fi
