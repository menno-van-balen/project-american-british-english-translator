/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require("chai");
const assert = chai.assert;

let Translator;

suite("Functional Tests", () => {
  suiteSetup(() => {
    // DOM already mocked -- load translator then run tests
    Translator = require("../public/translator.js");
  });

  suite("Function ____()", () => {
    /* 
      The translated sentence is appended to the `translated-sentence` `div`
      and the translated words or terms are wrapped in 
      `<span class="highlight">...</span>` tags when the "Translate" button is pressed.
    */
    test("Translation appended to the `translated-sentence` `div`", (done) => {
      const input = "Like a high tech Rube Goldberg machine.";
      const output = `Like a high tech <span class="highlight">Heath Robinson device</span>.`;

      const result = Translator.translateText("american-to-british", input);
      assert.equal(result, output);

      done();
    });

    /* 
      If there are no words or terms that need to be translated,
      the message 'Everything looks good to me!' is appended to the
      `translated-sentence` `div` when the "Translate" button is pressed.
    */
    test("'Everything looks good to me!' message appended to the `translated-sentence` `div`", (done) => {
      const input = "This looks good.";
      const output = `Everything looks good to me!`;

      const result = Translator.translateText("american-to-british", input);
      assert.equal(result, output);

      done();
    });

    /* 
      If the text area is empty when the "Translation" button is
      pressed, append the message 'Error: No text to translate.' to 
      the `error-msg` `div`.
    */
    test("'Error: No text to translate.' message appended to the `translated-sentence` `div`", (done) => {
      const input = "";
      const output = `Error: No text to translate.`;

      const result = Translator.translateText("american-to-british", input);
      assert.equal(result, output);

      done();
    });
  });

  suite("Function ____()", () => {
    /* 
      The text area and both the `translated-sentence` and `error-msg`
      `divs` are cleared when the "Clear" button is pressed.
    */
    test("Text area, `translated-sentence`, and `error-msg` are cleared", (done) => {
      const textInput = document.getElementById("text-input");
      const translatedSentenceDiv = document.getElementById(
        "translated-sentence"
      );
      const errorMsgDiv = document.getElementById("error-msg");
      const clearButton = document.getElementById("clear-btn");
      clearButton.addEventListener("click", () => {
        textInput.value = "";
        translatedSentenceDiv.innerText = "";
        errorMsgDiv.innerText = "";
      });

      clearButton.click();

      assert.equal(textInput.value, "");
      assert.equal(translatedSentenceDiv.innerText, "");
      assert.equal(errorMsgDiv.innerText, "");

      done();
    });
  });
});
