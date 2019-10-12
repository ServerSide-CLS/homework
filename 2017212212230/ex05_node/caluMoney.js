const fs = require('fs')
const readline = require('readline');

var args = process.argv.splice(2)
var data = ''
var result = []

const readerStream = fs.createReadStream('study.txt')
readerStream.setEncoding('UTF8')
// 读取文本
readerStream.on('data', chunk => {
    data += chunk
})
// 文本 => json
readerStream.on('end', () => {
    data.split('\r\n').map(value => {
        value = value.trim().split(/\s+/)
        result = result.concat({
            usr: value[0],
            date: value[1],
            job: value[2],
            money: value[3],
        })
    })
    console.log(result)
})
// 分析参数，输出结果
readerStream.on('close', () => {
    if (!data) { console.log(`File is empty!`); return }
    console.log(args)
    let parameter_bar = ''
    let usr = ''
    args.forEach(value => {
        value.includes('-') ? parameter_bar += value : usr = value
    })
    if (parameter_bar.includes('l') && !parameter_bar.includes('n')) {
        Object.entries(caluMoney_l()).map(([usr, money]) => {
            console.log(`${usr.padEnd(20, ' -')} ${money}`)
        })
    } else if (parameter_bar.includes('n') && !parameter_bar.includes('l')) {
        if (caluMoney_n(usr)) {
            let { ifExist, result_n } = caluMoney_n(usr)
            console.log(ifExist ? result_n : `${usr} does not exist`)
        }
    } else if (parameter_bar.includes('n') && parameter_bar.includes('l')) {
        caluMoney_l_n(usr)
    } else if (parameter_bar.includes('a')) {
        caluMoney_a()
    } else {
        usage()
    }
})

function caluMoney_l() {
    const usr_list = new Set(result.map(value => {
        return value.usr
    }))
    // Set => Object
    let result_l = {}
    usr_list.forEach(value => {
        result_l[value] = 0
    })
    // 求全部学生赚的全部钱
    result.forEach(value => {
        result_l[value.usr] += parseInt(value.money)
    })
    console.log(result_l)
    return result_l
}

function caluMoney_n(usr) {
    if (usr === '') { usage(); return }
    let result_n = 0
    let ifExist = false
    result.forEach(value => {
        value.usr === usr ? (result_n += parseInt(value.money), ifExist = true) : null
    })
    return {
        ifExist,
        result_n,
    }
}

function caluMoney_l_n(usr) {
    result.forEach(value => {
        value.usr === usr ?
            (
                { usr, date, job, money } = value,
                console.log(`${usr.padEnd(10, ' ')} ${date.padEnd(15, ' ')} ${job.padEnd(8, ' ')} ${money.padEnd(5, ' ')}`)
            ) : null
    })
}

function caluMoney_a() {
    let max = { usr: null, usrTotalMoney: -Infinity, date: null, dateTotalMoney: -Infinity }
    let min = { usr: null, usrTotalMoney: Infinity, date: null, dateTotalMoney: Infinity }
    // 钱最多、最少的学生
    result_l = caluMoney_l()
    for (let [usr, totalMoney] of Object.entries(result_l)) {
        max.usrTotalMoney < totalMoney ? (max.usr = usr, max.usrTotalMoney = totalMoney) : null
        min.usrTotalMoney > totalMoney ? (min.usr = usr, min.usrTotalMoney = totalMoney) : null
    }
    // 钱最多、最少的日期
    const date_list = new Set(result.map(value => {
        return value.date
    }))
    let result_l_date = {}
    date_list.forEach(value => {
        result_l_date[value] = 0
    })
    // 求全部日期赚的全部钱
    result.forEach(value => {
        result_l_date[value.date] += parseInt(value.money)
    })
    console.log(result_l_date)
    for (let [date, totalMoney] of Object.entries(result_l_date)) {
        max.dateTotalMoney < totalMoney ? (max.date = date, max.dateTotalMoney = totalMoney) : null
        min.dateTotalMoney > totalMoney ? (min.date = date, min.dateTotalMoney = totalMoney) : null
    }
    console.log(max, min)
    console.log(`赚钱最多的学生：${''.padStart(10, ' ')} ${max.usr}`)
    console.log(`赚钱最少的学生：${''.padStart(10, ' ')} ${min.usr}`)
    console.log(`赚钱最多的日子：${''.padStart(10, ' ')} ${max.date}`)
    console.log(`赚钱最少的日子：${''.padStart(10, ' ')} ${min.date}`)
}

function usage() {
    console.log('ex05 usage')
    console.log('\t1、 -n {name} 输出{name}的赚的全部钱 ')
    console.log('\t2、 -l 输出全部学生赚的全部钱列表')
    console.log('\t3、 第1、2条可以一起使用')
    console.log('\t4、 -a 输出统计结果')
}
