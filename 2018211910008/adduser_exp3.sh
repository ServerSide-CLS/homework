# # 用来获取输入参数列表
STR="${@}"
NUMBER_OF_PARAMS = "${#}"

if [[NUMBER_OF_PARAMS == 3]]
then
    

usage() {
    echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
    echo 'Generate a random password'
    echo '  -l LENGTH specify the password length'
    echo '  -s Append a special char to the password'
    echo '  -v Increate verbosity'
    exit 1
}

log() {
    local MSG= "${@}"
    if[["${VERBOSE}" = 'true']]
    then
        echo "${MSG}"
    fi
}

LEN = 48
SPEC_CHAR_LEN = 0
while getopts l:os: OPTION
do 
    case "${OPTION}" in
        l)   
        LEN="${OPTARG}"
        ;;
        o)
        IS_RANDOM= 'true'
        s) 
        SPEC_CHAR_LEN="${OPTARG}"
        USE_SPEC_CHAR='true'
        ;;
        ?)
        usage
        ;;
    esac
done    

log 'Generation a password'

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LEN})

if [[ "${USE_SPEC_CHAR}" = 'true' ]]
then
  log 'select a random special char.'
  SPEC_CHAR=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c${SPEC_CHAR_LEN})
  PASSWORD="${PASSWORD}${SPEC_CHAR}"
fi

if [[ "${IS_RANDOM}" = 'true' ]]
then
    PASSWORD=$(echo ${PASSWORD} | fold -w1|shuf|tr -d '\n')
fi

log 'DONE.'
log 'Here is the password:'

echo "${PASSWORD}"
exit 0