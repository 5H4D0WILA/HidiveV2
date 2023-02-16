chrome.webRequest.onCompleted.addListener(
    function(details) {
      if (details.url.indexOf('www.crunchyroll.com/content/v2/discover') !== -1) {
        chrome.tabs.sendMessage(details.tabId, {type: 'requestCompleted', data: details.response});
      }
    },
    {urls: ['*://www.crunchyroll.com/content/v2/discover/*']}
  );