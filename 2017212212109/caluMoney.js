/**
 * 例子：
 * node caluMoney.js -a
 * node caluMoney.js -ln wang
 * node caluMoney.js -ln // 可以工作，但是不会显示任何内容
 * node caluMoney.js -n wang -l -n chen
 */
const fs = require("fs");
const log = console.log;

const FILE_PATH = "study.txt";

start();

function start() {
    const args = process.argv.slice(2);
    const parseResult = parseArgs(args);

    if (!parseResult.valid) {
        log("Error " + parseResult.message);
        return false;
    }

    const { isStat, isList, isSpecialName, specialNames } = parseResult;
    const records = parseFile(FILE_PATH);

    if (isList) {
        log("NAME".padEnd(20) + "DATE".padEnd(20) + "MONEY".padEnd(20) + "WORK".padEnd(20));
        log("----".padEnd(20) + "----".padEnd(20) + "-----".padEnd(20) + "----".padEnd(20));

        for (const { name, date, work, money } of records) {
            if (isSpecialName && !specialNames.includes(name)) continue;
            log(name.padEnd(20) + date.padEnd(20) + money.padEnd(20) + work.padEnd(20));
        }

        return true;
    }

    if (isStat) {
        let moneyCount = {};
        let dateCount = {};
        for (const { name, date, money } of records) {
            moneyCount[name] = (moneyCount[name] || 0) + parseFloat(money);
            dateCount[date] = (dateCount[date] || 0) + 1;
        }

        const compare = (a, b) => a[1] - b[1];

        moneyCount = Object.entries(moneyCount);
        dateCount = Object.entries(dateCount);
        moneyCount.sort(compare);
        dateCount.sort(compare);

        log(`赚钱最多的学生：${moneyCount[moneyCount.length - 1][0]}`);
        log(`赚钱最少的学生：${moneyCount[0][0]}`);
        log(`赚钱最多的日子：${dateCount[dateCount.length - 1][0]}`);
        log(`赚钱最少的日子：${dateCount[0][0]}`);
    }
}

function parseArgs(args) {
    const result = {
        valid: true,
        message: "ok",
        isList: false,
        isStat: false,
        isSpecialName: false,
        specialNames: [],
    };

    let cleanArgs = "";
    args.forEach(argv => {
        if (argv.startsWith("-")) {
            const options = argv;
            options.slice(1).split("").forEach(option => cleanArgs += ` -${option}`);
        } else {
            const optionValue = argv;
            cleanArgs += ` ${optionValue}`;
        }
    });
    cleanArgs = cleanArgs.trim().split(" ");

    let lastOption = null;
    for (const argv of cleanArgs) {
        if (argv.startsWith("-")) {
            lastOption = argv.slice(1);
            switch (lastOption) {
                case ("l"): result.isList = true; break;
                case ("a"): result.isStat = true; break;
                case ("n"): result.isSpecialName = true; break;
                default:
                    result.valid = false;
                    result.message = "非法的参数：" + argv;
                    return result;
            }
        } else {
            if (lastOption !== "n") {
                result.valid = false;
                result.message = "非法的值：" + argv;
                return result;
            } else {
                result.specialNames.push(argv);
            }
        }
    }

    if (result.isStat && (result.isList || result.isSpecialName)) {
        result.valid = false;
        result.message = "-a 参数不能和 -l、-n 参数共用";
    }

    return result;
}

function parseFile(filePath) {
    const file = fs.readFileSync(filePath, { encoding: "utf8" });
    const records = file.split("\n").map(line => {
        const [name, date, work, money] = line.split(/\s+/);
        return { name, date, work, money };
    });

    return records;
}