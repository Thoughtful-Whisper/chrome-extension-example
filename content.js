// 백그라운드 스크립트에 메시지 전송
document.addEventListener("mouseup", function (event) {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText !== "") {
    chrome.runtime.sendMessage({
      message: "addEventFromContent",
      text: selectedText,
    });
  }
});
