#!/bin/bash

# 错误提示
usage() {
  echo "Usage: ${0} [-l LENGTH] [-s LENGTH] [-o] [username]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s Append a special char to the password'
  echo '  -o Out of order characters'
  exit 1
}


log() {
  local MSG="${@}"
  if [[ "${VERBOSE}" = 'true' ]]
  then 
    echo "${MSG}"
  fi
}


# 无参提示
USERS_PARAMAS="${#}"
if [[ "${USERS_PARAMAS}" -lt 1 ]]
then 
  usage
  exit 1
fi

# 默认参数
LEN=15


# 获取用户名
USERNAME=${!#}

# 处理参数
while getopts vl:s:o OPTION
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
      SPEC_CHARACTER="${OPTARG}"
      ;;
    o)
      OUT_order='true'
      ;;
    ?)
      usage
      ;;
  esac
done

log 'Generation a password'

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c $((10#${LEN}-${SPEC_CHARACTER})) )

if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
for((i=0;i<$SPEC_CHARACTER;++i))
do
  log 'select a random special char.'
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
done
fi

# 字符串乱序
if [[ "${OUT_order}" = 'true' ]]
then
  PASSWORD=$(echo $PASSWORD|fold -w1|shuf|tr -d '\n')
fi


useradd -c "${COMMENT}" -m ${USERNAME}

echo ${USERNAME}:${PASSWORD}|chpasswd

echo "密码：${PASSWORD}"

exit 0