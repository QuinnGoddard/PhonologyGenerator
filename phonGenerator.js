let selectedV = new Set()
let selectedC = new Set()
let coda = 0

// Generate list of selected vowels
function handleVowelClick(event) {
  selectedV.add(event.target.value)
  document.getElementById("vSelection").innerHTML = Array.from(selectedV)
}

// Generate list of selected consonants
function handleConsClick(event) {
  selectedC.add(event.target.value)
  document.getElementById("cSelection").innerHTML = Array.from(selectedC)
}

function handleCodaClick(event) {
  coda = 1
}

function run(event) {
  var listLength = document.getElementById("numWords").value
  var length = document.getElementById("wordlength").value
  let syll = ""
  if (coda == 1) {
    syll = "CVC"
  } else {
    syll = "CV"
  }
  wordList(listLength, Array.from(selectedV), Array.from(selectedC), length, syll)
}

/* var vowels = {
    "a": ["low"],
    "i": ["high"],
    "o": ["mid", "round"],
    "u": ["high", "round"],
    "e": ["mid"],
    "y": ["high", "round"]
};

var consonants = {
    "k": ["velar", "stop"],
    "g": ["velar", "voiced", "stop"],
    "p": ["bilabial","stop"],
    "b": ["bilabial", "voiced","stop"],
    "t": ["alveolar", "stop"],
    "d": ["alveolar", "voiced","stop"]
    "s": ["alveolar", "fricative"],
    "z": ["alveolar", "voiced","fricative"]
};
*/

/* Select a random phoneme from a set of phonemes */
function randomPhone(phonemes) {
    let phone = ""
    let num = Math.floor((Math.random() * phonemes.length))
    phone = phonemes[num]
    return phone
}

/* Make a syllable according to desired structure 
    syll: desired syllable structure (CV, CVC, CCVCC)
    c: set of consonants
    v: set of vowels
*/
function makeSyll(syll, c, v) {
    let syllable = ""
    if (syll == "CV") {
       syllable += randomPhone(c)
       syllable += randomPhone(v)
    } else if (syll == "CVC") {
       syllable += randomPhone(c)
       syllable += randomPhone(v)
       syllable += randomPhone(c)
    } else {
       syllable += randomPhone(c)
       syllable += randomPhone(c)
       syllable += randomPhone(v)
       syllable += randomPhone(c)
       syllable += randomPhone(c)
    }

    return syllable
}

/* Compose a word according to desired parameters:
    selectV: array of selected vowels
    selectC: array of selected consonants
    length: length of word (number of phonemes in word)
    syll: CV or CVC
*/
function makeWord(selectV, selectC, length, syll) {
    //var phonemes = selectV.concat(selectC);
    let word = ""
    let phone = ""
    
    // make a word with (C)V syllables
    if (syll == "CV") {
      if (length%2 == 0) {
        for (let i = 0; i < length/2; i++) {
          word+=makeSyll("CV")
        }
      } else {
        word += randomPhone(selectV)
        for (let i = 0; i < (length-1)/2; i++) {
          word+=makeSyll("CV")
        }
      }
    // make a word with CVC syllables
    } else if (syll == "CVC") {
      if (length%3 == 0) {
        for (let i = 0; i < length/3; i++) {
          word+=makeSyll("CVC")
        }
      // if not divisible by 3, initial syllable is V
      } else if (length%3 == 1) {
        word += randomPhone(selectV)
        for (let i = 0; i < length/3; i++) {
          word+=makeSyll("CVC")
        }
      // if not divisible by 3, initial syllable is CV
      } else {
        word+=makeSyll("CV")
        for (let i = 0; i < length/3; i++) {
          word+=makeSyll("CVC")
        }
      }
    }
    return word;      
}

/* Generate a list of words according to desired properties:
    n: number of words in word list
    selectV: array of selected vowels
    selectC: array of selected consonants
    length: length of word (number of phonemes in word)
    syll: syllable structure (either CV, CVC, or CCVCC)
*/
function wordList(n, selectV, selectC, length, syll) {
  var wordList = [];
  let word = "";
  for (let i = 0; i < n; i++) {
    word = makeWord(selectV, selectC, length, syll);
    wordList.push(word);
  }
  let listHTML = ""
  for (let i = 0; i < wordList.length; i++) {
    listHTML += wordList[i] + "<br>"
  }
  document.getElementById("list").innerHTML = listHTML

}

