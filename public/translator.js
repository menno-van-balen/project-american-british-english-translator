import { americanOnly } from "./american-only.js";
import { americanToBritishSpelling } from "./american-to-british-spelling.js";
import { americanToBritishTitles } from "./american-to-british-titles.js";
import { britishOnly } from "./british-only.js";

// const longestDictionary = (ArrayOfDictionaries) => {
//   let length = 0;
//   ArrayOfDictionaries.forEach((dictionary) => {
//     console.log(Object.keys(dictionary).length);
//     const dictionaryLength = Object.keys(dictionary).length;
//     if (dictionaryLength > length) length = dictionaryLength;
//   });
//   return length;
// };
// //
// const length = longestDictionary([
//   americanOnly,
//   americanToBritishSpelling,
//   americanToBritishTitles,
//   britishOnly,
// ]);
// let dictionaryAmeBri = {};
// // dictionaryAmeBri[Object.keys(americanOnly)[0]] = Object.values(americanOnly)[0];
// for (let i = 0; i <= length; i++) {
//   if (Object.keys(americanOnly)[i]) {
//     dictionaryAmeBri[Object.keys(americanOnly)[i]] = Object.values(
//       americanOnly
//     )[i];
//   }
//   if (Object.keys(americanToBritishSpelling)[i]) {
//     dictionaryAmeBri[Object.keys(americanToBritishSpelling)[i]] = Object.values(
//       americanToBritishSpelling
//     )[i];
//   }
//   if (Object.keys(americanToBritishTitles)[i]) {
//     dictionaryAmeBri[Object.keys(americanToBritishTitles)[i]] = Object.values(
//       americanToBritishTitles
//     )[i];
//   }
//   if (Object.keys(britishOnly)[i]) {
//     dictionaryAmeBri[Object.values(britishOnly)[i]] = Object.keys(britishOnly)[
//       i
//     ];
//   }
// }
// console.log(dictionaryAmeBri);

// createCompleetDictionary takes in 2 arrays
// the first with American to Britisch ArrayOfDictionaries
// the second with Britisch to American
const createCompleetDictionary = (array_Am_Br, array_Br_Am) => {
  const dictionaryAmeBri = {};

  array_Am_Br.forEach((dictionary) => {
    Object.assign(dictionaryAmeBri, dictionary);
  });

  array_Br_Am.forEach((dictionary) => {
    const length = Object.keys(dictionary).length;
    for (let i = 0; i < length; i++) {
      dictionaryAmeBri[Object.values(dictionary)[i]] = Object.keys(dictionary)[
        i
      ];
    }
  });
  return dictionaryAmeBri;
};

const compleetDictionaryAm_Br = createCompleetDictionary(
  [americanOnly, americanToBritishSpelling, americanToBritishTitles],
  [britishOnly]
);
console.log(compleetDictionaryAm_Br.crosswalk);

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

const translate = (languagePair, text) => {
  console.log("languagePair: " + languagePair);
  console.log("text: " + text);
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
