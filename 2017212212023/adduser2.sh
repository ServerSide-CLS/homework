#!/bin/bash
usage() {
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s Append a special char to the password'
  echo '  -o Change order'
  exit 1
}

a=48
b=48

while getopts vl:s:o OPTION
do
  case "${OPTION}" in
    v)
      VERBOSE='true'
      log 'verbose mode on'
      ;;
    l)
      a="${OPTARG}"
      ;;
    s)
      b="${OPTARG}"
      USE_SPEC_CHAR='true'

      ;;
    o)
      MIX='true'
      ;;
    ?)
      usage
      ;;
  esac
done
      

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$a)

n=$[ $a - $b ]
m=$[ $b + 1  ]
if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
  SPEC_PASS=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$n )
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c$m )
  PASSWORD="${SPEC_PASS}${SPEC_CHAR}"
fi

if [[ "${MIX}" = 'true' ]]
then
  PASSWORD=$(echo "$PASSWORD" | shuf)
fi

echo "${PASSWORD}"


USER_NAME=${$#}
# 创建用户
useradd-m ${USER_NAME}

# 创建密码
echo ${USER_NAME}:${PASSWORD}|chpasswd

# 首次登录修改密码
passwd -e ${USER_NAME}


exit 0
