#!/bin/bash
pwd_len=8
spec_len=0
usage(){
	echo "-l total password length"
	echo "-s number of sepcial characters"
	echo "-o out of order"
	exit 1
}

is_int(){
	if ![["$1"=~^[0-9]+$]]
	then
		echo "ERROR:$2 must be integer" >&2
		exit 1
	fi
}

get_input(){
	while getopts l:s:o OPTION
	do
		case "OPTION" in 
			l)
				pwd_len="${OPTAGS}"
				is_int ${pwd_len} "total password length"
				;;
			s)
				spec_len="${OPTAGS}"
				is_int ${spec_len} "number of sepcial characters"
				;;
			o)
				IS_RANDOM=1
				;;
			?)
				usage
				;;
		esac
	done
}

check_input(){
	if[[${spec_len} -gt ${pwd_len}]]
	then
		echo "ERROR:sepcial characters must less than password" >&2
		exit 1
	else
		common_len=$(($pwd_len-$spec_len))
	fi

	if [[$OPTIND -le $#]]
	then
		user_name=${!OPTIND}
	else
		echo "ERROR:please enter username" >&2
		exit 1
	fi
}

create_pwd(){
	common_num=$1
	spec_num=$2
	common=$(date+%s%N${RANDOM}${RANDOM}|sha256sum|head -c$common_num)
	spec=$(echo "!@#$%^&*()_+"|fold -w1 |shuf|tr -d '\n'|head -c$spec_num)
	password=$(echo ${common}${spec}|fold -w1 |shuf|tr -d '\n')
}



get_input "$@"
check_input "$@"
create_pwd $common_len $spec_len
useradd -c "${user_name}" -m ${user_name}
echo ${user_name}:{password} | chpasswd
echo -e "\nUser:${user_name}\nPwd:${password}"