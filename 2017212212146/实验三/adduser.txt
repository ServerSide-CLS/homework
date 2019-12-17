#!/bin/bash

usage() {
  echo "Usage: ${0}  [-l LENGTH] [-s SPEC_CHAR_NUM] [-o SHUF_PASSWORD]" >&2
  echo 'create a new user'
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

LENGTH=6
SPEC_CHAR_NUM=2
SHUF_PASSWORD=false
USER_NAME=${!#}

while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)   
      LENGTH="${OPTARG}"
      ;;
    s) 
      SPEC_CHAR_NUM="${OPTARG}"
      ;;
    o)
      SHUF_PASSWORD=true
      ;;
    ?)
      usage
      ;;
  esac
done

USUAL_PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$((${LENGTH}-${SPEC_CHAR_NUM})))

for((i=0;i<${SPEC_CHAR_NUM};i++))
do
        SPECIAL=$(echo '!@#$%^&*()_+' | fold -w1 | shuf | head -c1)

        SPECIA_PASSWORD=${SPECIA_PASSWORD}${SPECIAL}

	echo "${SPECIA_PASSWORD}"
done

PASSWORD=${USUAL_PASSWORD}${SPECIA_PASSWORD}

if ${SHUF_PASSWORD}
    then PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf| tr -d '\n')
fi

useradd -c "${USER_NAME}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD} | chpasswd

log 'Done.'
log 'Here is the password:'

echo "${PASSWORD}"

exit 0