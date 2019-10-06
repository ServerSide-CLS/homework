#!/bin/bash

LEN=48
wordnum=0
specnum=0
ran=0
while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)   
      LEN="{OPTARG}"
      ;;
    s) 
      specnum="{OPTARG}"
      ;;
    o)   
      ran=1
      ;;
    ?)
      echo 'Invalid option' >&2 ; 
      exit 1 
      ;;
  esac
done

for username in "${@}"
do  
	USER_NAME=${username}
done
     

num1=0
num2=0
i=0
if [[ "${ran}" -eq 1 ]]
then 
	while [ $i -le 8 ]
		do
		i=$(( $i+1 ))
		p="${RANDOM}"
		if  [[ num1 -ge 2 ]]||[[ "${p}"%10 -le 5 ]] && [[ num2 -le 5 ]]
		then
			PASSWORD=${PASSWORD}$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c1 )
			num2=$(( $num2+1 ))
		else

			PASSWORD=${PASSWORD}$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
			num1=$(( $num1+1 ))
		fi
	done
else
	while [ $i -le 6 ]
		do
		i=$(( $i+1 ))
			PASSWORD=${PASSWORD}$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c1 )
			num2=$(( $num2+1 ))
	done
	while [ $i -le 8 ]
		do
		i=$(( $i+1 ))
			PASSWORD=${PASSWORD}$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
			num1=$(( $num1+1 ))		
	done
fi
# 创建密码
echo ${PASSWORD} | passwd ${USER_NAME} --stdin > /dev/null 2>&1

echo "Your password is "${PASSWORD}"."

