// Example: Listen for a message from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getCookies") {
      // Get cookies for LinkedIn
      chrome.cookies.getAll({ domain: "linkedin.com" }, (cookies) => {
        sendResponse({ cookies });
      });
      return true; // Keep the message channel open for async response
    }
  });
  
  // Example: Log when the extension is installed
  chrome.runtime.onInstalled.addListener(() => {
    console.log("LinkedIn Cookie Reader extension installed.");

    // connect to ws://localhost:5668/devtools/browser/dd7c75fd-4acc-4783-80e3-a1f8d4ef7205
    const ws = new WebSocket("ws://localhost:5668/devtools/browser/c021db2e-5d3c-4314-a33a-649f3a42e44a");
    ws.onopen = () => {
      console.log("WebSocket connection opened.");
    };
    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
    };
    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    
    
  });