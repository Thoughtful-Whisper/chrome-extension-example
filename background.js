chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "addEventFromContent") {
    const newEvent = request.text + " - " + new Date().toLocaleString();

    // 스토리지에 새로운 내용 추가
    chrome.storage.sync.get("events", function (data) {
      const events = data.events || [];
      events.push(newEvent);

      chrome.storage.sync.set({ events: events }, function () {
        console.log("일정이 백그라운드에서 업데이트되었습니다.", events);
      });
    });
  }
});

// 백그라운드에서 주기적인 작업 수행
setInterval(function () {
  console.log("백그라운드에서 주기적인 작업 수행");
}, 5000);
