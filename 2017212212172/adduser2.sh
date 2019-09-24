usage() {
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo 'Generate a random password'
  echo '  -l LENGTH specify the password length' 
  echo '  -s the special char len'
  echo '  -o is or not shuf_char'
  exit 1
}

TOTLEN=0
LEN=0
SHUF_CHAR='false'
PARAMS=(${@})
NUM=${#}
USER_NAME=${PARAMS[$NUM-1]}
while getopts l:s:o OPTION
do
    case "${OPTION}" in
        l)
	    TOTLEN="${OPTARG}"
            ;;
        s)
            LEN="${OPTARG}"
            ;;
        o)
            SHUF_CHAR='true'
	    ;;
        ?)
            usage
            ;;
    esac
done
if [[ $TOTLEN -le 0 ]]
then
	usage
fi
i=0
if [[ $(( $TOTLEN-$LEN )) -lt $zero ]]
then
	usage
else
	while [ $i -lt $(( $TOTLEN-$LEN )) ]
    do
        char1="$(date +%s%N | sha256sum | head -c1)"
        PASSWORD=${PASSWORD}${char1}
        let i++  
    done
	while [ $i -lt $TOTLEN ]
    do
        char1="$(echo "!@#$%^&*)_+=" | fold -w1 | shuf | head -c1 )"
        PASSWORD=${PASSWORD}${char1}
        let i++  
    done
	if [[ "${SHUF_CHAR}" = 'true' ]]
	then
		PASSWORD=$(echo "${PASSWORD}" | fold -w1 | shuf | tr -d '\n' )
	fi
	sudo useradd -m ${USER_NAME}
	echo "You Password is ${PASSWORD}"
	sudo echo ${USER_NAME}:${PASSWORD} | chpasswd
fi
