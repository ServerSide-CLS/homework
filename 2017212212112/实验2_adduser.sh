#!/bin/bash
	
  #添加帮助
	usage() {
        echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
        echo 'Generate a random password'
        echo '  -l LENGTH specify the password length' 
        echo '  -s Append a special char to the password'
        echo '  -v Increate verbosity'
        exit 1
    }

    while getopts l:s:o OPTION
    do
        case "${OPTION}" in
          l)
            l=$OPTARG
            ;;
          s)   
            s=OPTARG
            ;;
          o) 
            o=0
            ;;
          ?)
            usage
            exit 1
            ;;
        esac
    done

    log 'Generation a password'

    #创建密码
    #日期+RANDOM+sha256sum函数+head
    PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})
	
	if [[ "${USE_SPEC_CHAR}" = 'true' ]]
	then
	  log 'select a random special char.'
	  SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w2 | shuf | head -c2)
	  PASSWORD="${PASSWORD}${SPECIAL_CHAR}"
	fi
	
	#输入用户名
	read -p 'Enter uername:' USER_NAME

    #输入用户描述
    read -p 'Enter person info:' COMMENT
	
	#创建密码
	echo ${USERNAME}:${PASSWORD}|chpasswd
	
	#输出用户名密码
	echo "用户名：${USERNAME} | 密码：${PASSWORD}"
	
	exit 0
