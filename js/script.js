const generatePassword = () => {
  const lunPass = document.getElementById("passlen").value;
  const lowerLetter = document.getElementById("lower").checked;
  const upperLetter = document.getElementById("upper").checked;
  const numLetter = document.getElementById("numbers").checked;
  const symLetter = document.getElementById("symbols").checked;

  const el = [];
  let numberOfCharacters = 0;

  if (lowerLetter) {
    el.push("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
    numberOfCharacters = 26;
  }
  if (upperLetter) {
    el.push("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
    numberOfCharacters += 26;
  }
  if (numLetter) {
    el.push("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
    numberOfCharacters += 10;
  }
  if (symLetter) {
    el.push("!", "\"", "£", "$", "%", "&", "/", "(", ")", "=", "?", "^", "'", "*", "+", "-", "_", ".", ":", ",", ";", ".", ":");
    numberOfCharacters += 23;
  }

  let password = "";

  for (let i = 0; i < lunPass; i++) {
    const randomNumber = Math.floor(Math.random() * numberOfCharacters);
    password += el[randomNumber];
  }

  const pasText = document.getElementById("pasText");
  pasText.value = password;
  pasText.className = "show";

  pasText.select();
  document.execCommand("copy");

  const copied = document.getElementById("copied");
  copied.style.display = "block";
  setTimeout(() => {
    copied.style.display = "none";
  }, 1000);
};

const el = document.getElementById("genepass");
el.addEventListener("click", generatePassword, false);
