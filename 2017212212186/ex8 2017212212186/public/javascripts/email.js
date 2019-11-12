    const msgDiv = document.getElementsByClassName('m-msg')[0]
    console.log(msgDiv)
    if (msgDiv) setTimeout(() => document.body.removeChild(msgDiv), 1000)

    const verifyBtn = document.getElementsByClassName('verify-btn')[0]
    const verifyTimeSpan = document.getElementById('verify-time')
    if (verifyTimeSpan) {
        verifyBtn.disabled = true
        verifyTimer(parseInt(verifyTimeSpan.innerText))
    }

    verifyBtn.addEventListener('click', () => {
        verifyBtn.disabled = true
        const data = {
            email: document.forms['sign-up']['email'].value
        };
        /[\s\S]@[\s\S]+\.+[\s\S]{2,20}/.test(data.email) ?
            axios.post('http://localhost:3000/protected', data).then((r) => {
                console.log(r.data)
                verifyBtn.disabled = true
                verifyBtn.classList.add('verifying-btn')
                let {
                    message,
                    status
                } = r.data
                Msg(message, status)
                verifyTimer()
            }).catch(err => console.error(err)) :
            Msg('邮箱格式有误', 'error');
        verifyBtn.disabled = false
    })

    function verifyTimer(timer = 300) {
        if (timer > 0) {
            verifyBtn.innerText = `重新获取 ( ${timer}s )`
            setTimeout(() => verifyTimer(--timer), 1000)
        } else {
            verifyBtn.classList.remove('verifying-btn')
            verifyBtn.innerText = '获取验证码'
            verifyBtn.disabled = false
        }
    }

    let Msg = function (txt, status = 'warn', timeout = 3000) {
        const color = status === 'error' ? '#4876FF' : status === 'warn' ? '#ef8f00' : '#68af02';
        let msgDiv = document.createElement('DIV');
        let content = document.createTextNode(txt);
        msgDiv.classList.add('m-msg');
        msgDiv.appendChild(content);
        msgDiv.style.animationDuration = timeout / 1000 + 's';
        msgDiv.style.backgroundColor = color;
        document.body.appendChild(msgDiv);
        setTimeout(() => document.body.removeChild(msgDiv), timeout);
    }