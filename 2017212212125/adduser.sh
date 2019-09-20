x=$RANDOM%8
y=$RANDOM%8
PASSWORD=""

for((j=0;;j++));
do
if [[($x -ne $y)]]
then break
else
y=$RANDOM%8
fi
done


for((i=0;i<8;i++));
do
if [[(i -ne $x)&&(i -ne $y)]]
then
TEMP=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c1 )
else
TEMP=$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1 )
fi
PASSWORD=${PASSWORD}${TEMP}
done

echo "$PASSWORD"
read -p 'Enter username:' USER_NAME

read -p 'Enter person info:' COMMENT

read -p 'Enter password:' PASSWORD

useradd -c "${COMMENT}" -m ${USER_NAME}

echo ${USER_NAME}:${PASSWORD}|chpasswd



