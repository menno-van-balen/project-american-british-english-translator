import { americanOnly } from "./american-only.js";
import { americanToBritishSpelling } from "./american-to-british-spelling.js";
import { americanToBritishTitles } from "./american-to-british-titles.js";
import { britishOnly } from "./british-only.js";

// get html elements
const localeSelect = document.getElementById("locale-select");
const translateButton = document.getElementById("translate-btn");
const textInput = document.getElementById("text-input");
const translatedSentenceDiv = document.getElementById("translated-sentence");
const errorMsgDiv = document.getElementById("error-msg");
const clearButton = document.getElementById("clear-btn");

// set the languagePair on page load
let languagePair = localeSelect.value;

// eventlisteners:
localeSelect.addEventListener("change", () => {
  languagePair = localeSelect.value;
});

translateButton.addEventListener("click", () => {
  const text = textInput.value;
  translate(languagePair, text);
});

clearButton.addEventListener("click", () => {
  textInput.value = "";
  translatedSentenceDiv.innerText = "";
  errorMsgDiv.innerText = "";
});

// translate function
function translate(languagePair, text) {
  // first reset previous translations messages:
  errorMsgDiv.innerText = "";

  const sourceText = text;
  const startWithCapital = /^[A-Z]/;

  // handle no text
  if (!text) {
    return (errorMsgDiv.innerText = "Error: No text to translate.");
  }

  if (languagePair === "american-to-british") {
    const dictArray = [americanOnly, americanToBritishSpelling];
    dictArray.forEach((dictionary) => {
      for (let [american, british] of Object.entries(dictionary)) {
        // make a regex to be able to use wordboundary else you will replace also parts of words
        const americanReg = new RegExp(`\\b${american}\\b`, "gi");
        // handle words starting with a capital
        const word = text.match(americanReg);
        if (word && startWithCapital.test(word[0])) {
          british = british.charAt(0).toUpperCase() + british.slice(1);
        }
        // make the translation
        text = text.replace(
          americanReg,
          `<span class="highlight">${british}</span>`
        );
      }
      // bacouse of dots in american titles you cannot use regexes
      for (const [american, british] of Object.entries(
        americanToBritishTitles
      )) {
        text = text.replace(
          american,
          `<span class="highlight">${british}</span>`
        );
        // handle titles starting with a capital
        text = text.replace(
          `${american.charAt(0).toUpperCase() + american.slice(1)}`,
          `<span class="highlight">${
            british.charAt(0).toUpperCase() + british.slice(1)
          }</span>`
        );
      }
    });
  } else {
    for (let [british, american] of Object.entries(britishOnly)) {
      const britishReg = new RegExp(`\\b${british}\\b`, "gi");

      const word = text.match(britishReg);
      if (word && startWithCapital.test(word[0])) {
        american = american.charAt(0).toUpperCase() + american.slice(1);
      }

      text = text.replace(
        britishReg,
        `<span class="highlight">${american}</span>`
      );
    }

    const dictArray = [americanToBritishSpelling, americanToBritishTitles];
    dictArray.forEach((dictionary) => {
      // (british titles don't have dots so regexes are possible)
      for (let [american, british] of Object.entries(dictionary)) {
        const britishReg = new RegExp(`\\b${british}\\b`, "gi");

        const word = text.match(britishReg);
        if (word && startWithCapital.test(word[0])) {
          american = american.charAt(0).toUpperCase() + american.slice(1);
        }

        text = text.replace(
          britishReg,
          `<span class="highlight">${american}</span>`
        );
      }
    });
  }

  // handle time
  const timeRegex = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:|\.)([0-5][0-9]))/g;
  const times = text.match(timeRegex);
  if (times) {
    times.forEach((time) => {
      if (languagePair === "american-to-british" && time.includes(":")) {
        const newTime = time.replace(":", ".");
        text = text.replace(time, `<span class='highlight'>${newTime}</span>`);
      }
      if (languagePair === "british-to-american" && time.includes(".")) {
        const newTime = time.replace(".", ":");
        text = text.replace(time, `<span class='highlight'>${newTime}</span>`);
      }
    });
  }

  // handle correct output
  if (sourceText === text) {
    translatedSentenceDiv.innerHTML = "Everything looks good to me!";
  } else {
    translatedSentenceDiv.innerHTML = text;
  }
}

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {};
} catch (e) {}
