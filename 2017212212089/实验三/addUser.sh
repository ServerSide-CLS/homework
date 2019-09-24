 #!/bin/bash
#默认设置
choose=true
lenth=10
shu=2
USERNAME='anonymous'

#获取参数
while getopts "l:s:o" arg
do
    case $arg in
        l)
	lenth=$OPTARG	
	;;
	s)
	shu=$OPTARG
	;;
	o) 
	choose=false
	;;
	?)
	echo "unkonw argument"
	exit 1
	;;
    esac
done

shift $((OPTIND-1))

if [[ -n "$@" ]];then
	USERNAME="$@"
fi
echo "Username:$USERNAME"

len=$(($lenth-$shu))

#生成密码
PASSWORD=$(date +%s%N | md5sum | /usr/bin/head -c $len)
function rand(){
    min=$1
    max=$(($2-$min+1))
    num=$(date +%s%N)
    echo $(($num%$max+$min))
}
if [ $choose == false ];then
    while [ $shu -gt 0 ];do
        shu=$(($shu-1))
        k=$(($lenth-$shu))
        SPECIAL_CHAR1=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | /usr/bin/head -c1 )
        rnd=$(rand 0 $k)
        PASSWORD=${PASSWORD:0:$rnd}${SPECIAL_CHAR1}${PASSWORD:$rnd}
    done
else
    while [ $shu -gt 0 ];do
        shu=$(($shu-1))
        SPECIAL_CHAR1=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | /usr/bin/head -c1 )
        PASSWORD=${PASSWORD}${SPECIAL_CHAR1}
    done
fi
echo "Password: ${PASSWORD}"

# 创建用户
useradd -m ${USERNAME}

# 创建密码
echo ${USERNAME}:${PASSWORD}|chpasswd

# 首次登录修改密码
passwd -e ${USERNAME}
