#!/bin/bash

# 提示输出
usage() {
  echo "Usage: ${0} [-l LENGTH] [-s LENGTH] [-o] [username]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s Append a special char to the password'
  echo '  -o shuf the password'
  exit 1
}


log() {
  local MSG="${@}"
  if [[ "${VERBOSE}" = 'true' ]]
  then 
    echo "${MSG}"
  fi
}


# 无参数输出提示
NUMBER_OF_PARAMS="${#}"
if [[ "${NUMBER_OF_PARAMS}" -lt 1 ]]
then 
  usage
  exit 1
fi

# 默认参数
LEN=8
SPEC_CHAR_LEN=0

# 获取用户名
USERNAME=${!#}


# 处理可选参数
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
      SPEC_CHAR_LEN="${OPTARG}"
      ;;
    o)
      shullf='true'
      ;;
    ?)
      usage
      ;;
  esac
done

log 'Generation a password'

# 随机数字字母
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c $((10#${LEN}-${SPEC_CHAR_LEN})) )

# 随机特殊字符
if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
for((i=0;i<$SPEC_CHAR_LEN;++i))
do
  log 'select a random special char.'
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
done
fi

# 字符串乱序
if [[ "${shullf}" = 'true' ]]
then
  PASSWORD=$(echo $PASSWORD|fold -w1|shuf|tr -d '\n')
fi

# 新增用户
useradd -c "${COMMENT}" -m ${USERNAME}

# 创建密码
echo ${USERNAME}:${PASSWORD}|chpasswd

# 输出用户名密码
log 'Done.'
log 'Here is the password:'

echo "新用户已创建!"
echo "用户名：${USERNAME} | 密码：${PASSWORD}"

exit 0

