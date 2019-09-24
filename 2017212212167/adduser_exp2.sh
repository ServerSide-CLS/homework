#!/bin/bash

r1=$RANDOM
pos1=$(($r1 % 8))
let pos1++
r2=$RANDOM
pos2=$(($r2 % 8))
let pos2++
if [ $pos2 -eq $pos1 ]
then
    pos2=$(($pos2+1))
    pos2=$(($pos2 % 8))
    let pos2++
fi
if [ $pos2 -le $pos1 ]
then
    pos3=$pos2
    pos2=$pos1
    pos1=$pos3
fi

i=0
while [ $i -le 8 ]
do
    let i++
    if [ $i -eq $pos1 ]
    then
        special_char=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
        password=${password}${special_char}
    elif [ $i -eq $pos2 ]
    then
        special_char=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
        password=${password}${special_char}
    else
        normal_char=$(date +%s%N | sha256sum | head -c1)
        password=${password}${normal_char}
    fi
done
	
read -p 'Enter username:' user_name
read -p 'Enter person info 0W0:' comment

sudo useradd -c "${comment}" -m "${user_name}"

echo "Success!0v0 Your password is: $password"

echo ${password}|passwd --stdin ${user_name} &> /dev/null

#sudo echo ${user_name}:${password}|chpasswd
#passwd -e ${user_name}



