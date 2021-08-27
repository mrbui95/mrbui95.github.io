const ALERT_UNSIGNINT_NUMBER = 'Bạn cần nhập 1 số nguyên dương'
const ALERT_WRONG_FORMAT = 'Bạn đã nhập sai định dạng'
const ALERT_ONE_WORD_FORMAT = 'Bạn cần nhập 1 từ'
const ALERT_LIST_NUMBER_FORMAT = 'Bạn cần nhập một dãy số. Ví dụ: [1, 2, 3]'
const ALERT_JSON_FORMAT = 'Bạn cần nhập dữ liệu dạng JSON'

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

const capitalizeFirstLetterName = (name) => {
    const listWords = removeExtraSpace(name).split(' ')
    return listWords.map(word => capitalizeFirstLetter(word)).join(' ')
}

const convertStringToArrayNumber = (input) => {
    const match = /\[[0-9|\,|\s]+\]/.exec(input)[0]
    if (match) {
        let listNumber = match.substring(1, match.length - 1).split(',')
        listNumber = listNumber.map(n => Number(n.trim())).filter(n => !Number.isNaN(n))
        return listNumber
    }
    return null
}


const checkIsPrime = (number) => {
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

    return isPrime
}

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
                if (valueStr.endsWith(' ')) {
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

const ex22 = () => {
    const start = Date.now()
    const input = document.getElementById('ex22-input-1').value

    const listNumber = convertStringToArrayNumber(input)

    console.log(listNumber)

    if (listNumber && listNumber.length > 0) {
        let result = 0

        listNumber.forEach(n => result += n)

        document.getElementById('ex22-result-1').innerHTML = `Tổng của dãy số là: ${result}`
    } else {
        alert(ALERT_LIST_NUMBER_FORMAT)
    }

    console.log('Ex22 execute time: ', (Date.now() - start))
}

const ex23 = () => {
    const start = Date.now()
    const input = document.getElementById('ex23-input-1').value

    const listNumber = convertStringToArrayNumber(input)

    console.log(listNumber)

    if (listNumber && listNumber.length > 0) {
        let max = listNumber[0]
        let min = listNumber[0]
        let sum = 0

        listNumber.forEach((n) => {
            sum += n
            if (max < n) max = n
            if (min > n) min = n
        })

        const avg = sum / (listNumber.length)

        document.getElementById('ex23-result-1').innerHTML = `Số lớn nhất của dãy số là: ${max}`
        document.getElementById('ex23-result-2').innerHTML = `Số nhỏ nhất của dãy số là: ${min}`
        document.getElementById('ex23-result-3').innerHTML = `Trung bình của dãy số là: ${avg}`
    } else {
        alert(ALERT_LIST_NUMBER_FORMAT)
    }

    console.log('Ex23 execute time: ', (Date.now() - start))
}

const ex24 = () => {
    const start = Date.now()
    const input = document.getElementById('ex24-input-1').value

    const listNumber = convertStringToArrayNumber(input)

    console.log(listNumber)

    if (listNumber && listNumber.length > 0) {
        let listFrequence = {}

        listNumber.forEach(n => {
            listFrequence[n] = listFrequence[n] ? (listFrequence[n] + 1) : 1
        })

        console.log(listFrequence)
        let max = 0
        let maxValue = []

        Object.keys(listFrequence).forEach((key) => {
            if (listFrequence[key] > max) {
                max = listFrequence[key]
                maxValue = [key]
            } else if (listFrequence[key] === max) {
                maxValue.push(key)
            }
        })

        document.getElementById('ex24-result-1').innerHTML = `Tần suất xuất hiện lớn nhất của dãy số là: ${max} của ${maxValue.length > 1 ? 'các ' : ''}giá trị ${maxValue.join(', ')}`
    } else {
        alert(ALERT_LIST_NUMBER_FORMAT)
    }

    console.log('Ex23 execute time: ', (Date.now() - start))
}

const ex25 = () => {
    const start = Date.now()
    const input = document.getElementById('ex25-input-1').value

    const listNumber = convertStringToArrayNumber(input)

    console.log(listNumber)

    if (listNumber && listNumber.length > 0) {
        let listPrime = listNumber.filter(number => checkIsPrime(number))

        document.getElementById('ex25-result-1').innerHTML = `Các số nguyên tố là: ${listPrime.join(', ')}`
    } else {
        alert(ALERT_LIST_NUMBER_FORMAT)
    }

    console.log('Ex25 execute time: ', (Date.now() - start))
}

const ex26 = () => {
    const start = Date.now()
    const input = document.getElementById('ex26-input-1').value

    const listNumber = convertStringToArrayNumber(input)

    console.log(listNumber)

    if (listNumber && listNumber.length > 0) {
        let listSquareNumber = listNumber.map(number => number * number)

        document.getElementById('ex26-result-1').innerHTML = `Dãy các bình phương là: ${JSON.stringify(listSquareNumber)}`
    } else {
        alert(ALERT_LIST_NUMBER_FORMAT)
    }

    console.log('Ex26 execute time: ', (Date.now() - start))
}

const ex27 = () => {
    const start = Date.now()
    const input = document.getElementById('ex27-input-1').value
    const input2 = document.getElementById('ex27-input-2').value
    const pivot = Number(input2)

    const listNumber = convertStringToArrayNumber(input)

    console.log(listNumber)

    if (checkValidateNumber(pivot) && checkValidateNonNegativeNumber(pivot)) {
        if (listNumber && listNumber.length > 0) {
            let minDis = Math.abs(pivot - listNumber[0])
            let listMinDisNumber = []

            listNumber.forEach((number) => {
                const currentMinDis = Math.abs(pivot - number)
                if (currentMinDis < minDis) {
                    minDis = currentMinDis
                    listMinDisNumber = [number]
                } else if (currentMinDis === minDis) {
                    listMinDisNumber.push(number)
                }
            })

            document.getElementById('ex27-result-1').innerHTML = `Các số gần với ${pivot} là: ${listMinDisNumber.join(', ')}`
        } else {
            alert(ALERT_LIST_NUMBER_FORMAT)
        }
    } else {
        alert(ALERT_UNSIGNINT_NUMBER)
    }

    console.log('Ex27 execute time: ', (Date.now() - start))
}


const ex28 = () => {
    const start = Date.now()
    const input = document.getElementById('ex28-input-1').value
    console.log(input)

    let listStudent = null

    try {
        listStudent = JSON.parse(input.trim())
    } catch (err) {
        console.log(err)
        alert(ALERT_JSON_FORMAT)
    }

    if (listStudent && listStudent.length > 0) {
        listStudent = listStudent.map((student) => {
            student.firstName = capitalizeFirstLetterName(student.firstName)
            student.lastName = capitalizeFirstLetterName(student.lastName)
            return student
        })

        console.log(listStudent)

        let listStudentA3 = listStudent.filter((student) => {
            console.log(student)
            return student.firstName && student.firstName.length >= 3 && student.firstName.toLowerCase().includes('a')

        })

        document.getElementById('ex28-result-1').innerHTML = `Danh sách học sinh có tên chứa chữ a là: ${JSON.stringify(listStudentA3)}`
    } else {
        alert(ALERT_WRONG_FORMAT)
    }


    console.log('Ex28 execute time: ', (Date.now() - start))
}

const ex29 = () => {
    const start = Date.now()
    const input = document.getElementById('ex29-input-1').value
    console.log(input)

    let listStudent = null

    try {
        listStudent = JSON.parse(input.trim())
    } catch (err) {
        console.log(err)
        alert(ALERT_JSON_FORMAT)
    }

    if (listStudent && listStudent.length > 0) {
        listStudent = listStudent.map((student) => {
            student.firstName = capitalizeFirstLetterName(student.firstName)
            student.lastName = capitalizeFirstLetterName(student.lastName)
            return student
        })

        console.log(listStudent)

        let listStudentDo = listStudent.filter((student) => {
            console.log(student)
            return student.lastName && student.lastName.startsWith('Do ')

        })

        document.getElementById('ex29-result-1').innerHTML = `Danh sách học sinh có họ Do là: ${JSON.stringify(listStudentDo)}`
    } else {
        alert(ALERT_WRONG_FORMAT)
    }


    console.log('Ex29 execute time: ', (Date.now() - start))
}

const ex30 = () => {
    const start = Date.now()
    const input = document.getElementById('ex30-input-1').value
    console.log(input)

    let listStudent = null

    try {
        listStudent = JSON.parse(input.trim())
    } catch (err) {
        console.log(err)
        alert(ALERT_JSON_FORMAT)
    }

    if (listStudent && listStudent.length > 0) {
        listStudent = listStudent.map((student) => {
            student.firstName = capitalizeFirstLetterName(student.firstName)
            student.lastName = capitalizeFirstLetterName(student.lastName)
            return student
        })

        console.log(listStudent)

        let listStudentABC = listStudent.sort((std1, std2) => {
            if (std1.firstName > std2.firstName) return 1
            if (std1.firstName === std2.firstName) return 0
            return -1
        })

        document.getElementById('ex30-result-1').innerHTML = `Danh sách học sinh sau khi sắp xếp là: ${JSON.stringify(listStudentABC)}`
    } else {
        alert(ALERT_WRONG_FORMAT)
    }


    console.log('Ex30 execute time: ', (Date.now() - start))
}

const ex31 = () => {
    const start = Date.now()
    const input = document.getElementById('ex31-input-1').value

    const listNumber = convertStringToArrayNumber(input)

    console.log(listNumber)

    if (listNumber && listNumber.length > 1) {
        let max1 = listNumber[0]
        let max2 = listNumber[1]

        if (max1 === max2) {
            document.getElementById('ex31-result-1').innerHTML = 'Không có giá trị lớn nhì'
        } else {
            if (max1 < max2) {
                max1 = listNumber[1]
                max2 = listNumber[2]
            }
            listNumber.forEach((number) => {
                if (number > max1) {
                    max2 = max1
                    max1 = number
                } else if (number < max1 && number > max2) {
                    max2 = number
                }
            })
    
            document.getElementById('ex31-result-1').innerHTML = `Giá trị lớn nhì là: ${max2}`
        }
    } else if (listNumber.length > 0) {
        document.getElementById('ex31-result-1').innerHTML = 'Không có giá trị lớn nhì'
    } else {
        alert(ALERT_LIST_NUMBER_FORMAT)
    }

    console.log('Ex27 execute time: ', (Date.now() - start))
}

const ex32 = () => {
    const start = Date.now()
    const input = document.getElementById('ex32-input-1').value
    const input2 = document.getElementById('ex32-input-2').value
    const pivot = Number(input2)

    let listNumber = convertStringToArrayNumber(input)

    console.log(listNumber)

    if (checkValidateNumber(pivot) && checkValidateNonNegativeNumber(pivot)) {
        if (listNumber && listNumber.length > 0) {
            let listResult = null

            listNumber = listNumber.sort()
            const length = listNumber.length
            for (let i = 0; i < length - 2; i += 1) {
                const ai = listNumber[i]
                if ((ai + listNumber[length - 1] + listNumber[length - 2]) < pivot) continue
                for (let j = i + 1; j < length - 1; j += 1) {
                    const aj = listNumber[j]
                    if ((ai + aj + listNumber[length - 1]) < pivot) continue
                    for (let k = j + 1; k < length; k += 1) {
                        const ak = listNumber[k]
                        if ((ai + aj + ak) === pivot) {
                            listResult = [ai, aj, ak]
                            break
                        }
                    }
                }
            }

            if (listResult) {
                document.getElementById('ex32-result-1').innerHTML = `Tồn tại bộ 3 số có tổng là ${pivot}: (${listResult.join(', ')})`
            } else {
                document.getElementById('ex32-result-1').innerHTML = `Không tồn tại bộ 3 số có tổng là ${pivot}`
            }
            
        } else {
            alert(ALERT_LIST_NUMBER_FORMAT)
        }
    } else {
        alert(ALERT_UNSIGNINT_NUMBER)
    }

    console.log('Ex27 execute time: ', (Date.now() - start))
}

const ex33 = () => {
    const start = Date.now()
    const input = document.getElementById('ex33-input-1').value
    const input2 = document.getElementById('ex33-input-2').value
    const inserted = Number(input2)

    let listNumber = convertStringToArrayNumber(input)

    console.log(listNumber)

    if (checkValidateNumber(inserted) && checkValidateNonNegativeNumber(inserted)) {
        if (listNumber && listNumber.length > 0) {
            const length = listNumber.length

            for (let i = 0; i < length; i += 1) {
                if (inserted < listNumber[i]) {
                    listNumber.splice(i, 0, inserted)
                    break
                }
            }

            
            document.getElementById('ex33-result-1').innerHTML = `Dãy số mới là: [${listNumber.join(', ')}]`
        } else {
            alert(ALERT_LIST_NUMBER_FORMAT)
        }
    } else {
        alert(ALERT_UNSIGNINT_NUMBER)
    }

    console.log('Ex33 execute time: ', (Date.now() - start))
}

const ex34 = () => {
    const start = Date.now()
    const input = document.getElementById('ex34-input-1').value

    let listNumber = convertStringToArrayNumber(input)

    console.log(listNumber)

    if (listNumber && listNumber.length > 0) {
        const length = listNumber.length

        for (let i = 0; i < length; i += 1) {
            for (let j = i + 1; j < length; j += 1) {
                if (listNumber[i] > listNumber[j]) {
                    let temp = listNumber[i]
                    listNumber[i] = listNumber[j]
                    listNumber[j] = temp
                }
            }
        }

        
        document.getElementById('ex34-result-1').innerHTML = `Dãy số mới sau khi sắp xếp là: [${listNumber.join(', ')}]`
    } else {
        alert(ALERT_LIST_NUMBER_FORMAT)
    }

    console.log('Ex33 execute time: ', (Date.now() - start))
}