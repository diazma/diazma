//
// this is just a stub for a function you need to implement
//
function isAPalindrome(word){
    // Reverse string
    let reverseWord = word.toLowerCase().split('').reverse().join('');
    // Compare word vs reverse word
    return word.toLowerCase() === reverseWord;
}

function getAllWords(txt) {
    let allWords = txt.split(/[\s+\n+.,\/#!?"'$%\^&\*;:{}=\-_`~()]/g);
    let cleanWords = [];
    let numberOfWords = 0;
    let emptyWords = 0;
    for (var i = 0; i < allWords.length; i++) {
        allWords[i] = allWords[i].toLowerCase().replace(/[\s+]/g,"");
        if (allWords[i] !== "") {
            cleanWords.push(allWords[i].replace(/[.,\/#!?"'$%\^&\*;:{}=\-_`~()]/g, ""));
        }
    }
    return cleanWords;
}

function getUniqueWords(words) {
    let uniqueWords = [];

    for (var i = 0; i < words.length; i++) {
        // If word does not exist in uniqueWords, add it to the array
        if (uniqueWords.indexOf(words[i]) === -1) {
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
    let lengthWords = {};
    let maxLength = 0;
    let longestWord = null;
    let lengthArray = [];

    // Create dictionary with unique words and their lengths
    for (var i = 0; i < words.length; i++) {
        let currentWord = words[i].toLowerCase();
        lengthWords[currentWord] = currentWord.length;
    }

    for (var i = 0; i < 10; i++) {
        // Find the most frequent word in array
        if (Object.keys(lengthWords).length > 0) {
            for (word in lengthWords ) {
                if (lengthWords[word] > maxLength) {
                    maxLength = lengthWords[word];
                    longestWord = word;
                }
            }
            // Remove the most frequent word and reset maxNumber for next iteration
            delete lengthWords[longestWord];
            lengthArray.push(longestWord);
            maxLength = 0;
        }
    }
    return lengthArray;
}

function getMostFrequentWords(allWords) {
    // Remove empty words
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

    // Setup variables for the loop.
    let maxNumber = 0;
    let mostFrequentWord = null;
    let frequencyArray = [];

    for (var i = 0; i < 10; i++) {
        // Find the most frequent word in array
        if (Object.keys(frequency).length > 0) {
            for (word in frequency ) {
                if (frequency[word] > maxNumber && word !== "") {
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
    return frequencyArray;
}

function stripPunctuation(word) {

}
function getPalindromes(allWords) {
    // Obtain palindromes
    let palindromes = [];

    for ( var i = 0; i < allWords.length; i++) {
        if (allWords[i].length > 2) {
            if (isAPalindrome(allWords[i])) {
                palindromes.push(allWords[i]);
            }
        }
    }
    return palindromes;
}


function getStats(txt) {

    // Get number of chars
    let nChars = txt.length;
    // Obtain all lines
    let allLines = txt.split("\n");
    // Get number of words
    let allWords = getAllWords(txt);
    let nWords = allWords.length;
    let nLines = txt.split("\n").length;
    if (nLines == 1 && txt == "") nLines = 0;
    let linesArray = txt.split("\n");
    let nNonEmptyLines = 0;
    let emptyLines = 0;
    for (var i = 0; i< linesArray.length; i++){
        linesArray[i] = linesArray[i].replace(/[\s+]/g, "");
        if (linesArray[i] !== "") {
            nNonEmptyLines++;
        }
    }

    let wordLengthTotal = 0;
    for (var k = 0; k <allWords.length; k++) {
        wordLengthTotal+= allWords[k].length;
    }
    let averageWordLength = wordLengthTotal/nWords;

    // Store all the lengths of all words in the array
    let arrayOfLengths = [];
    for (var l = 0; l < allLines.length; l++) {
        arrayOfLengths.push(allLines[l].length);
    }
    let maxLineLength = Math.max(...arrayOfLengths);

    let palindromes = getPalindromes(allWords);

    // Alphabetic order of all words
    allWords = allWords.sort(function(a, b){
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    // Obtain 10 longest words in text
    let longestWords = getLongestWords(allWords);
    allWords = getAllWords(txt);
    allWords.sort(function(a, b){
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    // Obtain 10 most frequent words
    let mostFrequentWords = getMostFrequentWords(allWords);

    return {
        nChars: nChars,
        nWords: nWords,
        nLines: nLines  ,
        nNonEmptyLines: nNonEmptyLines,
        averageWordLength: averageWordLength,
        maxLineLength: maxLineLength,
        palindromes: palindromes,
        longestWords: longestWords,
        mostFrequentWords: mostFrequentWords,
    };
}



