
usage(){
  echo "Usage:${0} [-vs] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo ' -l LENGTH specify the password length'
  echo ' -s Append a special char to the password'
  echo ' -v Increate verbosity'
  exit 1
}
LEN=48
SPECIALCHAR_LEN=48
SPECIAL_CHAR=''
while getopts l:s:o OPTION
do
 case "${OPTION}" in
    l)
       LEN="${OPTARG}"
       ;;
    s)
       SPECIALCHAR_LEN="${OPTARG}"
       SPECIALCHAR='true'
       ;;
    o)
       ORDER='true'
       ;;
    ?)
      usage
      ;;
    esac
done

if [[ "${SPECIALCHAR}" = 'true' ]]
then
    for ((integer = 1; integer <= ${SPECIALCHAR_LEN}; integer++))
    do
       SPEC=$(echo '!@#$%^&*()_+=' | fold -w1 |shuf | head -c1 )
       SPECIAL_CHAR="${SPECIAL_CHAR}${SPEC}"
    done
   PASS=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$((${LEN}-${SPECIALCHAR_LEN})))
   PASS="${PASS}${SPECIAL_CHAR}"
else
   PASS=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})
fi


if [[ "${ORDER}" = 'true' ]]
then
    PASSWORD=$(echo "${PASS}" | fold -w1 | shuf | tr -d '\n' )
else
    PASSWORD=${PASS}
fi

USERNAME=${!#}

echo "PASSWORD:" ${PASSWORD}
useradd -c "${COMMENT}" -m ${USERNAME}

echo ${USERNAME}:${PASSWORD}|chpasswd

