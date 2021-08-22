const ALERT_UNSIGNINT_NUMBER = 'Bạn cần nhập 1 số nguyên dương'
const ALERT_WRONG_FORMAT = 'Bạn đã nhập sai định dạng'
const ALERT_ONE_WORD_FORMAT = 'Bạn cần nhập 1 từ'

const checkValidateNumber = (number) => {
    let isShow
    if (Number.isNaN(Number(number))) {
        return false
    }
    return true
}

const checkValidateNonNegativeNumber = (number) => {
    const formatedNumber = Number(number)
    if (Number.isNaN(formatedNumber)) {
        return false
    }

    if (formatedNumber > 0) {
        return true
    }
    return false
}

const removeExtraSpace = input => input.replace(/\s+/g, ' ')

const capitalizeFirstLetter = input => input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()

const ex1 = () => {
    const start = Date.now()
    const input = document.getElementById('ex1-input-1').value
    const number = Number(input)

    if (checkValidateNumber(number) && checkValidateNonNegativeNumber(number)) {
        let isPrime = false

        if (number === 2) {
            isPrime = true
        } else if (number > 2) {
            if (number % 2 === 1) {
                isPrime = true
                for (let i = 3; i <= Math.sqrt(i); i += 2) {
                    if (number % i === 0) {
                        isPrime = false
                        break
                    }
                }
            }
        }

        if (isPrime) {
            document.getElementById('ex1-result-1').innerHTML = `${number} là một số nguyên tố!`
        } else {
            document.getElementById('ex1-result-1').innerHTML = `${number} không là số nguyên tố!`
        }
    } else {
        alert(ALERT_UNSIGNINT_NUMBER)
    }
    console.log('Ex1 execute time: ', (Date.now() - start))
}

const ex2 = () => {
    const start = Date.now()
    const input = document.getElementById('ex2-input-1').value
    const number = Number(input)

    if (checkValidateNumber(number) && checkValidateNonNegativeNumber(number)) {
        const arrayResult = []
        for (let i = 1; i <= number; i += 1) {
            arrayResult.push(i)
        }

        if (arrayResult.length > 0) {
            const result = arrayResult.join(', ')
            document.getElementById('ex2-result-1').innerHTML = result
        } else {
            document.getElementById('ex2-result-1').innerHTML = 'Không có số nào thoả mãn!'
        }
    } else {
        alert(ALERT_UNSIGNINT_NUMBER)
    }
    console.log('Ex2 execute time: ', (Date.now() - start))
}

const ex3 = () => {
    const start = Date.now()
    const input = document.getElementById('ex3-input-1').value
    const number = Number(input)

    if (checkValidateNumber(number) && checkValidateNonNegativeNumber(number)) {
        const arrayResult = []
        for (let i = 1; i <= number; i += 2) {
            arrayResult.push(i)
        }

        if (arrayResult.length > 0) {
            const result = arrayResult.join(', ')
            document.getElementById('ex3-result-1').innerHTML = result
        } else {
            document.getElementById('ex3-result-1').innerHTML = 'Không có số nào thoả mãn!'
        }
    } else {
        alert(ALERT_UNSIGNINT_NUMBER)
    }
    console.log('Ex3 execute time: ', (Date.now() - start))
}

const ex4 = () => {
    const start = Date.now()
    const input = document.getElementById('ex4-input-1').value
    const number = Number(input)

    if (checkValidateNumber(number) && checkValidateNonNegativeNumber(number)) {
        const arrayResult = []
        for (let i = 2; i <= number; i += 2) {
            arrayResult.push(i)
        }

        if (arrayResult.length > 0) {
            const result = arrayResult.join(', ')
            document.getElementById('ex4-result-1').innerHTML = result
        } else {
            document.getElementById('ex4-result-1').innerHTML = 'Không có số nào thoả mãn!'
        }
    } else {
        alert(ALERT_UNSIGNINT_NUMBER)
    }
    console.log('Ex4 execute time: ', (Date.now() - start))
}

const ex5 = () => {
    const start = Date.now()
    const input = document.getElementById('ex5-input-1').value
    const number = Number(input)

    if (checkValidateNumber(number) && checkValidateNonNegativeNumber(number)) {
        let arrayResult = []
        if (number === 2) {
            arrayResult = [2]
        } else if (number > 2) {
            arrayResult = [2]

            for (let i = 3; i <= number; i += 1) {
                let isPrime = true

                const currentArrayResultLength = arrayResult.length
                for (let j = 0; j < currentArrayResultLength; j += 1) {
                    if (i % arrayResult[j] === 0) {
                        isPrime = false
                        break
                    }
                }

                if (isPrime) {
                    arrayResult.push(i)
                }
            }
        }


        if (arrayResult.length > 0) {
            const result = arrayResult.join(', ')
            document.getElementById('ex5-result-1').innerHTML = result
        } else {
            document.getElementById('ex5-result-1').innerHTML = 'Không có số nào thoả mãn!'
        }
    } else {
        alert(ALERT_UNSIGNINT_NUMBER)
    }
    console.log('Ex5 execute time: ', (Date.now() - start))
}


const ex6 = () => {
    const start = Date.now()
    const input = document.getElementById('ex6-input-1').value
    const number = Number(input)

    if (checkValidateNumber(number) && checkValidateNonNegativeNumber(number)) {
        let sum = 0

        for (let i = 1; i <= number; i += 1) {
            sum += i
        }

        document.getElementById('ex6-result-1').innerHTML = `Tổng các số từ 1 đến ${number} là: ${sum}`
    } else {
        alert(ALERT_UNSIGNINT_NUMBER)
    }
    console.log('Ex6 execute time: ', (Date.now() - start))
}

const ex7 = () => {
    const start = Date.now()
    const input = document.getElementById('ex7-input-1').value
    const number = Number(input)

    if (checkValidateNumber(number) && checkValidateNonNegativeNumber(number)) {
        let sum = 0

        for (let i = 1; i <= number; i += 1) {
            sum += (i * i)
        }

        document.getElementById('ex7-result-1').innerHTML = `Tổng bình phương các số từ 1 đến ${number} là: ${sum}`
    } else {
        alert(ALERT_UNSIGNINT_NUMBER)
    }
    console.log('Ex7 execute time: ', (Date.now() - start))
}

const ex8 = () => {
    const start = Date.now()
    const input = document.getElementById('ex8-input-1').value
    const number = Number(input)

    if (checkValidateNumber(number) && checkValidateNonNegativeNumber(number)) {
        let sum = 0

        for (let i = 1; i <= number; i += 2) {
            sum += i
        }

        document.getElementById('ex8-result-1').innerHTML = `Tổng  các số lẻ từ 1 đến ${number} là: ${sum}`
    } else {
        alert(ALERT_UNSIGNINT_NUMBER)
    }
    console.log('Ex8 execute time: ', (Date.now() - start))
}

const ex9 = () => {
    const start = Date.now()
    const input = document.getElementById('ex9-input-1').value
    const number = Number(input)

    if (checkValidateNumber(number) && checkValidateNonNegativeNumber(number)) {
        let isFromOddNumber = true

        let temp = number
        let subnumber = temp
        do {
            subnumber = temp % 10
            temp = Math.floor(temp / 10)
            if (subnumber % 2 === 0) {
                isFromOddNumber = false
                break
            }
        } while (temp / 10 !== 0)

        if (isFromOddNumber) {
            document.getElementById('ex9-result-1').innerHTML = `${number} là số được tạo thành bởi toàn các chữ số lẻ`
        } else {
            document.getElementById('ex9-result-1').innerHTML = `${number} không là số được tạo thành bởi toàn các chữ số lẻ`
        }
    } else {
        alert(ALERT_UNSIGNINT_NUMBER)
    }
    console.log('Ex9 execute time: ', (Date.now() - start))
}


const ex10 = () => {
    const start = Date.now()
    const input = document.getElementById('ex10-input-1').value
    const number = Number(input)

    if (checkValidateNumber(number) && checkValidateNonNegativeNumber(number)) {
        let temp = number
        let subnumber = temp
        let reverseNumber = ''
        do {
            subnumber = temp % 10
            temp = Math.floor(temp / 10)
            reverseNumber += subnumber
        } while (temp / 10 !== 0)

        if ((number) === Number(reverseNumber)) {
            document.getElementById('ex10-result-1').innerHTML = `${number} là số đối xứng`
        } else {
            document.getElementById('ex10-result-1').innerHTML = `${number} không là số đối xứng`
        }
    } else {
        alert(ALERT_UNSIGNINT_NUMBER)
    }
    console.log('Ex10 execute time: ', (Date.now() - start))
}


const ex11 = () => {
    const start = Date.now()

    for (let i = 2; i <= 9; i += 1) {
        let tableStr = ''
        for (let j = 1; j <= 9; j += 1) {
            tableStr += `${i} x ${j} = ${i * j}\n`
        }

        const resultElementId = `ex11-result-${i - 1}`
        document.getElementById(resultElementId).innerHTML = `<pre>${tableStr}</pre>`
    }

    console.log('Ex11 execute time: ', (Date.now() - start))
}


const ex12 = () => {
    const start = Date.now()
    const input = document.getElementById('ex12-input-1').value

    const count = input.split(' ').length - 1

    document.getElementById('ex12-result-1').innerHTML = `Số khoảng trắng là: ${count}`

    console.log('Ex12 execute time: ', (Date.now() - start))
}

const ex13 = () => {
    const start = Date.now()
    const input = document.getElementById('ex13-input-1').value

    const result = input.replaceAll(' ', '').replaceAll('\n', '')

    document.getElementById('ex13-result-1').innerHTML = result

    console.log('Ex13 execute time: ', (Date.now() - start))
}

const ex14 = () => {
    const start = Date.now()
    const input = document.getElementById('ex14-input-1').value

    const result = input.split('').reverse().join('')

    document.getElementById('ex14-result-1').innerHTML = result

    console.log('Ex14 execute time: ', (Date.now() - start))
}

const ex15 = () => {
    const start = Date.now()
    const input1 = document.getElementById('ex15-input-1').value
    const input2 = document.getElementById('ex15-input-2').value

    if (input2.includes(' ')) {
        alert(ALERT_ONE_WORD_FORMAT)
    } else {
        let inputFormated = removeExtraSpace(input1.replace(/[,!.";()]/g, ' '))
        const listWord = inputFormated.split(' ')
        console.log(listWord)
        const result = listWord.indexOf(input2) + 1

        if (result > 0) {
            document.getElementById('ex15-result-1').innerHTML = `Vị trí của chuỗi "${input2}" là: ${result}`
        } else {
            document.getElementById('ex15-result-1').innerHTML = `Không tìm thấy chuỗi "${input2}"!`
        }
    }

    console.log('Ex15 execute time: ', (Date.now() - start))
}

const ex16 = () => {
    const start = Date.now()
    const input1 = document.getElementById('ex16-input-1').value

    let listWord = input1.split(' ')
    listWord = listWord.map(word => capitalizeFirstLetter(word))
    const result = listWord.join(' ')
    
    document.getElementById('ex16-result-1').innerHTML = `Họ tên sau khi chuẩn hoá: ${result}`

    console.log('Ex16 execute time: ', (Date.now() - start))
}

const ex17 = () => {
    const start = Date.now()
    const input = document.getElementById('ex17-input-1').value

    const facebookPrefix = 'https://www.facebook.com/'

    let result = null
    if (input.startsWith(facebookPrefix)) {
        result = input.substring(facebookPrefix.length)
    }

    if (result) {
        document.getElementById('ex17-result-1').innerHTML = `Facebook Id Name là: ${result}`
    } else {
        document.getElementById('ex17-result-1').innerHTML = `Không xác định được Facebook Id Name`
    }

    console.log('Ex17 execute time: ', (Date.now() - start))
}

const ex18 = () => {
    const start = Date.now()
    const input = document.getElementById('ex18-input-1').value

    const listNumber = input.split(',').map((n) => {
        let number = Number(n.trim())
        if (!Number.isNaN(number)) {
            return number
        }
        return null
    }).filter(n => n !== null)

    if (listNumber.length > 0) {
        let max = listNumber[0]
        let min = listNumber[0]

        for (let i = 0; i < listNumber.length; i += 1) {
            const value = listNumber[i]
            if (max < value) {
                max = value
            }
            if (min > value) {
                min = value
            }
        }

        document.getElementById('ex18-result-1').innerHTML = `Số nhỏ nhất trong dãy là ${min}`
        document.getElementById('ex18-result-2').innerHTML = `Số lớn nhất trong dãy là ${max}`
    } else {
        alert(ALERT_WRONG_FORMAT)
    }

    console.log('Ex18 execute time: ', (Date.now() - start))
}

const ex19 = () => {
    const start = Date.now()
    const input1 = document.getElementById('ex19-input-1').value
    const input2 = document.getElementById('ex19-input-2').value

    if (input2.includes(' ')) {
        alert(ALERT_ONE_WORD_FORMAT)
    } else {
        let inputFormated = removeExtraSpace(input1.replace(/[,!.";()]/g, ' '))
        const listWord = inputFormated.split(' ')
        console.log(listWord)
        const result = listWord.lastIndexOf(input2) + 1

        if (result > 0) {
            document.getElementById('ex19-result-1').innerHTML = `Vị trí của chuỗi "${input2}" là: ${result}`
        } else {
            document.getElementById('ex19-result-1').innerHTML = `Không tìm thấy chuỗi "${input2}"!`
        }
    }

    console.log('Ex19 execute time: ', (Date.now() - start))
}

const ex20 = () => {
    const start = Date.now()
    const input = document.getElementById('ex20-input-1').value
    const number = Number(input)

    const sumRecusion = (number) => {
        if (number === 1) return 1
        return number + sumRecusion(number - 1)
    }

    if (checkValidateNumber(number) && checkValidateNonNegativeNumber(number)) {
        const result = sumRecusion(number)

        document.getElementById('ex20-result-1').innerHTML = `Hãy tính tổng các số từ 1 đến ${number} là: ${result}`
    } else {
        alert(ALERT_UNSIGNINT_NUMBER)
    }

    console.log('Ex20 execute time: ', (Date.now() - start))
}

const ex21 = () => {
    const start = Date.now()
    const input = document.getElementById('ex21-input-1').value

    const noExtraSpaceInput = removeExtraSpace(input)
    let keyValueList = noExtraSpaceInput.split('"')
    console.log(keyValueList)
    keyValueList = keyValueList.map((keyValue, index) => {
        if (index > 0) {
            if (index % 2 === 1) {
                let valueStr = keyValue
                if (valueStr.startsWith(' ')) {
                    valueStr = valueStr.substring(1)
                }
                if(valueStr.endsWith(' ')) {
                    valueStr = valueStr.substring(0, valueStr.length - 1)
                }
                return valueStr
            }
        }
        return keyValue
    })
    console.log(keyValueList)

    const result = keyValueList.join('"')

    document.getElementById('ex21-result-1').innerHTML = `Chuỗi sau khi chuẩn hoá là: ${result}`

    console.log('Ex21 execute time: ', (Date.now() - start))
}