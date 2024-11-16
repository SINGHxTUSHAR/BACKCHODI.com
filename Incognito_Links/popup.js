document.addEventListener('DOMContentLoaded', function() {
  const toggleIncognito = document.getElementById('toggleIncognito');
  const status = document.getElementById('status');

  // Load saved state
  chrome.storage.sync.get('incognitoEnabled', function(data) {
    toggleIncognito.checked = data.incognitoEnabled || false;
    updateStatus(toggleIncognito.checked);
  });

  toggleIncognito.addEventListener('change', function() {
    const isEnabled = toggleIncognito.checked;
    chrome.storage.sync.set({incognitoEnabled: isEnabled}, function() {
      updateStatus(isEnabled);
      chrome.runtime.sendMessage({action: "updateIncognitoState", enabled: isEnabled});
    });
  });

  function updateStatus(isEnabled) {
    status.textContent = `Incognito mode is ${isEnabled ? 'ON' : 'OFF'}`;
  }
});