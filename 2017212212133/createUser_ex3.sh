#!/bin/bash

function createPassword()
{
	local arr=( a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 1 2 3 4 5 6 7 8 9 0 )
	local specialarr=( ! $ % ^ _ + = )
	
	i=0
	while(( $i < $SPEC_CHAR ))
	do
		num=$(($RANDOM+1000000000))
		SPEC_POS[$i]=$(($num%($LEN-1)+0))
		let "i++"
	done

#echo "special?:${SPEC_POS[@]}"
	
	if [[ IS_ORDER -eq 'true' ]]
	then
	for((l=0;l<$LEN-$SPEC_CHAR;l++))
	do
		echo -n $l
	done
	for((l=0;l<$SPEC_CHAR;l++))
	do
		echo -n ${specialarr[$RANDOM % ${#specialarr[@]}]}
	done
	else
	j=0
	while(( $j < $LEN ))
	do
#echo "j:$j"
		flag=0
		for((k=0;k<$SPEC_CHAR;k++))
		do
#echo "k:${SPEC_POS[@]}"
			if [[ $j == ${SPEC_POS[$k]} ]]
			then
			echo -n ${specialarr[$RANDOM % ${#specialarr[@]}]}
			flag=1
			fi
		done

		if [[ $flag == 0 ]]
			then			
			echo -n ${arr[$RANDOM % ${#arr[@]}]}
		fi
		let "j++"
	done
	fi
}


LEN=8
SPEC_CHAR=1
IS_ORDER='true'

PARAMS=(${@})
NUM=${#}
USERNAME=${PARAMS[$NUM-1]}

while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)  
      LEN=$OPTARG
      ;;
    s)   
      SPEC_CHAR=$OPTARG
      ;;
    o) 
      IS_ORDER='false'
      ;;
    ?)
      echo 'Invalid option' >&2 ; 
      exit 1 
      ;;
  esac
done

useradd -m "${USERNAME}"

PSWD=$(createPassword)

echo "your password : ${PSWD}"

echo ${USERNAME}:${PSWD}|chpasswd
passwd -e ${USERNAME}



















