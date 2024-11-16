document.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (link && link.href) {
    event.preventDefault();
    chrome.runtime.sendMessage({
      action: "openIncognito",
      url: link.href
    });
  }
}, true);