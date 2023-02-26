{
  console.log("UFG-CHROME-EXTENSION: content.js start");

  var s = document.createElement("script");
  s.src = chrome.runtime.getURL("capture.js");
  s.onload = function () {
    s.remove();
  };
  (document.body || document.head || document.documentElement).appendChild(s);

  console.log("UFG-CHROME-EXTENSION: content.js addListener");
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(
      "UFG-CHROME-EXTENSION: content.js listener request msg: " + request.msg
    );

    if (request.msg == "capturepage") {
      const event = new Event("performrender");
      window.dispatchEvent(event);

      function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      sendResponse({ result: "Rendering ..." });
    }

    if (request.msg == "capturepagediff") {
      const event = new Event("performrenderdiff");
      window.dispatchEvent(event);

      function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      sendResponse({ result: "Rendering ..." });
    }

    if (request.msg == "countassertions") {
      var msg = assertCount();

      sendResponse({ result: msg });
    }

    console.log("UFG-CHROME-EXTENSION: content.js listener end");
  });

  console.log("UFG-CHROME-EXTENSION: content.js end");

  function assertCount() {
    var img;
    var a;
    var p;
    var h1;
    var h2;
    var h3;
    var h4;
    var iframe;
    var button;
    var input;
    var total;
    var msg;

    img = document.getElementsByTagName("img").length;
    a = document.getElementsByTagName("a").length;
    p = document.getElementsByTagName("p").length;
    h1 = document.getElementsByTagName("h1").length;
    h2 = document.getElementsByTagName("h2").length;
    h3 = document.getElementsByTagName("h3").length;
    h4 = document.getElementsByTagName("h4").length;
    iframe = document.getElementsByTagName("iframe").length;
    button = document.getElementsByTagName("button").length;
    input = document.getElementsByTagName("input").length;
    total = img + a + p + h1 + h2 + h3 + h4 + iframe + button + input;

    msg = "images: " + img + "<br>";
    msg = msg + "links: " + a + "<br>";
    msg = msg + "paragraphs: " + p + "<br>";
    msg = msg + "header 1: " + h1 + "<br>";
    msg = msg + "header 2: " + h2 + "<br>";
    msg = msg + "header 3: " + h3 + "<br>";
    msg = msg + "header 4: " + h4 + "<br>";
    msg = msg + "iframes: " + iframe + "<br>";
    msg = msg + "buttons: " + button + "<br>";
    msg = msg + "inputs: " + input + "<br>";
    msg = msg + "<br><b>MINIMUM ASSERTIONS NEEDED: " + total + "</b>";

    return msg;
  }
}
