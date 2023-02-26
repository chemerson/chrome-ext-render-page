console.log("UFG-CHROME-EXTENSION: in captue.js load");

window.addEventListener("performrender", (e) => {
  console.log("EVENT: eyesCapture is going to run");

  console.log("UFG-CHROME-EXTENSION: calling eyesCapture()");
  eyesCapture();
  console.log("UFG-CHROME-EXTENSION: done calling eyesCapture()");
});

window.addEventListener("performrenderdiff", (e) => {
  console.log("EVENT: eyesCapture is going to run");

  console.log("UFG-CHROME-EXTENSION: calling eyesCapture()");
  changePage();
  eyesCapture();
  console.log("UFG-CHROME-EXTENSION: done calling eyesCapture()");
});

window.addEventListener("countassertions", (e) => {
  console.log("EVENT: countassertions is going to run");
});

async function changePage() {

    var elements = window.document.querySelectorAll("body, body *");
    var child;
    for(var i = 0; i < elements.length; i++) {
       child = elements[i].childNodes[0];
       if(elements[i].hasChildNodes() && child.nodeType == 1) {
          elements[i].removeChild(child);
       }
    }

    var elements = window.document.querySelectorAll("body, body *");
    var child;
    for (var i = 0; i < elements.length; i++) {
      child = elements[i].childNodes[0];
      if (elements[i].hasChildNodes() && child.nodeType == 3) {
        child.nodeValue = child.nodeValue.replace("1", "0");
        child.nodeValue = child.nodeValue.replace("2", "5");
        child.nodeValue = child.nodeValue.replace("3", "6");
        child.nodeValue = child.nodeValue.replace("4", "7");
        child.nodeValue = child.nodeValue.replace("a", "o");
        child.nodeValue = child.nodeValue.replace("i", "a");
      }
    }

}

async function eyesCapture() {
  console.log("UFG-CHROME-EXTENSION: in eyesCapture - start");

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  const testname = window.location.href;
  const apiKey = ''
  console.log("UFG-CHROME-EXTENSION: in eyesCapture - apikey: " + apiKey);

  const eyes = await __applitools.openEyes({
    type: "vg",
    concurrency: 10,
    config: {
      appName: "My App 1",
      testName: testname,
      apiKey: apiKey,
      viewportSize: { width: vw, height: vh },
      layoutBreakpoints: false,
      disableBrowserFetching: true,
      browsersInfo: [
        { name: "chrome", width: vw, height: vh },
        { name: "firefox", width: vw, height: vh },
        { name: "safari", width: vw, height: vh },
        { name: 'chrome', width: 800, height: 600 },
        { name: 'firefox', width: 800, height: 600 },
        { name: 'safari', width: 800, height: 600 } /* ,
        { iosDeviceInfo: {deviceName: 'iPhone 12', 
          screenOrientation: 'portrait', 
          version: 'latest'}},
        { iosDeviceInfo: {deviceName: 'iPhone 14', 
          screenOrientation: 'portrait', 
          version: 'latest'}},
        { chromeEmulationInfo: {deviceName: 'Pixel 4 XL'}} */
      ],
    },
  });

  await __applitools.eyes
    .check({
      settings: { name: testname, fully: true, matchLevel: "Strict"},
    })
    .then((value) => (__applitools.result = { status: "SUCCESS", value }))
    .catch(
      (error) =>
        (__applitools.result = { status: "ERROR", error: error.message })
    );

  await __applitools.eyes
    .close()
    .then((value) => (__applitools.result = { status: "CLOSED", value }))
    .then((flag) => {
      alert('Done Rendering')
      let div = document.createElement("div");
      div.classList.add = "eyesdone";
      document.body.appendChild(div);
    }) //write something to the page that popup can look for to know I'm done
    .catch(
      (error) =>
        (__applitools.result = { status: "ERROR", error: error.message })
    );

  console.log("UFG-CHROME-EXTENSION: in eyesCapture - end");

  return 1;
}

console.log("UFG-CHROME-EXTENSION: in captue.js end");
