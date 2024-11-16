let incognitoEnabled = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('incognitoEnabled', (data) => {
    incognitoEnabled = data.incognitoEnabled || false;
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openIncognito" && incognitoEnabled) {
    chrome.windows.getAll({populate: true}, (windows) => {
      let incognitoWindow = windows.find(window => window.incognito);
      
      if (incognitoWindow) {
        chrome.tabs.create({ url: request.url, windowId: incognitoWindow.id });
      } else {
        chrome.windows.create({ url: request.url, incognito: true });
      }
    });
  } else if (request.action === "updateIncognitoState") {
    incognitoEnabled = request.enabled;
  }
});