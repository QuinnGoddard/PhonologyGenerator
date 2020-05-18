let selectedV = new Set()
let selectedC = new Set()

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


function run(event) {
  var listLength = document.getElementById("numWords").value
  var length = document.getElementById("wordlength").value
  let syll = ""
  let harm = ""
  if (document.getElementById("coda").checked) {
    syll = "CVC"
  } else {
    syll = "CV"
  }
  if (document.getElementById("vHarmFront").checked) {
    harm = "front"
  } else if (document.getElementById("vHarmHeight").checked) {
    harm = "height"
  } else if (document.getElementById("vHarmRound").checked) {
    harm = "round"
  } else {
    harm = "none"
  }
  wordList(listLength, Array.from(selectedV), Array.from(selectedC), length, syll, harm)
}


const vowels = {
  a: { label: "a", height: "low", front: "front", round: "unround" },
  i: { label:"i", height: "high", front: "front", round: "unround" },
  y: { label:"y", height: "high", front: "front", round: "round" },
  o: { label:"o", height: "mid", front: "back", round: "round" },
  u: { label:"u", height: "high",front: "back", round: "round" },
  e: { label:"e", height: "mid", front:"front", round: "unround" }  
}

/*
const consonants = {
    k: { label: "k", type: "stop", place: "velar", voicing: "vcls", nasal: "oral"},
    var g = new Consonant("g", "stop", "velar", "vcd","oral"],
    var t = new Consonant("t", "stop", "alveolar", "vcls", "oral"],
    var d = new Consonant("d", "stop", "alveolar", "vcd", "oral"],
    var p = new Consonant("p", "stop", "bilabial", "vcls", "oral"],
    var b = new Consonant("b", "stop", "bilabial", "vcd", "oral"],
    var m = new Consonant("m", "stop", "bilabial", "vcd", "nasal"],
    var n = new Consonant("n", "stop", "alveolar", "vcd", "nasal"],
    var s = new Consonant("s", "fricative", "alveolar", "vcls", "oral"],
    var z = new Consonant("z", "fricative", "alveolar", "vcd", "oral"],
};
*/
/* Returns array of vowels which harmonize
    harmType: type of vowel harmony (front, round, height)
    v: list of vowels selected by user
    initVowel: (string) first vowel in the word whose properties subsequent vowels must match
*/
function harmonicVowels(harmType, v, initVowel) {
    // sets feature that other vowels filtered by
    let feature = vowels[initVowel][harmType]
    let harmVowels = []
    for (let i = 0; i < v.length; i++) {
      // ex. if VOWEL.front == "front"
      if (vowels[v[i]][harmType] == feature) {
          harmVowels.push(v[i])
      } 
    }
    return harmVowels   
}


/* Select a random phoneme from a set of phonemes */
function randomPhone(phonemes) {
    var length = phonemes.length
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
function makeWord(selectV, selectC, length, syll, harm) {
    let word = ""
    let initVowel = ""
    let workingVowels = []
    
    if (harm != "none") {
      initVowel = randomPhone(selectV)
      workingVowels = harmonicVowels(harm, selectV, initVowel)
    } else {
      workingVowels = selectV
    }
    
    // make a word with (C)V syllables
    if (syll == "CV") {
      if (length%2 == 0) {
        for (let i = 0; i < length/2; i++) {
          word+=makeSyll("CV", selectC, workingVowels)
        }
      } else {
        word += randomPhone(workingVowels)
        for (let i = 0; i < (length-1)/2; i++) {
          word+=makeSyll("CV", selectC, workingVowels)
        }
      }
    // make a word with CVC syllables
    } else if (syll == "CVC") {
      if (length%3 == 0) {
        for (let i = 0; i < length/3; i++) {
          word+=makeSyll("CVC", selectC, workingVowels)
        }
      // if not divisible by 3, initial syllable is V
      } else if (length%3 == 1) {
        word += randomPhone(workingVowels)
        for (let i = 0; i < length/3; i++) {
          word+=makeSyll("CVC", selectC, workingVowels)
        }
      // if not divisible by 3, initial syllable is CV
      } else {
        word+=makeSyll("CV", selectC, workingVowels)
        for (let i = 0; i < length/3; i++) {
          word+=makeSyll("CVC", selectC, workingVowels)
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
    harm: vowel harmony (none, front, round, height)
*/
function wordList(n, selectV, selectC, length, syll, harm) {
  var wordList = [];
  let word = "";
  for (let i = 0; i < n; i++) {
    word = makeWord(selectV, selectC, length, syll, harm);
    wordList.push(word);
  }
  let listHTML = ""
  for (let i = 0; i < wordList.length; i++) {
    listHTML += wordList[i] + "<br>"
  }
  document.getElementById("list").innerHTML = listHTML

}

