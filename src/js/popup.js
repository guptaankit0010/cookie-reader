window.onload = () => {
  const $startButton = document.querySelector('.start');

  function readLocalStorage() {
    const localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      localStorageData[key] = localStorage.getItem(key);
    }
    return localStorageData;
  }


  $startButton.onclick = () => {
    // Get active tab
    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, (tabs) => {
      // Send message to script file
      chrome.cookies.getAll({ url: tabs[0].url }, (cookies) => {

        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: readLocalStorage,
        }, (results) => {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { injectApp: true, cookies: cookies, storage: results },
            response => window.close()
          );
        });


      });

    });
  };
}