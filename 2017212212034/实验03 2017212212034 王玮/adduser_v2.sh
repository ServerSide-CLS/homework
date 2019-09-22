#!/bin/bash
#Date 2019/09/19
#Author WangWei

# The default length of password is 6
LEN=6

# The default password is 123qwe
PASSWORD="123qwe"

# The default number of special chars is 0
NUMBER=0

usage(){
  echo "Usage:${0} [-os] [-l]" >&2
  echo "Create an user and generate random password"
  echo " -o generate password in random order"
  echo " -l The Length of the password"
  echo " -s The Number of special chars"
  exit 1
}
 
generatePwd(){
  echo "Generating password..."
  PASSWORD=$(date +%s%N | sha256sum | head -c${LEN})
 
  # Append special chars to password
  if [[ "${NUMBER}" > 0 ]]
  then
    echo "Generating ${NUMBER} special char(s)......"
    SPECIALCHARS=$(echo '!@#$%^&*()_+' | fold -w${NUMBER} | shuf | tr -d '\n' | head -c${NUMBER} )
    NUMBER=$[LEN-NUMBER]  
    PASSWORD=$(echo ${PASSWORD} | head -c${NUMBER})${SPECIALCHARS}
  fi
 
  # Generate password in random order
  if [[ "$RANDOMLY" = 'true' ]]
  then
    PASSWORD=$(echo $PASSWORD | fold -w1 | shuf | tr -d '\n' | head -c${LEN})
  fi

  echo "Generating password has been completed!"
}

index=0

while getopts hl:os: OPTION
do
  case "${OPTION}" in
    h)
      usage
			exit 1
      ;;
    l)
      LEN=${OPTARG}
			index=$[$index + 2]
      ;; 
    s)
      NUMBER=${OPTARG}
			index=$[$index + 2]
      ;;
    o)
      RANDOMLY="true"
			index=$[$index + 1]
		  ;;
		?)
			usage
			exit 1
  esac
done

if [[ $1 =~ "-" ]]
then
	# I want to try to use 'shift' instead of using '${!#}',the same purpose is to get the last parm
	shift $index
	USER_NAME=$@
	if [[ $USER_NAME = null || $USER_NAME = '' ]]
	then
		echo "Please input your username at the end of your input"
	else
		generatePwd
		useradd -c "${USER_NAME}" -m ${USER_NAME}
		echo ${USER_NAME}:${PASSWORD}|chpasswd
		passwd -e ${USER_NAME}
		echo "The user :'${USER_NAME}' has been created"                                                                                                                             
    echo "${USER_NAME} 's password is :  ${PASSWORD}"
		exit 1
	fi
else
	echo "Please input your username at the end of your input"
	exit 1
fi
