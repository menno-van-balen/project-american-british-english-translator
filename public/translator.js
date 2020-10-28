import { americanOnly } from "./american-only.js";
import { americanToBritishSpelling } from "./american-to-british-spelling.js";
import { americanToBritishTitles } from "./american-to-british-titles.js";
import { britishOnly } from "./british-only.js";

// createCompleteDictionary takes in 2 arrays with dictionaries (objects)
// the first => American to British
// the second => British to American
// const createCompleteDictionary = (array_Am_Br, array_Br_Am) => {
//   const dictionaryAmeBri = {};

//   array_Am_Br.forEach((dictionary) => {
//     Object.assign(dictionaryAmeBri, dictionary);
//   });

//   array_Br_Am.forEach((dictionary) => {
//     const length = Object.keys(dictionary).length;
//     for (let i = 0; i < length; i++) {
//       dictionaryAmeBri[Object.values(dictionary)[i]] = Object.keys(dictionary)[
//         i
//       ];
//     }
//   });
//   return dictionaryAmeBri;
// };

// const dictionary_Am_Br = createCompleteDictionary(
//   [americanOnly, americanToBritishSpelling, americanToBritishTitles],
//   [britishOnly]
// );
// console.log(dictionary_Am_Br.crosswalk);

// get the languagePair
const localeSelect = document.getElementById("locale-select");

let languagePair = localeSelect.value;

localeSelect.addEventListener("change", () => {
  languagePair = localeSelect.value;
  // console.log("languagePair: " + languagePair);
});

const translateButton = document.getElementById("translate-btn");

const getText = () => {
  return document.getElementById("text-input").value;
};

const translatedSentenceDiv = document.getElementById("translated-sentence");

const translate = (languagePair, text) => {
  console.log("languagePair: " + languagePair);
  console.log("text: " + text);

  if (languagePair === "american-to-british") {
    const dictArray = [
      americanOnly,
      americanToBritishSpelling,
      americanToBritishTitles,
    ];
    dictArray.forEach((dictionary) => {
      for (const [american, british] of Object.entries(dictionary)) {
        text = text.replace(
          american,
          `<span class="highlight">${british}</span>`
        );
        text = text.replace(
          american.charAt(0).toUpperCase() + american.slice(1),
          `<span class="highlight">${
            british.charAt(0).toUpperCase() + british.slice(1)
          }</span>`
        );
      }
    });
  }
  if (languagePair === "british-to-american") {
    const dictArray = [americanToBritishSpelling, americanToBritishTitles];
    dictArray.forEach((dictionary) => {
      for (const [american, british] of Object.entries(dictionary)) {
        text = text.replace(
          british,
          `<span class="highlight">${american}</span>`
        );
        text = text.replace(
          british.charAt(0).toUpperCase() + british.slice(1),
          `<span class="highlight">${
            american.charAt(0).toUpperCase() + american.slice(1)
          }</span>`
        );
      }
    });

    for (const [british, american] of Object.entries(britishOnly)) {
      text = text.replace(
        british,
        `<span class="highlight">${american}</span>`
      );
      text = text.replace(
        british.charAt(0).toUpperCase() + british.slice(1),
        `<span class="highlight">${
          american.charAt(0).toUpperCase() + american.slice(1)
        }</span>`
      );
    }
  }
  console.log(text);
  translatedSentenceDiv.innerHTML = text;
};

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
