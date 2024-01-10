/* eslint-disable no-undef */
async function getCurTab() {
  return (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
}

function saveInRefsBib(text) {
  switchToRefsBib();

  setTimeout(() => {
    changeEditorText(text);
  }, 1000); // Timeout Important

  function switchToRefsBib() {
    let button = findRefsBibButton();
    if (!button) {
      console.log("No Button found!");
      return;
    }

    button.click(); //switch to refs.bib editing
  }

  // Finds a button with a child span with inner html = refs.bib
  function findRefsBibButton() {
    let spanElements = document.querySelectorAll("button > span");

    for ([_, node] of spanElements.entries()) {
      if (node.innerText.includes(".bib")) {
        return node.parentNode;
      }
    }
  }

  function changeEditorText(text) {
    document.getElementsByClassName("cm-content cm-lineWrapping")[0].innerHTML =
      text;
  }
}

export async function main(text, callback) {
  let curTab = await getCurTab();

  // execute Script in active tab
  await chrome.scripting.executeScript({
    target: { tabId: curTab.id },
    func: saveInRefsBib,
    args: [text],
  });
  setTimeout(callback, 1000);
}
