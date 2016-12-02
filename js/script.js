"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const passLen = document.getElementById("passlen");
  const lowerLetter = document.getElementById("lower");
  const upperLetter = document.getElementById("upper");
  const numLetter = document.getElementById("numbers");
  const symLetter = document.getElementById("symbols");
  const pasText = document.getElementById("pasText");

  const generatePassword = () => {
    const lunPass = Number(passLen.value);

    const el = [];
    let numberOfCharacters = 0;

    if (lowerLetter.checked) {
      el.push("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
      numberOfCharacters = 26;
    }
    if (upperLetter.checked) {
      el.push("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
      numberOfCharacters += 26;
    }
    if (numLetter.checked) {
      el.push("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
      numberOfCharacters += 10;
    }
    if (symLetter.checked) {
      el.push("!", "\"", "£", "$", "%", "&", "/", "(", ")", "=", "?", "^", "'", "*", "+", "-", "_", ".", ":", ",", ";", ".", ":");
      numberOfCharacters += 23;
    }

    let password = "";

    for (let i = 0; i < lunPass; i++) {
      const randomNumber = Math.floor(Math.random() * numberOfCharacters);
      password += el[randomNumber] || "";
    }

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

  const genPassBtn = document.getElementById("genePass");
  genPassBtn.addEventListener("click", generatePassword);

  const disabledButton = () => {
    if (!lowerLetter.checked && !upperLetter.checked && !numLetter.checked && !symLetter.checked) {
      genPassBtn.setAttribute("disabled", "");
    } else if (passLen.value === "") {
      genPassBtn.setAttribute("disabled", "");
    } else {
      genPassBtn.removeAttribute("disabled");
    }
  };

  const checkBox = document.querySelectorAll("input[type='checkbox'], input[type='number']");

  Array.from(checkBox).forEach(list => {
    list.addEventListener("change", disabledButton);
  });
});
