const fs = require('fs')
const process = require('process')

/**
 *  读取文件并转换为对象
 */
const file2Obj = async (path) => {
	try {
		const data = fs.readFileSync(path)
		const ret = data.toString().split('\n').map((item) => {
			let attr = item.split(/\s+/)
			return {
				name: attr[0],
				date: attr[1],
				act: attr[2],
				income: parseInt(attr[3])
			}
		})
		return ret
	} catch (err) {
		console.error(err)
	}
}

/**
 * arr 中 是否存在 k
 */
const existThis = (arr, k) => {
	let index = arr.indexOf(k)
	return index > -1 ? index : null
}

const getParam = () => {
	return process.argv.slice(2)
}

/**
 * 根据收入排序
 */
const _sort = (obj) => {
	let _arr = []

	for (let i in obj) {
		_arr.push({key: i, income: obj[i]})
	}

	return _arr.sort((a, b) => a.income < b.income)
}

/**
 * 根据姓名筛选，返回新对象数组
 */
const listName = (data, name) => (
	data.filter(item => item.name === name)
)

/**
 * 根据姓名计算其总收入
 */
const calcTotal = (data, name) => (
	listName(data, name)
		.reduce((tot, item) => tot + item.income, 0)
)

/**
 * 根据 type 统计总金额
 */
const calcList = (data, type = 'name') => {
	switch (type) {
		case 'name':
			return data.reduce((ret, curr) => {
				ret[curr.name] ? ret[curr.name] += curr.income : ret[curr.name] = curr.income
				return ret
			}, {})

		case 'date':
			return data.reduce((ret, curr) => {
				ret[curr.date] ? ret[curr.date] += curr.income : ret[curr.date] = curr.income
				return ret
			}, {})
	}
}

/**
 * 抛出异常
 */
const error = (msg = 'incorrect argv') => {
	throw new Error('[ERROR]: ' + msg)
}

const tryName = (params, data) => {
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

const tryList = (params, data) => {
	let i_l = existThis(params, '-l')
	let i_n = existThis(params, '-n')

	if (i_l !== null && i_n === null) {
		let r = calcList(data)

		for (name in r) {
			console.log(`${name}\t${r[name]}`)
		}

	} else if (i_l !== null && i_n !== null) {
		let name = params[i_n + 1]

		console.log('姓名\t日期\t\t活动\t收入')

		listName(data, name).map(item => {
			console.log(`${item.name}\t${item.date}\t${item.act}\t${item.income}`)
		})
	}
}

const tryResult = (params, data) => {
	let index = existThis(params, '-a')

	if (index !== null && params.length > 1) {
		error('at tryResult() incorrect argv')
	}

	if (index === null) return

	let sn = _sort(calcList(data))
	let sd = _sort(calcList(data, 'date'))

	console.log(`赚钱最多的学生:\t${sn[0].key}`)
	console.log(`赚钱最少的学生:\t${sn[sn.length - 1].key}`)
	console.log(`赚钱最多的日子:\t${sd[0].key}`)
	console.log(`赚钱最少的日子:\t${sd[sd.length - 1].key}}`)
}

async function main() {
	const params = getParam()
	const data = await file2Obj('./study.txt')

	try {
		tryResult(params, data)
		tryName(params, data)
		tryList(params, data)
	} catch (e) {
		console.log(e.message)
	}
}

main()
