#!/bin/bash
opt="${#}"
o=1;
l=1;
s=0;
while getopts "l:s:o" opt  
do  
        case $opt in  
                l)
                l=$OPTARG;;
                s)
                s=$OPTARG;;
                o)
                o=0;;
                ? ) echo "error"  
                    exit 1;;  
        esac  
done  


# ${s}=1;
if [[ "${s}" = '0' ]]
then
    PASSWORD=$(date +%s%N | sha256sum | head -c${l})
    echo ${PASSWORD};
else
    l1=$[${l}-2];
    if [[ "${o}" = '0' ]]
    then
        PASSWORD=$(date +%s%N | sha256sum | head -c${l1} )
        SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w2 | shuf | head -c2)
        echo "${PASSWORD}${SPECIAL_CHAR}"
   else
        PASSWORD=$(date +%s%N | sha256sum | head -c${l1} )
        SPECIAL_CHAR=$(echo '!@#$%^&*()_+=' | fold -w2 | shuf | head -c2)
        # echo "${PASSWORD}${SPECIAL_CHAR}"
        PS1="${PASSWORD}${SPECIAL_CHAR}"
        # PS1=$(echo "${PASSWORD}${SPECIAL_CHAR}" | shuf)
        echo ${PS1} | fold -w1 | shuf | xargs | sed 's/ //g'
    fi
fi

