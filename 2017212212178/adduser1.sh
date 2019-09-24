#!/bin/bash

#提示信息
usage() {
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s Append a special char to the password'
  echo '  -o Increate disorder'
  exit 1
}

#默认48位中英文
LEN=48
#1位特殊字符
num=0
#获取用户名
str=${@: -1}


#定义参数
while getopts ol:s: OPTION
do
  case "${OPTION}" in
    o)  
      VERBOSE='true'
      ;;
    l)   
      LEN="${OPTARG}"
      ;;
    s) 
      USE_SPEC_CHAR='true'
      num="${OPTARG}"
      ;;
    ?)
      usage
      ;;
  esac
done

#默认48为数字和英文密码
if [[ "${USE_SPEC_CHAR}" != 'true' ]]
then
 PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})
fi

#是否添加特殊字符判断
if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
	PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$((${LEN}-2)))
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | shuf -n${num} | xargs | sed s/[[:space:]]//g )
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
fi

#是否打乱顺序判断
if [[ "${VERBOSE}" = 'true' ]]
then
   PASSWORD=$(echo "${PASSWORD}" | fold -w1 | shuf | shuf -n$(($LEN+$num-2)) | xargs | sed s/[[:space:]]//g )
fi

#判断用户名长度
if [[ ${#str} < 5 ]]
then
 echo '请输入五位以上用户名'
 exit 1
fi

#创建用户名
useradd -c "${COMMENT}" -m ${str}
#创建密码
echo ${str}:${PASSWORD}|chpasswd

echo "username:${str}"
echo "password:${PASSWORD}"

exit 0
