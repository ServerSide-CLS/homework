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

    log() {
        local MSG="${@}"
        if [[ "${VERBOSE}" = 'true' ]]
        then 
            echo "${MSG}"
        fi
    }

    LEN=48

    while getopts vl:s OPTION
    do
        case "${OPTION}" in
          v)
            VERBOSE='true'
            log 'verbose mode on'
            ;;
          l)   
            LEN="${OPTARG}"
            ;;
          s) 
            USE_SPEC_CHAR='true'
            ;;
          ?)
            usage
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
	  SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
	  PASSWORD="${PASSWORD}${SPECIAL_CHAR}"
	fi
	
	#输入用户名
	read -p 'Enter uername:' USER_NAME

  #输入用户描述
  read -p 'Enter person info:' COMMENT
	
	#创建密码
	echo ${USERNAME}:${PASSWORD}|chpasswd
	
	#输出用户名密码
	log 'Done.'
	log 'Here is the password:'
	
	echo "用户名：${USERNAME} | 密码：${PASSWORD}"
	
	exit 0