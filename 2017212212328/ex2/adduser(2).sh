#!/bin/bash
create_pwd(){
	common_num=$1
	spec_num=$2
	common=$(date+%s%N${RANDOM}${RANDOM}|sha256sum|head -c$common_num)
	spec=$(echo "!@#$%^&*()_+"|fold -w1 |shuf|tr -d '\n'|head -c$spec_num)
	password=$(echo ${common}${spec}|fold -w1 |shuf|tr -d '\n')
}
read -p 'Input your username:' user_name
read -p 'Input your info:' user_info
create_pwd 6 2
useradd -c "${user_info}" -m ${user_name}
echo -e "\nUser:${user_name}\nInfo:${user_info}\nPwd:${password}"


