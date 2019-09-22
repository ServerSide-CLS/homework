usage() {
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s Append a special char to the password'
  echo '  -v Increate verbosity'
  exit 1
}

log() {
  local MSG="${@}"
  if [[ "${VERBOSE}" = 'true' ]]
  then 
    echo "${MSG}"
  fi
}

LEN=8
CONFUSION='false'
USE_SPEC_CHAR_LEN=0
USERNAME=${!#}

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
	  USE_SPEC_CHAR_LEN="${OPTARG}"
      ;;
	o)
	  CONFUSION='true'
	  ;;
    ?)
      usage
      ;;
  esac
done

log 'Generation a password'

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c $((${LEN}-${USE_SPEC_CHAR_LEN})) )

if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
for((i=0;i<$USE_SPEC_CHAR_LEN;i++))
do
  log 'select a random special char.'
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
done
fi

if [[ "${CONFUSION}" = 'true' ]]
then
   PASSWORD=$($PASSWORD|fold -w1 |shuf|tr -d '\n')
fi

useradd -c "${COMMENT}" -m ${USERNAME}

echo ${USERNAME}:${PASSWORD}|chpasswd

log 'Done.'
log 'Here is the password:'

echo "密码是:${PASSWORD}"

exit 0