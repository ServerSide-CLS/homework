NUMBER_OF_PARAMS="${#}"
echo "输入了 ${NUMBER_OF_PARAMS} 个参数"
if [[ "${NUMBER_OF_PARAMS}" -lt 1 ]]
then 
  echo "请填写参数"
  exit 1
fi

USER_NAME=''
PASSWORD=''

if [[ "${NUMBER_OF_PARAMS}" = 3 ]]
then
  USER_NAME=$3
  if [[ "$1" = "-l" ]]
  then
    key=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c48 )
    key=${key:0:$2}
    PASSWORD=${PASSWORD}${key}
  fi
  if [[ "$1" = "-s" ]]
    then
      key=$(echo '!@#$%^&*()_+=' | fold -w$2 | shuf | head -c$2 )
      PASSWORD=${PASSWORD}${key}
  fi
fi     

if [[ "${NUMBER_OF_PARAMS}" = 5 ]]
then
  USER_NAME=$5
  #前两位
  if [[ "$1" = "-l" ]]
  then
    key=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c48 )
    key=${key:0:$2}
    PASSWORD=${PASSWORD}${key}
  fi
  if [[ "$1" = "-s" ]]
    then
      key=$(echo '!@#$%^&*()_+=' | fold -w$2 | shuf | head -c$2 )
      PASSWORD=${PASSWORD}${key}
  fi
  #后两位
  if [[ "$3" = "-l" ]]
  then
    key=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c48 )
    key=${key:0:$4}
    PASSWORD=${PASSWORD}${key}
  fi
  if [[ "$3" = "-s" ]]
    then
      key=$(echo '!@#$%^&*()_+=' | fold -w$4 | shuf | head -c$4 )
      PASSWORD=${PASSWORD}${key}
  fi
fi 


if [[ "${NUMBER_OF_PARAMS}" = 6 ]]
then
  USER_NAME=$6
  #前两位
  if [[ "$1" = "-l" ]]
  then
    key=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c48 )
    key=${key:0:$2}
    PASSWORD=${PASSWORD}${key}
  fi
  if [[ "$1" = "-s" ]]
    then
      key=$(echo '!@#$%^&*()_+=' | fold -w$2 | shuf | head -c$2 )
      PASSWORD=${PASSWORD}${key}
  fi
  #后两位
  if [[ "$3" = "-l" ]]
  then
    key=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c48 )
    key=${key:0:$4}
    PASSWORD=${PASSWORD}${key}
  fi
  if [[ "$3" = "-s" ]]
    then
      key=$(echo '!@#$%^&*()_+=' | fold -w$4 | shuf | head -c$4 )
      PASSWORD=${PASSWORD}${key}
  fi
  PASSWORD=$(echo ${PASSWORD} | fold -w1| shuf | tr -d '\n')
fi 


echo "用户：${USER_NAME}"
echo "密码：${PASSWORD}"

useradd -c "${USER_NAME}" -m ${USER_NAME}
echo ${USER_NAME}:${PASSWORD}|chpasswd


