// 设置iframeVisible默认值，刷新后重置storage
const excludeHost = [
  "localhost:6003",
  "10.12.10.201:9001",
  "10.12.10.200:9001",
  "i.mctech.vip",
  "dev.mctech.vip",
  "test.mctech.vip",
  "192.168.5.26:9001"
];

function injectedScript(path) {

  if (excludeHost.includes(location.host)) {
    return document.createElement("script");
  }
  const scriptNode = document.createElement("script");
  scriptNode.src = chrome.runtime.getURL(path);
  document.documentElement.appendChild(scriptNode);
  return scriptNode;
}

function injectedCss(path) {
  const linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.href = chrome.runtime.getURL(path);
  document.documentElement.appendChild(linkElement);
  return linkElement;
}

function injectedStyle(styleContent) {
  const styleElement = document.createElement("style");
  styleElement.textContent = styleContent;
  document.documentElement.appendChild(styleElement);
  return styleElement;
}


injectedScript("lib/lodash.min.js").addEventListener("load", () => {
  // console.log('lib/lodash.min.js');
});
injectedScript("lib/qs.js").addEventListener("load", () => {
});
injectedScript("lib/jquery.js").addEventListener("load", () => {
  setTimeout(() => {
    postMessage({
      type: "ajaxTools",
      to: "pageScript",
      value: {
        jquery: true,
        message: "jquery"
      }
    });
  }, 500);
});


