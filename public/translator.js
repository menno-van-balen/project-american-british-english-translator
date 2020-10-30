import { americanOnly } from "./american-only.js";
import { americanToBritishSpelling } from "./american-to-british-spelling.js";
import { americanToBritishTitles } from "./american-to-british-titles.js";
import { britishOnly } from "./british-only.js";

// get the languagePair
const localeSelect = document.getElementById("locale-select");

let languagePair = localeSelect.value;

localeSelect.addEventListener("change", () => {
  languagePair = localeSelect.value;
});

const translateButton = document.getElementById("translate-btn");

const getText = () => {
  return document.getElementById("text-input").value;
};

const translatedSentenceDiv = document.getElementById("translated-sentence");

function translate(languagePair, text) {
  const sourceText = text;
  // console.log("languagePair: " + languagePair);
  // console.log("text: " + text);
  const startWithCapital = /^[A-Z]/;

  if (languagePair === "american-to-british") {
    const dictArray = [americanOnly, americanToBritishSpelling];
    dictArray.forEach((dictionary) => {
      for (let [american, british] of Object.entries(dictionary)) {
        const americanReg = new RegExp(`\\b${american}\\b`, "gi");
        const word = text.match(americanReg);
        if (word && startWithCapital.test(word[0])) {
          british = british.charAt(0).toUpperCase() + british.slice(1);
        }
        text = text.replace(
          americanReg,
          `<span class="highlight">${british}</span>`
        );
      }
      for (const [american, british] of Object.entries(
        americanToBritishTitles
      )) {
        text = text.replace(
          american,
          `<span class="highlight">${british}</span>`
        );
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

  if (sourceText === text) {
    translatedSentenceDiv.innerHTML = "Everything looks good to me!";
  } else {
    // console.log("innerHTML:", text);
    translatedSentenceDiv.innerHTML = text;
  }
}

translateButton.addEventListener("click", () => {
  const text = getText();
  translate(languagePair, text);
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {};
} catch (e) {}
