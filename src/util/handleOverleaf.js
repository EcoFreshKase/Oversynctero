/* eslint-disable no-undef */
async function getCurTab() {
  return (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
}

function saveInRefsBib(text) {
  if (!switchToRefsBib()) {
    console.log("Switching to refs.bib failed");
    createPopUp(
      "Switching to .bib file failed. There might not be a .bib file in the project."
    );
    return;
  }

  setTimeout(() => {
    changeEditorText(text);
  }, 1000); // Timeout Important

  function switchToRefsBib() {
    let button = findRefsBibButton();
    if (!button) {
      return false;
    }

    button.click(); //switch to refs.bib editing
    return true;
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

  function createPopUp(text) {
    let popUp = document.createElement("p");
    popUp.innerHTML = text;
    popUp.className = "pop-up";
    document.body.appendChild(popUp);

    setTimeout(() => {
      popUp.style.animationName = "oversynctero-fade-out";
      setTimeout(() => popUp.remove(), 300);
    }, 4000);
  }
}

export async function main(text, callback) {
  let curTab = await getCurTab();

  await chrome.scripting.insertCSS({
    files: ["errorPopUpStyle.css"],
    target: { tabId: curTab.id },
  });

  // execute Script in active tab
  await chrome.scripting.executeScript({
    target: { tabId: curTab.id },
    func: saveInRefsBib,
    args: [text],
  });
  setTimeout(callback, 1000);
}
