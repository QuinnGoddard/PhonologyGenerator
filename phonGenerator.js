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
  let harm = "none"
  let nasal = "none"
  let palatalization = "none"

  // Does user want syllables do have codas?
  if (document.getElementById("coda").checked) {
    syll = "CVC"
  } else {
    syll = "CV"
  }
  
  // Vowel harmony type
  if (document.getElementById("vHarmFront").checked) {
    harm = "front"
  } else if (document.getElementById("vHarmHeight").checked) {
    harm = "height"
  } else if (document.getElementById("vHarmRound").checked) {
    harm = "round"
  }
  
  // Nasal assimilation
  if (document.getElementById("nasalAssimProg").checked) {
    nasal = "nasal"
  }
  
  // Palatalization
  if (document.getElementById("palatalization").checked) {
    palatalization = "palatalization"
  } 
  wordList(listLength, Array.from(selectedV), Array.from(selectedC), length, syll, harm, nasal, palatalization)
}


const vowels = {
  a: { label: "a", height: "low", front: "front", round: "unround", nasal: "ã" },
  i: { label:"i", height: "high", front: "front", round: "unround",  nasal: "ĩ" },
  y: { label:"y", height: "high", front: "front", round: "round", nasal: "ỹ" },
  o: { label:"o", height: "mid", front: "back", round: "round", nasal: "õ" },
  u: { label:"u", height: "high",front: "back", round: "round", nasal: "ũ" },
  e: { label:"e", height: "mid", front:"front", round: "unround", nasal: "ẽ" },  
  ɑ: { label:"ɑ", height: "low", front:"back", round: "unround", nasal: "ɑ̃" }, 
  æ: { label:"æ", height: "low", front:"front", round: "unround", nasal: "æ̃" }, 
  ɪ: { label:"ɪ", height: "high", front:"front", round: "unround", nasal: "ɪ̃" }, 
  ɛ: { label:"ɛ", height: "mid", front:"front", round: "unround", nasal: "ɛ̃" }, 
  ɔ: { label:"ɔ", height: "mid", front:"back", round: "round", nasal: "ɔ̃" }, 
  ʏ: { label:"ʏ", height: "high", front:"front", round: "round", nasal: "ʏ̃" },
  œ: { label:"œ", height: "mid", front:"front", round: "round", nasal: "œ̃" },
  ø: { label:"ø", height: "mid", front:"front", round: "round", nasal: "ø̃" },
  ɒ: { label:"ɒ", height: "low", front:"back", round: "round", nasal: "ɒ̃" },
}


const consonants = {
    k: { label: "k", type: "stop", place: "velar", voicing: "vcls", nasal: "oral"},
    g: { label: "g", type: "stop", place: "velar", voicing: "vcd", nasal: "oral"},
    p: { label: "p", type: "stop", place: "bilabial", voicing: "vcls", nasal: "oral"},
    b: { label: "b", type: "stop", place: "bilabial", voicing: "vcd", nasal: "oral"},
    t: { label: "t", type: "stop", place: "alveolar", voicing: "vcls", nasal: "oral"},
    d: { label: "d", type: "stop", place: "alveolar", voicing: "vcd", nasal: "oral"},
    m: { label: "m", type: "stop", place: "bilabial", voicing: "vcd", nasal: "nasal"},
    n: { label: "n", type: "stop", place: "alveolar", voicing: "vcd", nasal: "nasal"},
    ŋ: { label: "ŋ", type: "stop", place: "velar", voicing: "vcd", nasal: "nasal"},
    s: { label: "s", type: "fricative", place: "alveolar", voicing: "vcls", nasal: "oral"},
    z: { label: "z", type: "fricative", place: "alveolar", voicing: "vcd", nasal: "oral"},
    ʃ: { label: "ʃ", type: "fricative", place: "palatal", voicing: "vcls", nasal: "oral"},
    ʒ: { label: "ʒ", type: "fricative", place: "palatal", voicing: "vcd", nasal: "oral"},
    f: { label: "f", type: "fricative", place: "labiodental", voicing: "vcls", nasal: "oral"},
    v: { label: "v", type: "fricative", place: "labiodental", voicing: "vcd", nasal: "oral"},
    θ: { label: "θ", type: "fricative", place: "interdental", voicing: "vcls", nasal: "oral"},
    ð: { label: "ð", type: "fricative", place: "interdental", voicing: "vcd", nasal: "oral"},
};

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
function makeSyll(syll, c, v, nasal, palatalization) {
    let onset = ""
    let nucleus = ""
    let syllable = ""
    // generate onset
    onset = randomPhone(c)      
    nucleus = randomPhone(v)
    if (palatalization=="palatalization" && nucleus=="i" && onset=="k") {
      syllable += "t͡ʃ"
     } else {
       syllable += onset
     }
     if (nasal == "nasal" && consonants[onset].nasal == "nasal") {
        syllable += vowels[nucleus].nasal
     } else {
        syllable += nucleus
    }
  
    // add coda if CVC structure
    if (syll == "CVC") {
       syllable += randomPhone(c)
    }
    return syllable
}

/* Compose a word according to desired parameters:
    selectV: array of selected vowels
    selectC: array of selected consonants
    length: length of word (number of phonemes in word)
    syll: CV or CVC
    nasal: progressive nasal assimilation (none or nasalization)
    palatalization: none or k > ts/_i
*/
function makeWord(selectV, selectC, length, syll, harm, nasal, palatalization) {
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
          word+=makeSyll("CV", selectC, workingVowels, nasal, palatalization)
        }
      } else {
        word += randomPhone(workingVowels)
        for (let i = 0; i < (length-1)/2; i++) {
          word+=makeSyll("CV", selectC, workingVowels, nasal, palatalization)
        }
      }
    // make a word with CVC syllables
    } else if (syll == "CVC") {
      if (length%3 == 0) {
        for (let i = 0; i < length/3; i++) {
          word+=makeSyll("CVC", selectC, workingVowels, nasal, palatalization)
        }
      // if not divisible by 3, initial syllable is V
      } else if (length%3 == 1) {
        word += randomPhone(workingVowels)
        for (let i = 0; i < length/3; i++) {
          word+=makeSyll("CVC", selectC, workingVowels, nasal, palatalization)
        }
      // if not divisible by 3, initial syllable is CV
      } else {
        word+=makeSyll("CV", selectC, workingVowels, nasal)
        for (let i = 0; i < length/3; i++) {
          word+=makeSyll("CVC", selectC, workingVowels, nasal, palatalization)
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
    nasal: none or progressive
*/
function wordList(n, selectV, selectC, length, syll, harm, nasal, palatalization) {
  var wordList = [];
  let word = "";
  for (let i = 0; i < n; i++) {
    word = makeWord(selectV, selectC, length, syll, harm, nasal, palatalization);
    wordList.push(word);
  }
  let listHTML = ""
  for (let i = 0; i < wordList.length; i++) {
    listHTML += wordList[i] + "<br>"
  }
  document.getElementById("list").innerHTML = listHTML

}

