#!/bin/bash


LEN=0
LenSpecial=0
Sort=0

while getopts l:s:o OPTION
do
	case "${OPTION}" in
	l)
		LEN="${OPTARG}"
		;;
	s)
		LenSpecial="${OPTARG}"
		;;
	o)
		Sort=1
		;;
	?)
		echo 'Invalid option' >&2 ; 
		exit 1 
		;;
	esac
done

for USER_NAME2 in "${@}"
do
	USER_NAME=${USER_NAME2}
done

#echo "${LEN}   ${LenSpecial}   ${Sort}    ${USER_NAME}"

if [[ "${Sort}" -eq 1 ]]
then
	cnt=1
	numNormal=0
	numSpecial=0
	while [ $cnt -le $LEN ]
	do
		cnt=$(( $cnt+1 ))
		tmp="${RANDOM}"
		if [[ "${tmp}"%2 -eq 0 ]] && [[ numSpecial -le $(( $LenSpecial-1 )) ]] || [[ numNormal -ge $(( $LEN-$LenSpecial )) ]]
		then
			Special=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
			PASSWORD=${PASSWORD}${Special}
			numSpecial=$(( $numSpecial+1 ))
		else
			Normal=$(date +%s%N | sha256sum | head -c1 )
			PASSWORD=${PASSWORD}${Normal}
			numNormal=$(( $numNormal+1 ))
		fi
	done
else
	cnt=1
	numNormal=0
	numSpecial=0
	while [ $cnt -le $LEN ]
	do
		cnt=$(( $cnt+1 ))
		tmp="${RANDOM}"
		if [[ numNormal -le $(( $LEN-$LenSpecial-1 )) ]]
		then
			Normal=$(date +%s%N | sha256sum | head -c1 )
			PASSWORD=${PASSWORD}${Normal}
			numNormal=$(( $numNormal+1 ))
		else
			Special=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
			PASSWORD=${PASSWORD}${Special}
			numSpecial=$(( $numSpecial+1 ))
		fi
	done
fi

sudo useradd -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd

echo "Your initial password is:${PASSWORD}"



