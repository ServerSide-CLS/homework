#!/bin/bash
function createPassword()
{
	local arr=( a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 1 2 3 4 5 6 7 8 9 0 )
	local specialarr=( $ % ^ * _ + = )
	num=$(($RANDOM+1000000000))
	rnd1=$(($num%8+0))
	num=$(($RANDOM+1000000000))
	rnd2=$(($num%8+0))
	for ((i=0;i<8;i++))
	do
		if [ $i == $rnd1 ]
		then
		echo -n ${specialarr[$RANDOM % ${#specialarr[@]}]}
		fi

		if [ $i == $rnd2 ]
		then
		echo -n ${specialarr[$RANDOM % ${#specialarr[@]}]}
		fi

		if [[ $i != $rnd1 && $i != $rnd2 ]]
		then
		echo -n ${arr[$RANDOM % ${#arr[@]}]}
		fi
	done
}

read -p 'Enter username:' USERNAME
read -p 'Enter person info:' COMMENT

useradd -c "${COMMENT}" -m "${USERNAME}"

PASSWORD=$(createPassword)

echo "your password : $PASSWORD"

echo ${USERNAME}:${PASSWORD}|chpasswd
passwd -e ${USERNAME}
