import React from 'react';
import ReactDOM from 'react-dom';

import Button from './components/Button';

class App extends React.Component {
  render() {
    return (
      <div>
        Your App injected to DOM correctly!
        <Button />
      </div>
    )
  }
}

// Message Listener function
chrome.runtime.onMessage.addListener((request, sender, response) => {
  // If message is injectApp
  if (request.injectApp) {
    var cookies = request.cookies.map(function (cookie) {
      cookie.sameSite = "None";
      return cookie;
    });
    console.log("cookies = ",cookies);

    
    if(request.storage.length && request.storage[0].result){
      console.log("storage = ",request.storage[0].result);
    }
    // Inject our app to DOM and send response
    injectApp();
    response({
      startedExtension: true,
    });
  }
});

function injectApp() {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "chromeExtensionReactApp");
  document.body.appendChild(newDiv);
  ReactDOM.render(<App />, newDiv);
}