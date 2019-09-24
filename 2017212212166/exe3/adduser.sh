#!/bin/bash
usage() {
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo '  -l Represents the total length' 
  echo '  -s Represents the number of special characters'
  echo '  -o Representation of coding order disorder'
  exit 1
}

LEN=8
specialnum=0
flag=0

while getopts l:s:o OPTION
do
  case "${OPTION}" in
    l)  
      LEN="${OPTARG}"
      ;;
    s)   
      specialnum="${OPTARG}"
      ;;
    o) 
      flag=1
      ;;
    ?)
      usage 
      ;;
  esac
done

USERNAME=${!#}

normalnum=$[${LEN} - ${specialnum}]

if [ $flag -ne 1 ]
then
	if [ $specialnum -gt 0 ]
	then	
		PASSWORD=$(date +%s%N | sha256sum | head -c${normalnum} )
		let i=1
		while [ $i -le $specialnum ]
		do
		PASSWORD2=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c${specialnum} )
		PASSWORD=${PASSWORD}${PASSWORD2}
		((i += 1))
		done
		
	else
		PASSWORD=$(date +%s%N | sha256sum | head -c${LEN} )
		
	fi
else
	PASSWORD=$(date +%s%N | sha256sum | head -c${normalnum} )
	let i=1
	while [ $i -le $specialnum ]
	do
	PASSWORD2=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c${specialnum} )
	PASSWORD=${PASSWORD}${PASSWORD2}
	((i += 1))
	done
	PASSWORD=$(echo ${PASSWORD} | fold -w1 | shuf | tr -d '\n')
	
fi

useradd -c "${USERNAME}" -m "${USERNAME}"

echo ${USERNMAE}:${PASSWORD}|chpasswd

passwd -e ${UERNAME}

echo ${PASSWORD}

	
