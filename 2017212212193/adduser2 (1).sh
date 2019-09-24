#!/bin/bash

usage() {
  echo "Usage: ${0} [-lv] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s Append a special char to the password'
  echo '  -o Increate verbosity'
  exit 1
}


LEN=48
LEN1=48
while getopts "l:s:o" OPTION
do
  case "${OPTION}" in
    l)   
      LEN="${OPTARG}"
      ;;
    s) 
      USE_SPEC_CHAR='true'
      LEN1="${OPTARG}"
      ;;
    o)
      VERBOSE='true1'
      ;;
    ?)
      usage
      ;;
  esac
done


PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})

if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
	SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf |tr -d "\n"| head -c${LEN1})
   	PASSWORD="${PASSWORD}${SPEC_CHAR}"
fi

if [[ ${VERBOSE} = 'true1' ]]
then
	PASSWORD=$(echo "${PASSWORD}" | fold -w1 | shuf |tr -d "\n")
fi

user_name=${@}
user_name=${user_name##* }

useradd -m ${user_name}

echo ${user_name}:${PASSWORD}|chpasswd

echo "${user_name}:${PASSWORD}"

# passwd -e ${user_name}

exit 0
