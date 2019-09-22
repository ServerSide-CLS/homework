
log() {
  local MSG="${@}"

  echo "${MSG}"
}

username=${!#}

LEN=48
STR=0

while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)  
      LEN="${OPTARG}"
      ;;
    s)
      USE_SPEC_CHAR='true'   
      STR="${OPTARG}"
      ;;
    o) 
      ORI='true'
      ;;
  esac
done

LEN1=`expr ${LEN} - ${STR}`




log 'Generation a password'

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN1})

if [ "${USE_SPEC_CHAR}" = 'true' ]
then
  log 'select a random special char.'
for i in `seq ${STR}`
do
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
done
fi

if [ "${ORI}" = 'true' ]
then
PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf | tr -d "\n" )
fi

useradd -m ${username}
echo ${username}:${PASSWORD}|chpasswd

log 'Done.'
log 'Here is the password:'



echo "${PASSWORD}"

exit 0
