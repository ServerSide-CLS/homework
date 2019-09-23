#!/bin/bash
ORDER='false'
LEN=0
special_char=0
while getopts l:s:o ORTIONS
do
        case "${ORTIONS}" in
                l)
                        LEN="${OPTARG}"
                        ;;
                s)
                        special_char="${OPTARG}"
                        ;;
                o)
                        ORDER='true'
                        ;;
        esac
done
#echo ${LEN}
#echo ${special_char}
#echo ${ORDER}
read -p ""  USER_NAME
x=$(( LEN - special_char ))
echo ${x}
PASSWD1=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c ${x} )
#echo ${PASSWORD1}
#echo "---------"
i=1
str=""
while [ $i -lt ${special_char} ]
do
 var=$(echo "!@#$%^&*()_+" | fold -w1 | shuf | head -c1 )
 str=${str}+${var}
#echo ${str}
 let i=i+1
done

str1=${PASSWD1}${str}
if [[ "$ORDER" == "$true" ]];then
        var4=$(echo ${str1} | fold -w1 |shuf|tr -d '\n')
        echo "Your password is ${var4}"
	sudo useradd -m "${USER_NAME}" 
        echo ${USER_NAME}:${var4} |chpasswd
else
	sudo useradd -m "${USER_NAME}"
        echo "Your password is ${str1}" 
        echo ${USER_NAME}:${str1} |chpasswd
fi
sudo passwd -e ${USER_NAME}
