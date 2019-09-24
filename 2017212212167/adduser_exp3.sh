#!/bin/bash

cnt=0
sp_num=0
flag=0
PARAMS=(${@})
NUM=${#}
user_name=${PARAMS[$NUM-1]}

while getopts l:s:o OPTION
do 
    case "${OPTION}" in
        l)
            cnt="${OPTARG}"
            flag=1
            ;;
        s)
            sp_num="${OPTARG}"
            flag=2
            ;;
        o)
            flag=3
            ;;
        ?)
            echo "!!Invalid Option!!>m<" >&2
            exit 1
            ;;
    esac
done

i=0

if [[ $flag -eq 1 ]]
then
    while [ $i -lt $cnt ]
    do
        tmp="$(date +%s%N | sha256sum | head -c1)"
        password=${password}${tmp}
        let i++  
    done
else
    while [ $i -lt $(( $cnt-$sp_num )) ]
    do
        let i++
        tmp="$(date +%s%N | sha256sum | head -c1)"
        password=${password}${tmp}
    done
    i=0
    while [ $i -lt $sp_num ]
    do
        let i++
        special_char=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
        password2=${password2}${special_char}
    done
fi


if [[ $flag -eq 2 ]]
then 
    password=${password}${password2}
elif [[ $flag -eq 3 ]]
then
    password=$(echo "${password}${password2}" | fold -w1 | shuf | tr -d '\n')
fi

sudo useradd -m "${user_name}"

echo "Success!0v0 Your password is: $password"

echo ${password}|passwd --stdin ${user_name} &> /dev/null

#sudo echo ${user_name}:${password}|chpasswd
#passwd -e ${user_name}