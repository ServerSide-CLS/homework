#!/bin/bash

usage() {
echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
echo 'Generate a random password'
echo ' -l LENGTH specify the password length'
echo ' -s Append a special char to the password'
echo ' -o Disorder'
exit 1
}

USER_NAME=${!#}
LEN=48
ORDER=0
USER_SPEC_CHAR=0

while getopts l:s:o OPTION
do
case "${OPTION}" in
o)
ORDER=1
;;
l)
LEN="${OPTARG}"
;;
s)
USER_SPEC_CHAR="${OPTARG}"
;;
?)
usage
;;
esac
done

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c `expr ${LEN} - ${USER_SPEC_CHAR}`)

if [[ ${USER_SPEC_CHAR}>0 ]]
then
	SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w${USER_SPEC_CHAR} | shuf | head -c${USER_SPEC_CHAR})
fi

PASSWORD="${PASSWORD}${SPEC_CHAR}"

if [[ ${ORDER} == 1 ]]
then
	PASSWORD=$(echo "${PASSWORD}" | fold -w1 | shuf | tr -d [:space:])
fi

echo "${PASSWORD}"

exit 0
