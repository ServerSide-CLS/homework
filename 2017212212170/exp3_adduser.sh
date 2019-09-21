#!/bin/bash
# Hu si yuan

# total length of pwd
LEN_TOTAL=8
# length of special char
LEN_SPEC=0
# if mix special characters with pwd
MIX_MODE='false'

# help
usage() {
  echo "Usage: ${0} [-l LEN_TOTAL] [-s LEN_SPEC] [-o] [-h]" >&2
  echo 'Generate a random password'
  echo '  -l LEN_TOTAL the total length of pwd' 
  echo '  -s LEN_SPEC length of special char'
  echo '  -o mix special characters with pwd'
  echo '  -h help'
  exit 1
}

# 随机化 
# arg1 待随机化字符串 // arg2 取头部k个字符 可选
randomize () {

    # 参数错误 Incorrect Usage
    if [ ! $1 ]; then
        exit 2
    fi

    if [ ! $2 ]; then
        echo "$1" | fold -w1 | shuf | tr -d '\n'
    fi

    echo "$1" | fold -w1 | shuf | tr -d '\n' | head -c"$2" 2> /etc/null
}

while getopts l:s:oh OPTION
do
  case "${OPTION}" in
    l) LEN_TOTAL="${OPTARG}" ;;
    s) LEN_SPEC="${OPTARG}" ;;
    o) MIX_MODE='true' ;;
    h) usage ;;
    *) echo '[ERROR] input a valid option, see ./adduser.sh -h' >&2 ; exit 1 ;;
  esac
done

# 生成6个字母/数字和2个特殊字符
RAND_CHAR=$(randomize "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" `expr $LEN_TOTAL - $LEN_SPEC`)
SPECIAL_CHAR=$(randomize "!@#$%^&*()_+=" $LEN_SPEC)

# 用户名取最后一个参数
USER_NAME=${@: -1}

# 最后一个参数以 '-' 开头, 可能用户忘记添加用户名参数
# 也可能是用户故意要以-开头, 自然会被前面的 getopts 拦截, 不过这里也要提示下
if [[ "$USER_NAME" =~ ^- ]]; then
  echo "[ERROR] you forgot input UserName, or, UserName can't start with '-'"
  exit 1
fi

# 根据 -o 参数确定是否混合字母/数字 和 特殊字符
if [[ MIX_MODE=='true' ]]; then
  PASSWORD=$(randomize "$RAND_CHAR$SPECIAL_CHAR")
else
  PASSWORD="$RAND_CHAR$SPECIAL_CHAR"
fi


# 输入用户描述
read -p 'Enter person info:' COMMENT

# 创建用户
useradd -c "${COMMENT}" -m ${USER_NAME}

# 创建密码
echo ${USER_NAME}:${PASSWORD}|chpasswd

echo "[SUCCESS]: $USER_NAME, your default password is $PASSWORD"

# Hu si yuan