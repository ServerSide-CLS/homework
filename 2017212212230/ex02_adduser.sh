#!/bin/bash

# Script to add a user to Linux system
# 判断是否有root权限
if [ $(id -u) -eq 0 ]; then
    # 输入用户名
	read -p "Enter username : " username
    # 输入用户描述
	read -p "Enter person info : " comment
    # 判断用户名是否已经存在
	egrep "^$username" /etc/passwd >/dev/null
	if [ $? -eq 0 ]; then
		echo "$username exists!"
		exit 1
	else
        # 生成8位随机密码
		S="!@#$%^&*()_+="
		password_1=''
		for i in {1..2}
		do
			password_1=$(echo "${password_1}$(echo ${S}|fold -w1|shuf|head -c1 )")
		done
		password_2=$( date +%s%N | sha256sum | head -c6 )
		password=$(echo "${password_2}${password_1}"|fold -w1|shuf|tr -d '\n')
        # 创建用户
		useradd -c "${comment}" -m $username
        # 创建密码
		echo ${username}:${password}|chpasswd
		echo "The password is: ${password}"
		 # 首次登录修改密码
		passwd -e ${username}
        # 判断是否成功创建用户
		[ $? -eq 0 ] && echo "User has been added to system!" || echo "Failed to add a user!"
	fi
else
	echo "Only root may add a user to the system"
	exit 2
fi
