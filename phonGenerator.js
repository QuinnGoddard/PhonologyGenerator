function handleClick(event) {
  console.log(event)
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
    let word = "";
    let phone = "";
    for (let i = 0; i < length; i++) {
      let num = Math.floor((Math.random() * phonemes.length-1) +0);
      phone = phonemes.indexOf(num);
      word.concat(phone);     
      };
    return word;      
}

function wordList(n, selectV, selectC, length) {
  var wordList = [];
  let word = "";
  for (let i = 0; i < n; i++) {
    word = makeWord(selectV, selectC, length);
    wordList.push(word);
  }
  return wordList;
}
