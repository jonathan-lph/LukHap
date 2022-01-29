const fs = require('fs')
const stringify = require("json-stringify-pretty-compact");
const seedrandom = require("seedrandom")

const getUnfilteredList = () => {

  const outputFile = fs.createWriteStream('unfiltered_word_list.txt')
  outputFile.on('error', (err) => console.error(err))

  const rng = seedrandom('cidoulukhap')

  const data = fs.readFileSync('source_word_pair.txt', 'utf-8')
  const dataObj = data.toString().split('\n')
  for (let i = 0; i < 2500; i++) {
    outputFile.write(`${dataObj[Math.floor(rng() * dataObj.length)]}\n`)
  }

  outputFile.close()

}

const splitFilteredList = () => {

  const outputFile = fs.createWriteStream('filtered_word_list.json')
  outputFile.on('error', (err) => console.error(err))

  const data = fs.readFileSync('filtered_word_list.txt')
  const result = data.toString().split('\n').map(line => line.trim().split(','))
  outputFile.write(stringify({result}, undefined, 2))

  outputFile.close()

}

const getUnsortedDictionary = () => {
  
  const outputFile = fs.createWriteStream('unsorted_dictionary.json')
  outputFile.on('error', (err) => console.error(err))

  const data = fs.readFileSync('source_word_pair.txt')
  let result = {}
  data.toString().split('\n').map(line => {
    const wordPair = line.trim().split(',')
    const i1 = wordPair[0]
    const i2 = wordPair[3]
    let layer1 = result[i1] ? result[i1] : {}
    let layer2 = layer1[i2] ? layer1[i2] : []
    layer2.push(wordPair)
    layer1[i2] = layer2
    result[i1] = layer1
  })
  outputFile.write(stringify(result, undefined, 2))

  outputFile.close()

}

const getSortedDictionary = () => {

  const outputFile = fs.createWriteStream('sorted_dictionary.json')
  outputFile.on('error', (err) => console.error(err))

  const compareString = (str1, str2) => {
    if (str1 === '') return -1
    if (str2 === '') return 1
    return  str1[0] === str2[0] ? compareString(str1.slice(1), str2.slice(1))
      : str1[0] < str2[0] ? -1
      : 1
  }

  const data = require('./unsorted_dictionary.json')
  const result = Object.fromEntries(
    Object.entries(data).map(([i1, layer1]) => {
      return [i1, Object.fromEntries(
        Object.entries(layer1).map(([i2, array]) => {
          return [i2, array.sort((a, b) => {
            return  a[1] !== b[1] ? compareString(a[1], b[1])
                  : a[2] !== b[2] ? compareString(a[2], b[2])
                  : a[4] !== b[4] ? compareString(a[4], b[4])
                  : a[5] !== b[5] ? compareString(a[5], b[5])
                  : 0
          })]
        })
      )]
    })
  )

  outputFile.write(stringify(result, undefined, 2))
  
  outputFile.close()

}

const getMergedDictionary = () => {

  const outputFile = fs.createWriteStream('dictionary.json')
  outputFile.on('error', (err) => console.error(err))

  const compareWord = (arr1, arr2) => 
    arr1.slice(0, -1).join('') === arr2.slice(0, -1).join('')

  const data = require('./sorted_dictionary.json')
  const result = Object.fromEntries(
    Object.entries(data).map(([i1, layer1]) => {
      return [i1, Object.fromEntries(
        Object.entries(layer1).map(([i2, array]) => {
          return [i2, array.reduce((acc, wordPair, idx) => {
            if (idx === 0) return [wordPair]
            const prevEntry = acc[acc.length-1]
            if (!compareWord(wordPair, prevEntry)) return [...acc, wordPair]
            if (prevEntry[6] === wordPair[6]) return acc
            return [
              ...acc.slice(0, -1),
              [...wordPair.slice(0, -1), `${prevEntry[6]}／${wordPair[6]}`]
            ]
          }, [])]
        })
      )]
    })
  )

  outputFile.write(stringify(result, undefined, 2))
  
  outputFile.close()

}