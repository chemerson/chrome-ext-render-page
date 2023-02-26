// runs in context of the extension window

const sendMessageButton = document.getElementById("ufg");
sendMessageButton.onclick = async function (e) {
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  console.log("UFG-CHROME-EXTENSION: sending message from eyes.js");
  chrome.tabs.sendMessage(
    tabs[0].id,
    { msg: "capturepage" },
    function (response) {
      try {
        console.log(response.result);
      } catch (e) {
        console.log(e);
      }

      ufg.innerHTML = response.result;

    }
  );
};

const sendMessageDiffButton = document.getElementById("ufgdiff");
sendMessageDiffButton.onclick = async function (e) {
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  console.log("UFG-CHROME-EXTENSION: sending message from eyes.js");
  chrome.tabs.sendMessage(
    tabs[0].id,
    { msg: "capturepagediff" },
    function (response) {
      try {
        console.log(response.result);
      } catch (e) {
        console.log(e);
      }

      ufg.innerHTML = response.result;

    }
  );
};

const assertButton = document.getElementById("assert");
assertButton.onclick = async function (e) {
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  console.log("UFG-CHROME-EXTENSION: assertionBtn signal");
  chrome.tabs.sendMessage(
    tabs[0].id,
    { msg: "countassertions" },
    function (response) {
      try {
        console.log(response.result);
      } catch (e) {
        console.log(e);
      }

      assertButton.innerHTML = response.result;

      waitForElm('.eyesdone').then((elm) => {
        console.log('UFG-CHROME-EXTENSION: eyes is done');
    });

    }
  );

  console.log("UFG-CHROME-EXTENSION: popup.js addListener");
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(
      "UFG-CHROME-EXTENSION: popup.js listener request msg: " + request.msg
    );

    if (request.msg == "renderdone") {
      alert('Render done')
    }

    console.log("UFG-CHROME-EXTENSION: popup.js listener end");
  });

};

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}