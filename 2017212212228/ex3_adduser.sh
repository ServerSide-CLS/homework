#!/bin/bash
LEN=48
SLEN=0
RAN='false'
while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)   
      LEN="${OPTARG}"
      ;;
    s) 
      SLEN="${OPTARG}"
      LEN=`expr $LEN - $SLEN`
      if [ $LEN -lt 0 ]
      then
	echo "l must bigger than s!"
	exit 1
      fi
      ;;
    o)  
      RAN='true'
      ;;
  esac
done
echo $LEN
echo $SLEN
echo $RAN
# 输入用户名
read -p 'Enter username:' USER_NAME

# 输入用户描述
read -p 'Enter person info:' COMMENT

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 创建密码
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})
while [ "${SLEN}" -gt 0 ]
do
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
  SLEN=`expr $SLEN - 1`
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
done
PWD=${PASSWORD}
if [ "${RAN}" = 'true' ]
then
PWD=""
PASSWORD=$(echo $PASSWORD | fold -w1 | shuf )
for line in ${PASSWORD}
do
PWD=$PWD$line
done
fi

echo "Your random password is $PWD" 
echo ${USER_NAME}:${PWD}|chpasswd

# 首次登录修改密码
passwd -e ${USER_NAME}
