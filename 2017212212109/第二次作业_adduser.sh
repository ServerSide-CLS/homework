#!bin/bash

prefix = 'user'

for(i=0;i<10;i++)
do
  USER_NAME=${prefix}${i}
  PASSWORD=$(date +%s%N$ | sha256sum | head -c3)$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)$(date +%s%N$ | sha256sum | head -c3)$(echo '!@#$%^&*()_+=' | fold -w1 | shuf | head -c1)
  useradd -g users -p ${PASSWORD} ${USER_NAME}
done

exho 'done'