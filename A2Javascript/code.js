//
// this is just a stub for a function you need to implement
//
function isAPalindrome(word){
    // Reverse string
    let reverseWord = word.split('').reverse().join('');
    // Compare word vs reverse word
    return word == reverseWord;
}

function getUniqueWords(words) {
    let uniqueWords = [];

    for (var i = 0; i < words.length; i++) {
        // If word does not exist in uniqueWords, add it to the array
        if (uniqueWords.indexOf(words[i]) == -1) {
            uniqueWords.push(words[i]);
        }
    }

    return uniqueWords;
}
function getLongestWords(allWords) {

    let words = getUniqueWords(allWords);
    let biggestWords = [];
    if (words.length < 1) {
        return null;
    }
    // Find the longest 10 words
    for (var i = 0; i < 10; i++) {
        if (words.length > 0) {
            var longestWord = words.reduce(function (a, b) {
                return a.length > b.length ? a : b;
            });
            var indexOfWord = words.indexOf(longestWord);
            if (indexOfWord > -1) {
                words.splice(indexOfWord, 1);
            }
            if (biggestWords.indexOf(longestWord) == -1) {
                biggestWords.push(longestWord);
            }
        }
    }
    // Sort the longest 10 words to be in length or alphabetical order
    biggestWords.sort(function(a, b){
        return (b.length - a.length) || a.toLowerCase().localeCompare(b.toLowerCase());
    });
    return biggestWords;
}

function getMostFrequentWords(allWords) {

    let frequency = {};

    // Get each word into the frequency dictionary
    for (var i = 0; i < allWords.length; i++){
        let currentWord = allWords[i].toLowerCase();
        if (frequency.hasOwnProperty(currentWord)) {
            frequency[currentWord] = frequency[currentWord]+1;
        } else {
            frequency[currentWord] = 1;
        }
    }

    // Setuo variables for the loop.
    let maxNumber = 0;
    let mostFrequentWord = null;
    let frequencyArray = [];

    for (var i = 0; i < 10; i++) {
        // Find the most frequent word in array
        if (Object.keys(frequency).length > 0) {
            for (word in frequency ) {
                if (frequency[word] > maxNumber) {
                    maxNumber = frequency[word];
                    mostFrequentWord = word;
                }
            }
            // Remove the most frequent word and reset maxNumber for next iteration
            delete frequency[mostFrequentWord];
            frequencyArray.push(mostFrequentWord + "(" + maxNumber + ")");
            maxNumber = 0;
        }
    }

    // frequencyArray.sort(function(a, b){
    //     return a.toLowerCase().localeCompare(b.toLowerCase());
    // });
    return frequencyArray;
}
function getStats(txt) {
    txt = txt.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    let nChars = txt.length;
    let allWords = txt.split(/[\n ]/);
    for (var i = 0; i < allWords.length; i++) {
        allWords[i] = allWords[i].toLowerCase();
    }


    let nWords = allWords.length;
    let nLines = txt.split("\n").length;
    if (nLines == 1 && txt == "") nLines = 0;
    let linesArray = txt.split("\n");
    let nNonEmptyLines = 0;
    for (var i = 0; i< linesArray.length; i++){
        if ((linesArray[i].length == 1) && (linesArray[i] != "" || linesArray[i] != " ")) {
            nNonEmptyLines++;
        }
        else {
            // line is more than 1 char
            for (var j = 0; j < linesArray[i].length; j++) {
                if (linesArray[i][j] != " ") {
                    nNonEmptyLines++;
                    break;
                }
            }
        }
    }

    let wordLengthTotal = 0;

    for (var k = 0; k <allWords.length; k++) {
        wordLengthTotal+= allWords[k].length;
    }
    let averageWordLength = wordLengthTotal/nWords;

    // Store all the lengths of all words in the array
    let arrayOfLengths = [];
    for (var l = 0; l < allWords.length; l++) {
        arrayOfLengths.push(allWords[l].length);
    }

    let maxLineLength = Math.max(...arrayOfLengths);

    let palindromes = [];

    for ( var i = 0; i < allWords.length; i++) {
        if (allWords[i].length > 2) {
            if (isAPalindrome(allWords[i])) {
                palindromes.push(allWords[i]);
            }
        }
    }

    // Sort palindromes to be in alphabetical order
    palindromes.sort(function(a, b){
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    // Obtain 10 longest words in text
    let longestWords = getLongestWords(allWords);

    allWords = txt.split(/[\n ]/);
    let mostFrequentWords = getMostFrequentWords(allWords);

    return {
        nChars: nChars,
        nWords: nWords,
        nLines: nLines  ,
        nNonEmptyLines: nNonEmptyLines,
        averageWordLength: parseFloat(averageWordLength).toFixed(2),
        maxLineLength: maxLineLength,
        palindromes: palindromes,
        longestWords: longestWords,
        mostFrequentWords: mostFrequentWords,
    };
}



