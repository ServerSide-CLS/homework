#帮助
usage() {
  echo "Usage: ${0} [-l LENGTH] [-s LENGTH] [-o] [username]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length'
  echo '  -s Append a special char to the password'
  echo '  -o shuf the password'
  exit 1
}

#长度和特殊字符数初始值
LEN=8
SPEC_CHAR_LEN=0

#获取命令行参数
while getopts vl:s:o OPTION
do
  case "${OPTION}" in
    l)   
      LEN="${OPTARG}"  #密码总长度
      ;;
    s) 
      USE_SPEC_CHAR='true' 
      SPEC_CHAR_LEN="${OPTARG}"  #特殊字符总长度
      ;;
    o)
      IS_DISORDER='true'  #数字与特殊字符乱序
      ;;
    ?)
      usage  
      ;;
  esac
done

# 获取用户名
USER_NAME=${!#}

# 生成随机密码（不含特殊字符）
PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c $((${LEN}-${SPEC_CHAR_LEN})))

# 生成含随机特殊字符的密码
if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
  for((i=0;i<$SPEC_CHAR_LEN;++i))
  do
    SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
    PASSWORD="${PASSWORD}${SPEC_CHAR}"
  done
fi

# 密码乱序
if [[ "${IS_DISORDER}" = 'true' ]]
then
  PASSWORD=$(echo $PASSWORD|fold -w1|shuf|tr -d '\n')
fi

# 添加用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 将user密码修改为PASSWORD
echo ${USER_NAME}:${PASSWORD}|chpasswd

# 输出用户名密码
echo "新用户创建成功"
echo "用户名：${USER_NAME}"
echo "密码：${PASSWORD}"

exit 0
