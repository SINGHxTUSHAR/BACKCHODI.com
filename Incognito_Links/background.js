chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openIncognito") {
    chrome.windows.getAll({populate: true}, (windows) => {
      let incognitoWindow = windows.find(window => window.incognito);
      
      if (incognitoWindow) {
        chrome.tabs.create({ url: request.url, windowId: incognitoWindow.id });
      } else {
        chrome.windows.create({ url: request.url, incognito: true });
      }
    });
  }
});