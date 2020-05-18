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
  if (document.getElementById("coda").checked) {
    syll = "CVC"
  } else {
    syll = "CV"
  }
  wordList(listLength, Array.from(selectedV), Array.from(selectedC), length, syll, harm)
}

// Constructor for vowels
function Vowel(label, height, front, round) {
    this.label = label;
    this.height = height;
    this.front = front;
    this.round = round;
}

// Constructor for consonants
function Consonant(label, type, place, voicing, nasality) {
    this.label = label;
    this.type = type;
    this.place = place;
    this.voicing = voicing;
    this.nasality = nasality;
}

var vowels = [
    var a = new Vowel("a", "low", "front", "unround"),
    var i = new Vowel("i", "high", "front", "unround"),
    var y = new Vowel("y", "high", "front", "round"),
    var o = new Vowel("o", "mid", "back", "round"),
    var u = new Vowel("u", "high", "back", "round"),
    var e = new Vowel("e", "mid", "front", "unround")   
];

var consonants = {
    var k = new Consonant("k", "stop", "velar", "vcls", "oral"],
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

/* Returns array of vowels which harmonize
    harmType: type of vowel harmony (front, round, height)
    v: list of vowels selected by user
    initVowel: first vowel in the word whose properties subsequent vowels must match
*/
function harmonicVowels(harmType, v, initVowel) {
    // sets feature that other vowels filtered by
    let feature = initVowel.harmType
    let harmVowels = new Set()
    for (let i = 0, i < v.length, i++) {
      // ex. if VOWEL.front == "front"
      if (v[i].harmType == feature) {
          v.add(v[i].label)
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
function makeWord(selectV, selectC, length, syll) {
    //var phonemes = selectV.concat(selectC);
    let word = ""
    let phone = ""
    
    // make a word with (C)V syllables
    if (syll == "CV") {
      if (length%2 == 0) {
        for (let i = 0; i < length/2; i++) {
          word+=makeSyll("CV", selectC, selectV)
        }
      } else {
        word += randomPhone(selectV)
        for (let i = 0; i < (length-1)/2; i++) {
          word+=makeSyll("CV", selectC, selectV)
        }
      }
    // make a word with CVC syllables
    } else if (syll == "CVC") {
      if (length%3 == 0) {
        for (let i = 0; i < length/3; i++) {
          word+=makeSyll("CVC", selectC, selectV)
        }
      // if not divisible by 3, initial syllable is V
      } else if (length%3 == 1) {
        word += randomPhone(selectV)
        for (let i = 0; i < length/3; i++) {
          word+=makeSyll("CVC", selectC, selectV)
        }
      // if not divisible by 3, initial syllable is CV
      } else {
        word+=makeSyll("CV", selectC, selectV)
        for (let i = 0; i < length/3; i++) {
          word+=makeSyll("CVC", selectC, selectV)
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

