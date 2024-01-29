document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("addEventButton")
    .addEventListener("click", function () {
      addEvent();
    });
  loadEvents();
});

function loadEvents() {
  const eventList = document.getElementById("eventList");
  eventList.innerHTML = "";

  chrome.storage.sync.get("events", function (data) {
    const events = data.events || [];

    events.forEach(function (event) {
      const li = document.createElement("li");
      li.textContent = event;
      eventList.appendChild(li);
    });
  });
}

function addEvent() {
  const eventInput = document.getElementById("eventInput");
  const event = eventInput.value.trim();

  if (event !== "") {
    chrome.storage.sync.get("events", function (data) {
      const events = data.events || [];
      events.push(event);

      chrome.storage.sync.set({ events: events }, function () {
        loadEvents();
        eventInput.value = "";
      });
    });
  }
}
