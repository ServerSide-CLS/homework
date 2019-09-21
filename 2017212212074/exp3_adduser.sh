#!/bin/bash

usage() {
    echo "Usage: ${0} [-l LENGTH] [-s Special characters length] [-o disorder] username" >&2
    echo 'Input a username and generate a random password to create a new account'
    echo '  -l set password length' 
    echo '  -s set special characters length'
    echo '  -o disorder'
    echo '  input your username'
    exit 1        
}

USER_NAME=${!#}
len=8
eslen=0
disorder="false"
while getopts l:s:o OPTION
do
 case "$OPTION" in
     l)
     #length
         len=${OPTARG}
     ;;
     s)
     #teshu length
         eslen=${OPTARG}
     ;;
     o)
     #luanxu
         disorder="true"
     ;;
     ?)
         usage
         exit 1
     ;;
    esac 
done

num=`expr $len - $eslen`
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${num})
SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w${eslen} | shuf | head -c${eslen})
PASSWORD="${PASSWORD}${SPEC_CHAR}"

if [ $disorder == "true" ]
then  
#shuf
PASSWORD=$(echo $PASSWORD | fold -w1 | shuf | tr -d '\n')
fi

# 创建用户
useradd -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd

