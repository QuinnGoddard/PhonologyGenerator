let selectedV = new Set()
let selectedC = new Set()

function handleVowelClick(event) {
  selectedV.add(event.target.value)
  document.getElementById("vSelection").innerHTML = Array.from(selectedV)
}

function handleConsClick(event) {
  selectedC.add(event.target.value)
  document.getElementById("cSelection").innerHTML = Array.from(selectedC)
}

function run(event) {
  console.log("pressed")
  wordList(4, Array.from(selected), ['k'], 3)
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

function makeWord(selectV, selectC, length) {
    var phonemes = selectV.concat(selectC);
    console.log("makeWord:", selectV, selectC, length)
    let word = "";
    let phone = "";
    for (let i = 0; i < length; i++) {
      let num = Math.floor((Math.random() * phonemes.length))
      console.log("num", num)
      phone = phonemes[num];
      word += phone;     
    };
    return word;      
}

function wordList(n, selectV, selectC, length) {
  var wordList = [];
  let word = "";
  for (let i = 0; i < n; i++) {
    word = makeWord(selectV, selectC, length);
    console.log("word" + word)
    wordList.push(word);
  }
  let listHTML = ""
  for (let i = 0; i < wordList.length; i++) {
    listHTML += wordList[i] + "<br>"
  }
  document.getElementById("list").innerHTML = listHTML

}

