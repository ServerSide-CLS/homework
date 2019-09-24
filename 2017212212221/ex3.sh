#!/bin/bash
usage() {
    echo "Usage: ${0} [-o][-s NUMBER] [-l LENGTH]" >&2
    echo 'Generate a random password'
    echo '  -l LENGTH specify the password length'
    echo '  -s Append a special char to the password'
    echo '  -o out of order passwd'
    exit 1
}
numspecial=3
mass=0
len=2
while getopts l:s:o option; do
    case "$option" in
    l)
        len=$OPTARG
        ;;
    s)
        numspecial=$OPTARG
        ;;
    o)
        mass=1
        ;;
    ?)
        usage
        ;;
    esac
done
username=${!#}
echo "You Username is :"${username}
read -p "Enter person info:" comment
llen=$(($len-$numspecial))
password=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c$llen)
for ((i=1;i<=$numspecial;i++));do
    specialword=$(echo "!@#$%^&*()_+=" | fold -w1 | shuf | head -c1)
    password=${password}${specialword}
done
if ((mass==1));then
    password=$(echo "${password} " | fold -w1 | shuf | tr -d ' \n')
fi
echo "Your password:"
echo ${password}
useradd -c "${comment}" -m ${username}
echo ${username}:${password} | chpasswd
