const fs = require('fs')
const process = require('process')

const data = fs.readFileSync('study.txt')
//将字符串存入数组
const dataResult = data.toString().split("\n").map(value =>{
    value = value.trim().split(/\s+/)
    return {
        name: value[0],
        date: value[1],
        job: value[2],
        income: parseInt(value[3])
    }
})

const getParam = () => {
	return process.argv.slice(2)
}

const existThis = (word, x) => {
	let index = word.indexOf(x)
	return index > -1 ? index : null
}


const listName = (data, name) => (
	data.filter(item => item.name === name)
)

const calcTotal = (data, name) => (
	listName(data, name)
		.reduce((tot, item) => tot + item.income, 0)
)


const sortMoney = (obj) => {
	let array1 = []

	for (let i in obj) {
		array1.push({key: i, income: obj[i]})
	}

	return array1.sort((a, b) => a.income < b.income)
}


const calcList = (data, type = 'name') => {
	switch (type) {
		case 'name':
			return data.reduce((result, current) => {
				result[current.name] ? result[current.name] += current.income : result[current.name] = current.income
				return result
			}, {})

		case 'date':
			return data.reduce((result, current) => {
				result[current.date] ? result[current.date] += current.income : result[current.date] = current.income
				return result
			}, {})
	}
}



const Name = (params, data) => {
	let index = existThis(params, '-n')

	if (index === null || existThis(params, '-l') > 0) {
		return
	}

	if (params[index + 1] === undefined) {
		error('at tryName() incorrect argv')
	}

	let name = params[index + 1]
	console.log(name, calcTotal(data, name))
}

const List = (params, data) => {
	let i_l = existThis(params, '-l')
	let i_n = existThis(params, '-n')

	if (i_l !== null && i_n === null) {
		let r = calcList(data)
		for (name in r) {
			console.log(`${name}\t${r[name]}`)
		}

	} else if (i_l !== null && i_n !== null) {
		let name = params[i_n + 1]
		listName(data, name).map(item => {
			console.log(`${item.name}\t${item.date}\t${item.job}\t${item.income}`)
		})
	}
}

const Result = (params, data) => {
	let index = existThis(params, '-a')


	let sn = sortMoney(calcList(data))
	let sd = sortMoney(calcList(data, 'date'))

	console.log(`赚钱最多的学生:\t${sn[0].key}`)
	console.log(`赚钱最少的学生:\t${sn[sn.length - 1].key}`)
	console.log(`赚钱最多的日子:\t${sd[0].key}`)
	console.log(`赚钱最少的日子:\t${sd[sd.length - 1].key}`)
}

function main() {
	const params = getParam()

	Result(params, dataResult)
	Name(params, dataResult)
	List(params, dataResult)

}

main()