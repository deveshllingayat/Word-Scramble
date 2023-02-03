const wordText = document.querySelector(".word");
hintText = document.querySelector(".hint span");
timerText = document.querySelector(".time b");

refreshBtn = document.querySelector(".refresh-word");
checkBtn = document.querySelector(".check-word");
Input = document.querySelector(".content input");

let correctWord, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timerText.innerText = maxTime);
    }
    alert(`Time off! ${correctWord.toUpperCase()} was the correct word!`);
    initGame();
  }, 1000);
};

const initGame = () => {
  initTimer(30);
  let randomObj = words[Math.floor(Math.random() * words.length)]; //getting random objects from words
  let wordArray = randomObj.word.split(""); //splitting each letter of word
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); //getting random number
    //shuffling and swiping word array letters randomly
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  correctWord = randomObj.word.toLowerCase();
  Input.value = "";
  Input.setAttribute("maxlength", correctWord.length); //setting inputs max length attribute to the length of given word
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
};
const checkWord = () => {
  let userWord = Input.value.toLowerCase();
  //if input field is empty
  if (!userWord) return alert(`Please enter a word!`);
  //if the entered word do not matches with given word return a messege
  if (correctWord != userWord) {
    return alert(`Oops! ${userWord} is not correct word, try again!`);
  }
  //if above two conditions failed then user wins
  alert(`Congrats! ${userWord} is a correct word!`);
  initGame();
};
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
initGame();
