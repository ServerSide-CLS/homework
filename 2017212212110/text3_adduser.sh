
#!/bin/bash

usage() {
  echo "Usage: ${0} [-l LENGTH] [-s special char] [-o ORDER]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s Append special char to the password'
  echo '  -o ORDER mess up the password'
  exit 1
}

LEN=48

while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)   
      LEN1="${OPTARG}"
      ;;
    s)   
      LEN2="${OPTARG}"
      USE_SPEC_CHAR='true'
      ;;
    o)
      PAW_ORDER='true'
      ;;
    ?)
      usage
      ;;
  esac
done

PARAMS=(${@})
NUM=${#}
USER_NAME=${PARAMS[$NUM-1]}

if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
  LEN=`expr ${LEN1} - ${LEN2}`
  PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w${LEN2} | shuf | head -c${LEN2})
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
fi

if [[ "${PWA_ORDER}" = 'true' ]]
then
  LEN=`expr ${LEN1} - ${LEN2}`
  PASSWORD=$(exho ${PASSWORD} | fold -w1 | shuf | tr -d '\n' | head -c${LEN1})
fi

echo "${USER_NAME}:${PASSWORD}"

exit 0
