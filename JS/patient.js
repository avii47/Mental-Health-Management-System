//const { layouts } = require("chart.js");

//---------------navbar script------------------------
var toggleClick = document.querySelector(".toggleBox");
var container = document.querySelector(".container");
var pop = document.querySelector(".pop");
var isBackgroundImage1 = true;
toggleClick.addEventListener("click", () => {
  toggleClick.classList.toggle("active");
  container.classList.toggle("active");
  pop.classList.toggle("active");
});

//---------------calender script------------------------
const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};
const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};
let calendar = document.querySelector(".calendar");
const month_names = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month_picker = document.querySelector("#month-picker");
const dayTextFormate = document.querySelector(".day-text-formate");
const timeFormate = document.querySelector(".time-formate");
const dateFormate = document.querySelector(".date-formate");

month_picker.onclick = () => {
  month_list.classList.remove("hideonce");
  month_list.classList.remove("hide");
  month_list.classList.add("show");
  dayTextFormate.classList.remove("showtime");
  dayTextFormate.classList.add("hidetime");
  timeFormate.classList.remove("showtime");
  timeFormate.classList.add("hideTime");
  dateFormate.classList.remove("showtime");
  dateFormate.classList.add("hideTime");
};

const generateCalendar = (month, year) => {
  let calendar_days = document.querySelector(".calendar-days");
  calendar_days.innerHTML = "";
  let calendar_header_year = document.querySelector("#year");
  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let currentDate = new Date();

  month_picker.innerHTML = month_names[month];

  calendar_header_year.innerHTML = year;

  let first_day = new Date(year, month);

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement("div");

    if (i >= first_day.getDay()) {
      day.innerHTML = i - first_day.getDay() + 1;

      if (
        i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add("current-date");
      }
    }
    calendar_days.appendChild(day);
  }
};

let month_list = calendar.querySelector(".month-list");
month_names.forEach((e, index) => {
  let month = document.createElement("div");
  month.innerHTML = `<div>${e}</div>`;

  month_list.append(month);
  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace("show", "hide");
    dayTextFormate.classList.remove("hideTime");
    dayTextFormate.classList.add("showtime");
    timeFormate.classList.remove("hideTime");
    timeFormate.classList.add("showtime");
    dateFormate.classList.remove("hideTime");
    dateFormate.classList.add("showtime");
  };
});

(function () {
  month_list.classList.add("hideonce");
})();
document.querySelector("#pre-year").onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector("#next-year").onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector(".time-formate");
const todayShowDate = document.querySelector(".date-formate");

const currshowDate = new Date();
const showCurrentDateOption = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
};
const currentDateFormate = new Intl.DateTimeFormat(
  "en-US",
  showCurrentDateOption
).format(currshowDate);
todayShowDate.textContent = currentDateFormate;
setInterval(() => {
  const timer = new Date();
  const option = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formateTimer = new Intl.DateTimeFormat("en-us", option).format(timer);
  let time = `${`${timer.getHours()}`.padStart(
    2,
    "0"
  )}:${`${timer.getMinutes()}`.padStart(
    2,
    "0"
  )}: ${`${timer.getSeconds()}`.padStart(2, "0")}`;
  todayShowTime.textContent = formateTimer;
}, 1000);

//------------------function to add events to php------------------
function postEventData(event) {
  var postData = {
    pid: localStorage.getItem("myData"),
    date: event.date,
    time: event.time,
    title: event.title,
    description: event.description,
  };

  $.ajax({
    type: "POST",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/patientEvents.php",
    data: postData,
    success: function (response) {
      //var score = JSON.parse(response);
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

//------------------function to get events from php------------------
function getEventData(callback) {
  var postData = {
    pid: localStorage.getItem("myData"),
  };

  $.ajax({
    type: "GET",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/patientEvents.php",
    data: postData,
    success: function (response) {
      var events = JSON.parse(response);
      callback(events);
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

//------------------function to delete events from php------------------
function deleteEventData(eid) {
  var postData = {
    del: "delete",
    eid: eid,
  };

  $.ajax({
    type: "POST",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/patientEvents.php",
    data: postData,
    success: function (response) {
      //var score = JSON.parse(response);
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

//------------------function to update events in php------------------
function updateEventData(eid, updatedEvent) {
  var postData = {
    eid: eid,
    date: updatedEvent.date,
    time: updatedEvent.time,
    title: updatedEvent.title,
    description: updatedEvent.description,
  };

  $.ajax({
    type: "POST",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/patientEvents.php",
    data: postData,
    success: function (response) {
      //var score = JSON.parse(response);
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

//-------------------- Show Event Modal------------------------
function showEventModal(date, month, day, year) {
  var eventModal = $("#event-modal-container");
  const eventModalClose = document.getElementById("btn-close-event");
  const eventDateInput = document.getElementById("event-date");
  const saveEventButton = document.getElementById("save-event");

  document.getElementById("event-time").value = "";
  document.getElementById("event-title").value = "";
  document.getElementById("event-description").value = "";

  eventModal.css("display", "block");
  eventDateInput.value = date;

  saveEventButton.onclick = function () {
    time = document.getElementById("event-time").value;
    title = document.getElementById("event-title").value;
    description = document.getElementById("event-description").value;

    addEvent(date, time, title, description);

    highlightSpecificDate(year, month, day);

    eventModal.css("display", "none");
    $("#popup-container-success").css("display", "block");
    var element = document.getElementById("popup-container-success");
    var opacity = 1;
    var fadeOutInterval = setInterval(function () {
      if (opacity <= 0) {
        clearInterval(fadeOutInterval);
        element.style.display = "none";
      } else {
        opacity -= 0.03;
        element.style.opacity = opacity;
      }
    }, 80);
  };

  eventModalClose.onclick = function () {
    eventModal.css("display", "none");
  };

  eventModal.on("click", outsideClickChat);
  function outsideClickChat(event) {
    if ($(event.target).is(eventModal)) {
      eventModal.css("display", "none");
    }
  }
}

//function to save event data
function saveData(date, month, day, year) {
  var time = document.getElementById("event-manager-event-time").value;
  var title = document.getElementById("event-manager-event-title").value;
  var description = document.getElementById(
    "event-manager-event-description"
  ).value;

  addEvent(date, time, title, description);
  highlightSpecificDate(year, month, day);
  displayEventsInTable(null);

  $("#popup-container-success").css("display", "block");
  var element = document.getElementById("popup-container-success");
  var opacity = 1;
  var fadeOutInterval = setInterval(function () {
    if (opacity <= 0) {
      clearInterval(fadeOutInterval);
      element.style.display = "none";
    } else {
      opacity -= 0.03;
      element.style.opacity = opacity;
    }
  }, 80);
}

// Attach event listeners to each day
const calendarDays = document.querySelectorAll(".calendar-days div");

calendarDays.forEach((day) => {
  day.addEventListener("click", function () {
    const date = `${currentMonth.value + 1}/${day.textContent}/${
      currentYear.value
    }`;
    if (getEventsByDate(date) == "") {
      showEventModal(
        date,
        currentMonth.value + 1,
        day.textContent,
        currentYear.value
      );
    } else {
      openPopupEventManager();
      var filteredEvents = getEventsByDate(date);
      displayEventsInTable(filteredEvents);
    }
  });
});

// Function to find and highlight a specific date in the calendar
const highlightSpecificDate = (year, month, day) => {
  const calendar_days = document.querySelectorAll(".calendar-days div");
  const calendar_months = document.querySelectorAll(".calendar-months div");

  calendar_days.forEach((div) => {
    const divDate = parseInt(div.innerHTML);
    if (!isNaN(divDate)) {
      if (
        divDate == day &&
        currentMonth.value + 1 == month &&
        currentYear.value == year
      ) {
        div.classList.add("event-marked");
      } else {
      }
    }
  });
};

// Function to find and highlight a specific date in the calendar
const unHighlightSpecificDate = (year, month, day) => {
  const calendar_days = document.querySelectorAll(".calendar-days div");
  const calendar_months = document.querySelectorAll(".calendar-months div");

  calendar_days.forEach((div) => {
    const divDate = parseInt(div.innerHTML);
    if (!isNaN(divDate)) {
      if (
        divDate == day &&
        currentMonth.value + 1 == month &&
        currentYear.value == year
      ) {
        div.classList.remove("event-marked");
      } else {
      }
    }
  });
};

//--------------------------------------event manager section--------------------------------------------

var popupEventManagerBtn = $("#popup-button-event-manager");
var popupEventManagerContainer = $("#popup-container-event-manager");
var closeEventManagerBtn = $("#close-event-manager-button");

popupEventManagerBtn.on("click", openPopupEventManager);
closeEventManagerBtn.on("click", closePopupEventManager);
popupEventManagerContainer.on("click", outsideClickEventManager);

function openPopupEventManager() {
  $(function () {
    $(".datepicker").datepicker();
  });
  popupEventManagerContainer.css("display", "block");
  displayEventsInTable(null);
  clearForm();
}

function closePopupEventManager() {
  popupEventManagerContainer.css("display", "block");
}

function outsideClickEventManager(event) {
  if ($(event.target).is(popupEventManagerContainer)) {
    popupEventManagerContainer.css("display", "none");
  }
}

//------------------------------Implement an array to store events----------------------------------
const events = [];
var currentIndex = null;

getEventData(function (data) {
  data.forEach(function (row) {
    const event = {
      eid: row.event_id,
      date: row.date,
      time: row.time,
      title: row.title,
      description: row.description,
    };
    events.push(event);
    var separatedDate = separateDate(event.date);
    highlightSpecificDate(separatedDate[0], separatedDate[1], separatedDate[2]);
  });
});

function addEvent(date, time, title, description) {
  const event = {
    date: date,
    time: time,
    title: title,
    description: description,
  };
  events.push(event);
  postEventData(event);
}

function addAnotherEvent() {
  var date = document.getElementById("event-manager-event-date").value;
  var separatedDate = separateDate(date);
  saveData(date, separatedDate[1], separatedDate[2], separatedDate[0]);
}

// Function to sort events by date and time
function sortEventsByDateAndTime() {
  events.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;

    const timeA = a.time.toLowerCase();
    const timeB = b.time.toLowerCase();
    if (timeA < timeB) return -1;
    if (timeA > timeB) return 1;

    return 0;
  });
}

// Function to edit an existing event by index
function editEvent() {
  var date = document.getElementById("event-manager-event-date").value;
  var time = document.getElementById("event-manager-event-time").value;
  var title = document.getElementById("event-manager-event-title").value;
  var description = document.getElementById(
    "event-manager-event-description"
  ).value;

  const updatedEventData = {
    date: date,
    time: time,
    title: title,
    description: description,
  };

  if (currentIndex >= 0 && currentIndex < events.length) {
    updateEventData(events[currentIndex].eid, updatedEventData);
    events[currentIndex] = updatedEventData;
    displayEventsInTable(null);
    return true;
  }
  return false;
}

//Function to get all events
function getAllEvents() {
  return events;
}

// Function to get an event by date
function getEventsByDate(date) {
  return events.filter((event) => event.date === date);
}

// Function to get an event by title
function getEventsByTitle(title) {
  return events.filter((event) => event.title === title);
}

// Function to check an spesific event by date time and title
function checkEvent(date, time, title) {
  const filteredEvents = events.filter(
    (event) =>
      event.date === date && event.time === time && event.title === title
  );
  if (filteredEvents.length > 0) {
    return "have";
  } else {
    return "do not have";
  }
}

// Function to search events
function searchEvent() {
  const date = document.getElementById("event-manager-event-date").value;
  const title = document.getElementById("event-manager-event-title").value;

  if (date != "" && title == "") {
    var filteredEvents = getEventsByDate(date);
    displayEventsInTable(filteredEvents);
  }
  if (title != "" && date == "") {
    var filteredEvents = getEventsByTitle(title);
    displayEventsInTable(filteredEvents);
  }
}

// Function to separate date
function separateDate(date) {
  const parts = date.split("/");

  if (parts.length === 3) {
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    return [year, month, day];
  } else {
    console.log("Invalid date format");
  }
}

// Function to clear form
function clearForm() {
  document.getElementById("event-manager-event-date").value = "";
  document.getElementById("event-manager-event-time").value = "";
  document.getElementById("event-manager-event-title").value = "";
  document.getElementById("event-manager-event-description").value = "";
  displayEventsInTable(null);
}

// Function to delete an event
function deleteEvent() {
  if (currentIndex >= 0 && currentIndex < events.length) {
    //remove the event from the calender
    if (getEventsByDate(events[currentIndex].date).length > 1) {
    } else {
      var separatedDate = separateDate(events[currentIndex].date);
      unHighlightSpecificDate(
        separatedDate[0],
        separatedDate[1],
        separatedDate[2]
      );
    }
    //remove the event from the array
    deleteEventData(events[currentIndex].eid);
    events.splice(currentIndex, 1);

    displayEventsInTable(null);
    clearForm();

    currentIndex = null;
    return true;
  }
  return false;
}

// Function to add events to the table
function displayEventsInTable(filteredEvents) {
  sortEventsByDateAndTime();
  const eventTableBody = document.getElementById("eventTableBody");
  eventTableBody.innerHTML = "";

  if (filteredEvents == null) {
    events.forEach((event, index) => {
      const row = document.createElement("tr");
      const titleCell = document.createElement("td");
      const dateCell = document.createElement("td");
      const timeCell = document.createElement("td");

      titleCell.textContent = event.title;
      dateCell.textContent = event.date;
      timeCell.textContent = event.time;

      row.appendChild(titleCell);
      row.appendChild(dateCell);
      row.appendChild(timeCell);

      row.addEventListener("click", () => {
        loadDataToForm(index, filteredEvents);
      });
      eventTableBody.appendChild(row);
    });
  } else {
    filteredEvents.forEach((event, index) => {
      const row = document.createElement("tr");
      const titleCell = document.createElement("td");
      const dateCell = document.createElement("td");
      const timeCell = document.createElement("td");

      titleCell.textContent = event.title;
      dateCell.textContent = event.date;
      timeCell.textContent = event.time;

      row.appendChild(titleCell);
      row.appendChild(dateCell);
      row.appendChild(timeCell);

      row.addEventListener("click", () => {
        loadDataToForm(index, filteredEvents);
      });
      eventTableBody.appendChild(row);
    });
  }
}

// Function to load data to the form
function loadDataToForm(index, filteredEvents) {
  const date = document.getElementById("event-manager-event-date");
  const time = document.getElementById("event-manager-event-time");
  const title = document.getElementById("event-manager-event-title");
  const description = document.getElementById(
    "event-manager-event-description"
  );

  date.value = "";
  time.value = "";
  title.value = "";
  description.value = "";

  if (filteredEvents == null) {
    date.value = events[index].date;
    time.value = events[index].time;
    title.value = events[index].title;
    description.value = events[index].description;
  } else {
    date.value = filteredEvents[index].date;
    time.value = filteredEvents[index].time;
    title.value = filteredEvents[index].title;
    description.value = filteredEvents[index].description;
  }
  currentIndex = index;
}

//------------------function to get daily progress from php------------------
function getActData(callback) {
  var postData = {
    date: new Date().toISOString().slice(0, 10),
    pid: localStorage.getItem("myData"),
    activity: "activity",
  };

  $.ajax({
    type: "POST",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/patient.php",
    data: postData,
    success: function (response) {
      var data = JSON.parse(response);
      callback(data);
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

//---------------daily progress script------------------------
function toggleProgress() {
  getActData(function (data) {
    const circle = document.querySelector(".circle");
    let number = document.getElementById("number");
    let counter = 0;
    var score = data.daily_score * 20;

    if (score == 100) {
      circle.style.animation = "anime5 2s linear forwards";
    }
    if (score == 20) {
      circle.style.animation = "anime4 2s linear forwards";
    }
    if (score == 40) {
      circle.style.animation = "anime3 2s linear forwards";
    }
    if (score == 60) {
      circle.style.animation = "anime2 2s linear forwards";
    }
    if (score == 80) {
      circle.style.animation = "anime1 2s linear forwards";
    }

    setInterval(() => {
      if (counter == score) {
        clearInterval();
      } else {
        counter += 1;
        number.innerHTML = counter + "%";
      }
    }, 30);
  });
}

//------------function to load progress bargraph data from php--------------
function getProgressData(callback) {
  var postData = {
    pid: localStorage.getItem("myData"),
  };

  $.ajax({
    type: "POST",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/progress.php",
    data: postData,
    success: function (response) {
      var data = JSON.parse(response);
      callback(data);
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

//-----------------------load bar graph-----------------------------
function animateBars() {
  const bars = document.getElementsByClassName("bar");
  var progressData = [];
  var monthData = [];
  var monthTg = [];
  const currentMonth = new Date().getMonth() + 1;

  getProgressData(function (data) {
    for (let i = 0; i <= 5; i++) {
      monthTg[i] = document.getElementById("monthTag-" + i);
    }

    if (currentMonth >= 6) {
      data.forEach(function (row, index) {
        var runFrom = currentMonth - 6;
        if (index + 1 >= runFrom && index + 1 <= currentMonth) {
          progressData.push(row.progress);
          monthData.push(row.month);
        }
      });
    } else if (currentMonth < 6) {
      var runFrom = currentMonth - 6;
      switch (runFrom) {
        case -1:
          runFrom = 12;
          break;
        case -2:
          runFrom = 11;
          break;
        case -3:
          runFrom = 10;
          break;
        case -4:
          runFrom = 9;
          break;
        case -5:
          runFrom = 8;
          break;
      }

      let startFrom = 0; // variable to store the starting index for the loop

      data.forEach(function (row, index) {
        if (index + 1 >= runFrom) {
          progressData.push(row.progress);
          monthData.push(row.month);

          if (runFrom === 12) {
            startFrom = 0; // reset the starting index
          }
        }

        // Check if we have reached the end of the data array
        if (index === data.length - 1) {
          // Start a new loop from the beginning if necessary
          for (let i = startFrom; i < runFrom; i++) {
            // Process the data as needed
            const newRow = data[i];
            progressData.push(newRow.progress);
            monthData.push(newRow.month);
          }
        }
      });
    }

    for (let i = 0; i < bars.length; i++) {
      const bar = bars[i];
      const height = progressData[i];
      const monthTag = monthData[i].slice(0, 3);
      monthTg[i].textContent = monthTag;
      bar.style.height = "0%";

      setTimeout(() => {
        bar.classList.add("animate");
        bar.style.height = height;
      }, i * 200);
    }
  });
}

animateBars();
toggleProgress();

//-----------------------therapy sessions script----------------------------
var dateTag = document.getElementById("dateTag");
var timeTag = document.getElementById("timeTag");

getTherapyData(function (therapy) {
  timeTag.textContent = therapy.startTime;
  var separatedDate = separateDate(therapy.date);
  var monthString = "";

  switch (separatedDate[1]) {
    case 1:
      monthString = "January";
      break;
    case 2:
      monthString = "February";
      break;
    case 3:
      monthString = "March";
      break;
    case 4:
      monthString = "April";
      break;
    case 5:
      monthString = "May";
      break;
    case 6:
      monthString = "June";
      break;
    case 7:
      monthString = "July";
      break;
    case 8:
      monthString = "August";
      break;
    case 9:
      monthString = "September";
      break;
    case 10:
      monthString = "Octomber";
      break;
    case 11:
      monthString = "November";
      break;
    case 12:
      monthString = "December";
      break;
  }
  var dateString =
    separatedDate[2] + " " + monthString + " " + separatedDate[0];
  dateTag.textContent = dateString;
});

//------------------function to get therapy data from php------------------
function getTherapyData(callback) {
  var postData = {
    pid: localStorage.getItem("myData"),
    therapy: "therapy",
  };

  $.ajax({
    type: "POST",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/patient.php",
    data: postData,
    success: function (response) {
      if (response.trim() == "notFound") {
        document.getElementById("nxtTherapy").classList.add("disabled");
      } else {
        document.getElementById("nxtTherapy").classList.remove("disabled");
        var therapy = JSON.parse(response);
        callback(therapy);
      }
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

//------------------function to get user object from php------------------
function getUserData(callback) {
  var postData = {
    myData: "user",
  };

  $.ajax({
    type: "POST",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/patient.php",
    data: postData,
    success: function (response) {
      var user = response;
      if (user == "logout") {
        window.location.href = "index.html";
      } else {
        callback(user);
      }
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

$(document).ready(function () {
  //get the user information
  getUserData(function (user) {
    var userNameElement = document.querySelector(".userName");
    userNameElement.textContent = "Mr. " + user.name1;

    const imagePath = String("php/" + user.img);
    document.querySelector("#profile").src = imagePath;
    document.querySelector("#display_image").src = imagePath;
    localStorage.setItem("patientImg", imagePath);

    //check that a doctor was assigned to the patient or not
    var havDoc = document.getElementById("havDoc");
    var havntDoc = document.getElementById("havtDoc");
    if (user.docId == 0) {
      havDoc.style.display = "none";
      havntDoc.style.display = "block";
      havntDoc.classList.add("d-flex");
      havDoc.classList.remove("d-flex");
    } else {
      havDoc.style.display = "block";
      havntDoc.style.display = "none";
      havntDoc.classList.remove("d-flex");
      havDoc.classList.add("d-flex");
    }
  });

  //get the doctor information
  getDocData(function (user) {
    var docName = document.querySelector("#doc-name");
    var jobTitle = document.querySelector("#job-title");
    docName.textContent = "Dr. " + user.name1 + " " + user.name2;
    jobTitle.textContent = user.jobTitle;

    const imagePath = String("php/" + user.img);
    document.querySelector("#popup-button-doctor-info").src = imagePath;
    document.querySelector("#doc-img").src = imagePath;
    localStorage.setItem("docImg", imagePath);
  });

  //check the mental state (popup the chat window)
  document.getElementById("state-check").onclick = function () {
    openPopupChat();
  };

  //--------------------------------------Chat section--------------------------------------------
  var popupChatBtn = $("#popup-button-chat");
  var popupChatContainer = $("#popup-container-chat");
  var closeChatBtn = $("#close-button");

  popupChatBtn.on("click", openPopupChat);
  closeChatBtn.on("click", closePopupChat);
  popupChatContainer.on("click", outsideClickChat);

  function openPopupChat() {
    popupChatContainer.css("display", "block");

    const chatMessages2 = document.querySelector(".chatBot-messages");
    const chatInputForm2 = document.querySelector(".chatBot-input-form");
    const chatInput2 = document.querySelector(".chatBot-input");
    const clearChatBtn2 = document.querySelector(".clear-chatBot-button");

    let messageSender2 = "Ashan";

    const messages2 = JSON.parse(localStorage.getItem("messages")) || [];

    const createChatMessageElement2 = (message) =>
      `
       <img src="Images/ashan.jpg" class="userp-img" alt="">
       <div class="message2 nw userp ${
         message.sender == "Ashan" ? "blue-bg" : "gray-bg"
       }">
         <div class="message-sender">${message.sender}</div>
         <div class="message-text">${message.text}</div>
         <div class="message-timestamp">${message.timestamp}</div>
       </div>
     `;

    const createBotMessageElement2 = (response) =>
      `
       <div class="message2 nw2 bot ${
         response.sender == "Ashan" ? "blue-bg" : "gray-bg"
       }">
         <div class="message-sender">${response.sender}</div>
         <div class="message-text msg-con">${response.text}</div>
         <div class="message-timestamp">${response.timestamp}</div>
       </div>
     `;

    window.onload = () => {
      messages2.forEach((message) => {
        //chatMessages2.innerHTML += createChatMessageElement2(message)
      });
    };

    const sendMessage2 = (e) => {
      e.preventDefault();
      messageSender2 = "Ashan";

      const timestamp = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      if (chatInput2.value != "") {
        const message2 = {
          sender: messageSender2,
          text: chatInput2.value,
          timestamp,
        };

        messages2.push(message2);
        localStorage.setItem("messages", JSON.stringify(messages2));
        chatMessages2.innerHTML += createChatMessageElement2(message2);
        chatInputForm2.reset();
        sendMessageToBot2(message2);
        chatMessages2.scrollTop = chatMessages2.scrollHeight;

        const delayInMilliseconds = 1000;
        setTimeout(function () {
          document.querySelector(".nw").classList.remove("nw");
        }, delayInMilliseconds);
      }
    };

    chatInputForm2.addEventListener("submit", sendMessage2);

    clearChatBtn2.addEventListener("click", () => {
      //localStorage.clear();
      chatMessages2.innerHTML = "";
    });

    function sendResponse2(botResponse) {
      timestamp = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      const response2 = {
        sender: "bot",
        text: botResponse,
        timestamp,
      };
      /* Save message to local storage */
      messages2.push(response2);
      localStorage.setItem("messages2", JSON.stringify(messages2));
      chatMessages2.innerHTML += createBotMessageElement2(response2);
      chatInputForm2.reset();
      chatMessages2.scrollTop = chatMessages2.scrollHeight;
      typeBotMessage();

      const delayInMilliseconds = 2000;
      setTimeout(function () {
        document.querySelector(".nw2").classList.remove("nw2");
        document.querySelector(".text").classList.remove("text");
      }, delayInMilliseconds);
    }

    function sendMessageToBot2(message) {
      loadingBotResponse();

      const delayInMilliseconds = 2000;
      setTimeout(function () {
        const botResponse = generateBotResponse(message.text);
        messageSender2 = "bot";
        sendResponse2(botResponse);

        const loadingElement = chatMessages2.querySelector(".loading-element"); // Assuming you added a class to the loading element
        if (loadingElement) {
          chatMessages2.removeChild(loadingElement);
        }
      }, delayInMilliseconds);
    }

    function loadingBotResponse() {
      const loading = `
       <img src="Images/icons/moon-rover_9477685.png" class="bot-img" alt="">
       <div class="nw2 bot loading-element">
          <button class="btn btn-primary out" type="button">
            <span class="spinner-grow spinner-grow-sm thinking" aria-hidden="true"></span>
            <span role="status">Thinking...</span>
          </button>
       </div>
     `;
      chatMessages2.innerHTML += loading;
    }

    //bot messages typing function
    function typeBotMessage() {
      // Get the last bot message element
      const lastBotMessage = chatMessages2.querySelector(
        ".bot:last-child .message-text"
      );
      if (lastBotMessage) {
        const textToType = lastBotMessage.textContent;
        lastBotMessage.innerHTML = ""; // Clear the content
        charIndex = 0; // Reset character index

        function typeChar() {
          if (charIndex < textToType.length) {
            if (textToType[charIndex] === "\n") {
              lastBotMessage.innerHTML += "<br>";
            } else {
              lastBotMessage.innerHTML += textToType.charAt(charIndex);
            }
            charIndex++;
            setTimeout(typeChar, 50); // Adjust typing speed (milliseconds)
          }
        }
        typeChar(); // Start typing the bot's message
      }
    }
  }

  function closePopupChat() {
    popupChatContainer.css("display", "block");
  }

  function outsideClickChat(event) {
    if ($(event.target).is(popupChatContainer)) {
      popupChatContainer.css("display", "none");
    }
  }

  //--------------------------------------Test section--------------------------------------------
  var popupTestBtn = $("#popup-button-test");
  var popupTestContainer = $("#popup-container-test");
  var closeTestBtn = $("#close-test-button");

  popupTestBtn.on("click", openPopupTest);
  closeTestBtn.on("click", closePopupTest);
  popupTestContainer.on("click", outsideClickTest);

  function openPopupTest() {
    popupTestContainer.css("display", "block");

    //--------------------load test name and intro----------------------------
    var test_heads = [];
    var test_intro = [];

    for (let i = 1; i <= 12; i++) {
      test_heads[i] = document.getElementById("test-head-" + i);
      test_intro[i] = document.getElementById("test-intro-" + i);
    }

    loadTestData(function (data) {
      data.forEach(function (row, index) {
        if (index >= 0 && index < 12) {
          test_heads[index + 1].textContent = row.test_name;
          test_intro[index + 1].textContent = row.intro;
        }
      });
    });

    var popupInnerTestContainer = $("#popup-container-inner-test");
    var closeInnerTestBtn = $("#close-inner-test-button");
    var testButtons = document.querySelectorAll(".btn-test");

    testButtons.forEach(function (button) {
      button.addEventListener("click", function (event) {
        var buttonValue = event.target.value;
        openPopupInnerTest(buttonValue);
      });
    });

    closeInnerTestBtn.on("click", closePopupInnerTest);
    popupInnerTestContainer.on("click", outsideClickInnerTest);

    function openPopupInnerTest(test) {
      popupInnerTestContainer.css("display", "block");
      popupTestContainer.css("display", "none");

      var questionNumContainer = document.querySelector("#qNum");
      var questionContainer = document.querySelector("#qu");
      var anserBtn = document.querySelectorAll(".btn-ans");

      //---------------------------function to display test results------------------------------------
      function viewResult(testName, resultValue) {
        var popupTestResultContainer = $("#popup-container-test-result");
        var closeTestResultBtn = $("#close-test-result-button");
        var testNameDiv = document.getElementById("testName");
        var recommandDiv = document.getElementById("recommand");
        var textDiv = document.getElementById("read-text");
        testNameDiv.textContent = testName + " ";

        popupInnerTestContainer.css("display", "none");
        popupTestResultContainer.css("display", "block");
        closeTestResultBtn.on("click", function () {
          popupTestResultContainer.css("display", "none");
        });
        var risk = null;

        var words = testName.split(" ");
        var dissoderName = words[0];

        if (resultValue > 150) {
          risk = true;
          textDiv.style.display = "block";
          recommandDiv.textContent =
            "Your responses indicate that You are likely to have " +
            dissoderName +
            " disorder. Please start a therapy as soon as possible.";
        } else {
          risk = false;
          textDiv.style.display = "none";
          recommandDiv.textContent =
            "Your responses indicate that You are likely to haven't " +
            dissoderName +
            " disorder. So no need to be worry";
        }
      }

      //-----------------------------function to update progress bar-----------------------------------
      var progressBar = document.getElementById("progress-bar");
      var targetWidth = 0;
      var duration = 1000;
      var startTime;

      function updateProgressBar(timestamp) {
        if (!startTime) {
          startTime = timestamp;
        }
        var elapsedTime = timestamp - startTime;

        if (elapsedTime < duration) {
          var progress = elapsedTime / duration;
          var currentWidth = progress * (targetWidth - 15) + 15;
          progressBar.style.width = currentWidth + "%";
          requestAnimationFrame(updateProgressBar);
        } else {
          progressBar.style.width = targetWidth + "%";
        }
      }
      requestAnimationFrame(updateProgressBar);

      loadTestData(function (data) {
        data.forEach(function (row, index) {
          targetWidth = 0;

          if (index == 0 && test == "test1") {
            var testName = row.test_name;
            var i = 0;
            var val = 0;
            var resultValue = 0;
            questionNumContainer.textContent = i + 1;
            questionContainer.textContent = row.Q1;

            anserBtn.forEach(function (button) {
              button.addEventListener("click", function (event) {
                if (i < 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);

                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;

                  var columnKey = "Q" + (i + 2);
                  var question = row[columnKey];
                  questionContainer.textContent = question;
                  questionNumContainer.textContent = i + 2;
                  i++;
                } else if (i == 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);
                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;
                  viewResult(testName, resultValue);
                }
              });
            });
          }

          if (index == 1 && test == "test2") {
            var testName = row.test_name;
            var i = 0;
            var val = 0;
            var resultValue = 0;
            questionNumContainer.textContent = i + 1;
            questionContainer.textContent = row.Q1;

            anserBtn.forEach(function (button) {
              button.addEventListener("click", function (event) {
                if (i < 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);

                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;

                  var columnKey = "Q" + (i + 2);
                  var question = row[columnKey];
                  questionContainer.textContent = question;
                  questionNumContainer.textContent = i + 2;
                  i++;
                } else if (i == 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);
                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;
                  viewResult(testName, resultValue);
                }
              });
            });
          }

          if (index == 2 && test == "test3") {
            var testName = row.test_name;
            var i = 0;
            var val = 0;
            var resultValue = 0;
            questionNumContainer.textContent = i + 1;
            questionContainer.textContent = row.Q1;

            anserBtn.forEach(function (button) {
              button.addEventListener("click", function (event) {
                if (i < 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);

                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;

                  var columnKey = "Q" + (i + 2);
                  var question = row[columnKey];
                  questionContainer.textContent = question;
                  questionNumContainer.textContent = i + 2;
                  i++;
                } else if (i == 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);
                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;
                  viewResult(testName, resultValue);
                }
              });
            });
          }

          if (index == 3 && test == "test4") {
            var testName = row.test_name;
            var i = 0;
            var val = 0;
            var resultValue = 0;
            questionNumContainer.textContent = i + 1;
            questionContainer.textContent = row.Q1;

            anserBtn.forEach(function (button) {
              button.addEventListener("click", function (event) {
                if (i < 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);

                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;

                  var columnKey = "Q" + (i + 2);
                  var question = row[columnKey];
                  questionContainer.textContent = question;
                  questionNumContainer.textContent = i + 2;
                  i++;
                } else if (i == 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);
                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;
                  viewResult(testName, resultValue);
                }
              });
            });
          }

          if (index == 4 && test == "test5") {
            var testName = row.test_name;
            var i = 0;
            var val = 0;
            var resultValue = 0;
            questionNumContainer.textContent = i + 1;
            questionContainer.textContent = row.Q1;

            anserBtn.forEach(function (button) {
              button.addEventListener("click", function (event) {
                if (i < 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);

                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;

                  var columnKey = "Q" + (i + 2);
                  var question = row[columnKey];
                  questionContainer.textContent = question;
                  questionNumContainer.textContent = i + 2;
                  i++;
                } else if (i == 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);
                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;
                  viewResult(testName, resultValue);
                }
              });
            });
          }

          if (index == 5 && test == "test6") {
            var testName = row.test_name;
            var i = 0;
            var val = 0;
            var resultValue = 0;
            questionNumContainer.textContent = i + 1;
            questionContainer.textContent = row.Q1;

            anserBtn.forEach(function (button) {
              button.addEventListener("click", function (event) {
                if (i < 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);

                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;

                  var columnKey = "Q" + (i + 2);
                  var question = row[columnKey];
                  questionContainer.textContent = question;
                  questionNumContainer.textContent = i + 2;
                  i++;
                } else if (i == 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);
                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;
                  viewResult(testName, resultValue);
                }
              });
            });
          }

          if (index == 6 && test == "test7") {
            var testName = row.test_name;
            var i = 0;
            var val = 0;
            var resultValue = 0;
            questionNumContainer.textContent = i + 1;
            questionContainer.textContent = row.Q1;

            anserBtn.forEach(function (button) {
              button.addEventListener("click", function (event) {
                if (i < 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);

                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;

                  var columnKey = "Q" + (i + 2);
                  var question = row[columnKey];
                  questionContainer.textContent = question;
                  questionNumContainer.textContent = i + 2;
                  i++;
                } else if (i == 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);
                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;
                  viewResult(testName, resultValue);
                }
              });
            });
          }

          if (index == 7 && test == "test8") {
            var testName = row.test_name;
            var i = 0;
            var val = 0;
            var resultValue = 0;
            questionNumContainer.textContent = i + 1;
            questionContainer.textContent = row.Q1;

            anserBtn.forEach(function (button) {
              button.addEventListener("click", function (event) {
                if (i < 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);

                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;

                  var columnKey = "Q" + (i + 2);
                  var question = row[columnKey];
                  questionContainer.textContent = question;
                  questionNumContainer.textContent = i + 2;
                  i++;
                } else if (i == 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);
                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;
                  viewResult(testName, resultValue);
                }
              });
            });
          }

          if (index == 8 && test == "test9") {
            var testName = row.test_name;
            var i = 0;
            var val = 0;
            var resultValue = 0;
            questionNumContainer.textContent = i + 1;
            questionContainer.textContent = row.Q1;

            anserBtn.forEach(function (button) {
              button.addEventListener("click", function (event) {
                if (i < 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);

                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;

                  var columnKey = "Q" + (i + 2);
                  var question = row[columnKey];
                  questionContainer.textContent = question;
                  questionNumContainer.textContent = i + 2;
                  i++;
                } else if (i == 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);
                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;
                  viewResult(testName, resultValue);
                }
              });
            });
          }

          if (index == 9 && test == "test10") {
            var testName = row.test_name;
            var i = 0;
            var val = 0;
            var resultValue = 0;
            questionNumContainer.textContent = i + 1;
            questionContainer.textContent = row.Q1;

            anserBtn.forEach(function (button) {
              button.addEventListener("click", function (event) {
                if (i < 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);

                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;

                  var columnKey = "Q" + (i + 2);
                  var question = row[columnKey];
                  questionContainer.textContent = question;
                  questionNumContainer.textContent = i + 2;
                  i++;
                } else if (i == 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);
                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;
                  viewResult(testName, resultValue);
                }
              });
            });
          }

          if (index == 10 && test == "test11") {
            var testName = row.test_name;
            var i = 0;
            var val = 0;
            var resultValue = 0;
            questionNumContainer.textContent = i + 1;
            questionContainer.textContent = row.Q1;

            anserBtn.forEach(function (button) {
              button.addEventListener("click", function (event) {
                if (i < 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);

                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;

                  var columnKey = "Q" + (i + 2);
                  var question = row[columnKey];
                  questionContainer.textContent = question;
                  questionNumContainer.textContent = i + 2;
                  i++;
                } else if (i == 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);
                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;
                  viewResult(testName, resultValue);
                }
              });
            });
          }

          if (index == 11 && test == "test12") {
            var testName = row.test_name;
            var i = 0;
            var val = 0;
            var resultValue = 0;
            questionNumContainer.textContent = i + 1;
            questionContainer.textContent = row.Q1;

            anserBtn.forEach(function (button) {
              button.addEventListener("click", function (event) {
                if (i < 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);

                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;

                  var columnKey = "Q" + (i + 2);
                  var question = row[columnKey];
                  questionContainer.textContent = question;
                  questionNumContainer.textContent = i + 2;
                  i++;
                } else if (i == 9) {
                  targetWidth = targetWidth + 10;
                  requestAnimationFrame(updateProgressBar);
                  val = parseInt(event.target.value);
                  resultValue = resultValue + val;
                  viewResult(testName, resultValue);
                }
              });
            });
          }
        });
      });

      var backToTestBtn = $("#back-to-test-button");
      backToTestBtn.on("click", backToTest);

      function backToTest() {
        popupInnerTestContainer.css("display", "none");
        popupTestContainer.css("display", "block");
      }
    }
    function closePopupInnerTest() {
      popupInnerTestContainer.css("display", "none");
    }
    function outsideClickInnerTest(event) {
      if ($(event.target).is(popupInnerTestContainer)) {
        popupInnerTestContainer.css("display", "none");
      }
    }
  }

  function closePopupTest() {
    popupTestContainer.css("display", "none");
  }

  function outsideClickTest(event) {
    if ($(event.target).is(popupTestContainer)) {
      popupTestContainer.css("display", "none");
    }
  }

  //------------------------------function to get testing data from php----------------------------------
  function loadTestData(callback) {
    $.ajax({
      type: "GET",
      url: "http://localhost/login/Mental%20Health%20Management%20System/php/testing.php",
      success: function (response) {
        var testData = JSON.parse(response);
        callback(testData);
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  //--------------------------------------Progress section--------------------------------------------
  var popupProgressBtn = $("#popup-button-progress");
  var popupProgressContainer = $("#popup-container-progress");
  var closeProgressBtn = $("#close-progress-button");

  popupProgressBtn.on("click", openPopupProgress);
  closeProgressBtn.on("click", closePopupProgress);
  popupProgressContainer.on("click", outsideClickProgress);

  function openPopupProgress() {
    popupProgressContainer.css("display", "block");

    //------------function to load progress data from php--------------
    function getDailyProgressData(callback) {
      var postData = {
        pid: localStorage.getItem("myData"),
      };

      $.ajax({
        type: "GET",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/progress.php",
        data: postData,
        success: function (response) {
          var data = JSON.parse(response);
          callback(data);
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    }

    //-------------------------------load weekly progress spinner---------------------------------
    function weeklyProgressSpinner() {
      const currentDate = new Date();
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      const formattedDate = currentDate.toLocaleDateString("en-US", options);
      var progressData = [];

      getDailyProgressData(function (data) {
        var loop = 0;

        data.forEach(function (row, index) {
          if (row.date == formattedDate) {
            loop = index;
          }
        });

        data.forEach(function (row, index) {
          if (index > loop - 7 && index <= loop) {
            progressData.push(row.daily_score * 20);
          }
        });

        const sum = progressData.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        const avg = Math.round(sum / 7);

        const circle = document.querySelector("#cr1");
        let Wnumber = document.getElementById("Wnumber");
        let counter1 = 0;
        setInterval(() => {
          if (counter1 == avg) {
            clearInterval();
          } else {
            counter1 += 1;
            Wnumber.innerHTML = counter1 + "%";
          }
        }, 30);

        updateSpinner(circle, avg);
      });
    }

    //-------------------------------load monthly progress spinner---------------------------------
    function monthlyProgressSpinner() {
      const currentDate = new Date();
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      const formattedDate = currentDate.toLocaleDateString("en-US", options);
      var progressData = [];

      getDailyProgressData(function (data) {
        var loop = 0;

        data.forEach(function (row, index) {
          if (row.date == formattedDate) {
            loop = index;
          }
        });

        data.forEach(function (row, index) {
          if (index > loop - 30 && index <= loop) {
            progressData.push(row.daily_score * 20);
          }
        });

        const sum = progressData.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        const avg = Math.round(sum / 30);

        const circle = document.querySelector("#cr2");
        let Mnumber = document.getElementById("Mnumber");
        let counter2 = 0;
        setInterval(() => {
          if (counter2 == avg) {
            clearInterval();
          } else {
            counter2 += 1;
            Mnumber.innerHTML = counter2 + "%";
          }
        }, 30);

        updateSpinner(circle, avg);
      });
    }

    //-------------------------------load yearly progress spinner---------------------------------
    function yearlyProgressSpinner() {
      var progressData = [];

      getProgressData(function (data) {
        data.forEach(function (row) {
          progressData.push(parseInt(row.progress.slice(0, 2)));
        });

        const sum = progressData.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        const avg = Math.round(sum / 12);

        const circle = document.querySelector("#cr3");
        let Ynumber = document.getElementById("Ynumber");
        let counter3 = 0;
        setInterval(() => {
          if (counter3 == avg) {
            clearInterval();
          } else {
            counter3 += 1;
            Ynumber.innerHTML = counter3 + "%";
          }
        }, 30);

        updateSpinner(circle, avg);
      });
    }

    function updateSpinner(circle, avg) {
      if (avg == 100) {
        circle.style.animation = "anime5 2s linear forwards";
      }
      if (avg >= 90 && avg < 100) {
        circle.style.animation = "anime6 2s linear forwards";
      }
      if (avg >= 80 && avg < 90) {
        circle.style.animation = "anime1 2s linear forwards";
      }
      if (avg >= 70 && avg < 80) {
        circle.style.animation = "anime10 2s linear forwards";
      }
      if (avg >= 60 && avg < 70) {
        circle.style.animation = "anime2 2s linear forwards";
      }
      if (avg >= 50 && avg < 60) {
        circle.style.animation = "anime9 2s linear forwards";
      }
      if (avg >= 40 && avg < 50) {
        circle.style.animation = "anime3 2s linear forwards";
      }
      if (avg >= 30 && avg < 40) {
        circle.style.animation = "anime8 2s linear forwards";
      }
      if (avg >= 20 && avg < 30) {
        circle.style.animation = "anime4 2s linear forwards";
      }
      if (avg >= 10 && avg < 20) {
        circle.style.animation = "anime7 2s linear forwards";
      }
    }

    weeklyProgressSpinner();
    monthlyProgressSpinner();
    yearlyProgressSpinner();

    function animateBars() {
      const bars = document.getElementsByClassName("pbar");
      var progressData = [];
      var dayData = [];
      var dayTg = [];
      const currentDate = new Date();
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      const formattedDate = currentDate.toLocaleDateString("en-US", options);

      getDailyProgressData(function (data) {
        var loop = 0;
        for (let i = 0; i <= 10; i++) {
          dayTg[i] = document.getElementById("dayTag-" + i);
        }

        data.forEach(function (row, index) {
          if (row.date == formattedDate) {
            loop = index;
          }
        });

        data.forEach(function (row, index) {
          if (index > loop - 11 && index <= loop) {
            progressData.push(row.daily_score * 20 + "%");
            dayData.push(row.date);
          }
        });

        for (let i = 0; i < bars.length; i++) {
          const bar = bars[i];
          const height = progressData[i];
          const dayTag = dayData[i].slice(3, 5);
          dayTg[i].textContent = dayTag + "th";
          bar.style.height = "0%";

          setTimeout(() => {
            bar.classList.add("animate");
            bar.style.height = height;
          }, i * 200);
        }
      });
    }

    animateBars();
  }

  function closePopupProgress() {
    popupProgressContainer.css("display", "none");
  }

  function outsideClickProgress(event) {
    if ($(event.target).is(popupProgressContainer)) {
      popupProgressContainer.css("display", "none");
    }
  }

  //--------------------------------------Report section--------------------------------------------
  var popupReportBtn = $("#popup-button-report");
  var popupReportContainer = $("#popup-container-report");
  var closeReportBtn = $("#close-report-button");

  popupReportBtn.on("click", openPopupReport);
  closeReportBtn.on("click", closePopupReport);
  popupReportContainer.on("click", outsideClickReport);

  function openPopupReport() {
    popupReportContainer.css("display", "block");

    var toggleApproval = document.getElementById("toggleApproval");
    var docApprov = $("#docApprov");
    var generateReportButton = $("#generateReportBtn");
    var generatePdfButton = $("#generatePdfButton");

    toggleApproval.addEventListener("change", (event) => {
      if (event.target.checked) {
        docApprov.css("display", "block");
        generatePdfButton.prop("disabled", true);
      } else {
        docApprov.css("display", "none");
        generatePdfButton.prop("disabled", false);
      }
    });

    function saveReportToPHP(reportData) {
      $.ajax({
        type: "POST",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/report.php",
        data: reportData,
        success: function (response) { 
          if(response == "success") {
            var notification = {
              title: "Report send successfull",
              message: "Your report has been sent to your doctor. After doctor approved the report you will receive a notification.",
              ntype: "message"
            };
            addNotification(notification);
          }
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    }

    //-------------------------function to get report data from php----------------------------
    function getDisoderData(callback) {
      var postData = {
        pid: localStorage.getItem("myData"),
      };

      $.ajax({
        type: "GET",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/report.php",
        data: postData,
        success: function (response) {
          if (response == "failed") {
            alert(
              "You can't get report before your doctor add medical informations"
            );
          } else {
            var data = JSON.parse(response);
            callback(data);
          }
        },
        error: function (xhr, status, error) {
          onsole.error(xhr.responseText);
        },
      });
    }

    generateReportButton.on("click", function () {
      getDisoderData(function (data) {
        var spinner = document.getElementById("spinner");
        spinner.style.display = "block";

        const reportContainer = document.getElementById("reportContainer");
        var toggleDiscription = document.getElementById("toggleDiscription");

        if (toggleDiscription.checked) {
          setTimeout(() => {
            spinner.style.display = "none";

            var disorderList = data.disorderList.split(",");

            const report = generateReport1(
              data.id,
              data.docId,
              data.firstName + " " + data.lastName,
              data.age,
              data.gender,
              data.eMail,
              data.userImage,
              data.primaryConcern,
              data.diagnosis,
              data.symptoms,
              data.treatmentPlan,
              data.additionalNotes,
              disorderList[0],
              disorderList[1],
              data.about1,
              data.about2
            );
            reportContainer.innerHTML = report;
          }, 5000);
        } else {
          setTimeout(() => {
            spinner.style.display = "none";

            const report = generateReport2(
              data.firstName + " " + data.lastName,
              data.age,
              data.gender,
              data.eMail,
              data.userImage,
              data.primaryConcern,
              data.diagnosis,
              data.symptoms,
              data.treatmentPlan,
              data.additionalNotes
            );
            reportContainer.innerHTML = report;
          }, 5000);
        }
      });
    });

    function generateReport1(
      pid,
      docId,
      patientName,
      age,
      gender,
      email,
      userImage,
      primaryConcern,
      diagnosis,
      symptoms,
      treatmentPlan,
      additionalNotes,
      disorder1,
      disorder2,
      about1,
      about2
    ) {
      var toggleApproval = document.getElementById("toggleApproval");
      if (toggleApproval.checked === true) {
        const reportData = {
          pid: pid,
          docId: docId,
          pName: patientName,
          age: age,
          gender: gender,
          email: email,
          userImage: userImage,
          primaryConcern: primaryConcern,
          diagnosis: diagnosis,
          symptoms: symptoms,
          treatmentPlan: treatmentPlan,
          additionalNotes: additionalNotes,
          disorder1: disorder1,
          disorder2: disorder2,
          about1: about1,
          about2: about2,
        };
        saveReportToPHP(reportData);
      }

      const template = `
      <div class="report">
    
      <img src="Images/logo7.png" style="margin-left: 230px; height: 80px;" alt=""><br><br>
      
          <h4>Mental Health Report for ${patientName}</h4><br>
          
          <h5>Personal Information:</h5>
          <ul>
              <li><strong>Name:</strong> ${patientName}</li>
              <li><strong>Age:</strong> ${age}</li>
              <li><strong>Gender:</strong> ${gender}</li>
              <li><strong>Contact Email:</strong> ${email}</li>
          </ul>
          
          <h5>Mental Health Details:</h5>
          <ul>
              <li><strong>Primary Concern:</strong> ${primaryConcern}</li>
              <li><strong>Diagnosis:</strong> ${diagnosis}</li>
              <li><strong>Symptoms:</strong> ${symptoms}</li>
              <li><strong>Treatment Plan:</strong> ${treatmentPlan}</li>
          </ul><br>
    
          <h5>${disorder1}</h5>
          <h6>${about1}</h6><br>
    
          <h5>${disorder2}</h5>
          <h6>${about2}</h6><br>
    
          <h5>Additional Notes:</h5>
          <p>${additionalNotes}</p>
          
          <p>Please remember that this report is not a substitute for professional advice. Reach out to a mental health professional for personalized guidance.</p>
          
          <p>Best regards,<br>Your Mental Health Team</p>
          <h6>www.Brainstorm.com</h6>
    
      </div>
      `;

      return template;
    }

    function generateReport2(
      patientName,
      age,
      gender,
      email,
      userImage,
      primaryConcern,
      diagnosis,
      symptoms,
      treatmentPlan,
      additionalNotes
    ) {
      var toggleApproval = document.getElementById("toggleApproval");
      if (toggleApproval.checked === true) {
        const reportData = {
          pid: pid,
          docId: docId,
          pName: patientName,
          age: age,
          gender: gender,
          email: email,
          userImage: userImage,
          primaryConcern: primaryConcern,
          diagnosis: diagnosis,
          symptoms: symptoms,
          treatmentPlan: treatmentPlan,
          additionalNotes: additionalNotes,
          disorder1: disorder1,
          disorder2: disorder2,
          about1: about1,
          about2: about2,
        };
        saveReportToPHP(reportData);
      }

      const template = `
      <div class="report">
    
      <img src="Images/logo7.png" style="margin-left: 230px; height: 80px;" alt=""><br><br>
      
          <h4>Mental Health Report for ${patientName}</h4><br>
          
          <h5>Personal Information:</h5>
          <ul>
              <li><strong>Name:</strong> ${patientName}</li>
              <li><strong>Age:</strong> ${age}</li>
              <li><strong>Gender:</strong> ${gender}</li>
              <li><strong>Contact Email:</strong> ${email}</li>
          </ul>
          
          <h5>Mental Health Details:</h5>
          <ul>
              <li><strong>Primary Concern:</strong> ${primaryConcern}</li>
              <li><strong>Diagnosis:</strong> ${diagnosis}</li>
              <li><strong>Symptoms:</strong> ${symptoms}</li>
              <li><strong>Treatment Plan:</strong> ${treatmentPlan}</li>
          </ul><br>
    
          <h5>Additional Notes:</h5>
          <p>${additionalNotes}</p>
          
          <p>Please remember that this report is not a substitute for professional advice. Reach out to a mental health professional for personalized guidance.</p>
          
          <p>Best regards,<br>Your Mental Health Team</p>
          <h6>www.Brainstorm.com</h6>
    
      </div>
      `;

      return template;
    }

    //-------------------------------Download the report as a PDF----------------------------------------
    document
      .getElementById("generatePdfButton")
      .addEventListener("click", function () {
        const reportContainer = document.getElementById("reportContainer");

        const pdf = new jsPDF();

        pdf.fromHTML(reportContainer, 15, 15, { width: 170 }, function () {
          pdf.save("webpage.pdf");
        });
      });
  }

  function closePopupReport() {
    popupReportContainer.css("display", "none");
  }

  function outsideClickReport(event) {
    if ($(event.target).is(popupReportContainer)) {
      popupReportContainer.css("display", "none");
    }
  }

  //--------------------------------------Settings section--------------------------------------------
  var popupSettingsBtn = $("#popup-button-settings");
  var popupSettingsContainer = $("#popup-container-settings");
  var closeSettingsBtn = $("#close-settings-button");

  popupSettingsBtn.on("click", openPopupSettings);
  closeSettingsBtn.on("click", closePopupSettings);
  popupSettingsContainer.on("click", outsideClickSettings);

  function openPopupSettings() {
    popupSettingsContainer.css("display", "block");
  }

  function closePopupSettings() {
    popupSettingsContainer.css("display", "none");
  }

  function outsideClickSettings(event) {
    if ($(event.target).is(popupSettingsContainer)) {
      popupSettingsContainer.css("display", "none");
    }
  }

  //--------------------------------------Logout section--------------------------------------------
  var popupLogoutBtn = $("#popup-button-logout");
  var popupLogoutContainer = $("#popup-container-logout");
  var closeLogoutBtn = $("#close-logout-button");

  popupLogoutBtn.on("click", openPopupLogout);
  closeLogoutBtn.on("click", closePopupLogout);
  popupLogoutContainer.on("click", outsideClickLogout);

  function openPopupLogout() {
    popupLogoutContainer.css("display", "block");

    document.getElementById("loggingout-btn").onclick = function () {
      var postData = {
        role: "patient",
      };

      $.ajax({
        type: "POST",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/logout.php",
        data: postData,
        success: function (response) {
          var response = JSON.parse(response);
          if (response == "session_destroyed") {
            window.location.href = "index.html";
          }
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    };
  }

  function closePopupLogout() {
    popupLogoutContainer.css("display", "none");
  }

  function outsideClickLogout(event) {
    if ($(event.target).is(popupLogoutContainer)) {
      popupLogoutContainer.css("display", "none");
    }
  }

  //--------------------------------------Profile section--------------------------------------------
  var popupProfileBtn = $("#popup-button-profile");
  var popupProfileContainer = $("#popup-container-profile");
  var closeProfileBtn = $("#close-profile-button");
  var popupProfileContent = document.getElementById("popup-content-profile");
  var pwclick = document.getElementById("pwclick");
  var genclick = document.getElementById("genclick");

  popupProfileBtn.on("click", openPopupProfile);
  closeProfileBtn.on("click", closePopupProfile);
  popupProfileContainer.on("click", outsideClickProfile);

  function openPopupProfile() {
    popupProfileContainer.css("display", "block");

    $(function () {
      $(".datepicker").datepicker();
    });

    var id = document.getElementById("id");
    var name1 = document.getElementById("name1");
    var name2 = document.getElementById("name2");
    var dob = document.getElementById("dob");
    var age = document.getElementById("age");
    var gender = document.getElementById("cmbgender");
    var address = document.getElementById("address");
    var email = document.getElementById("email");
    var con1 = document.getElementById("contactno1");
    var con2 = document.getElementById("contactno2");
    var uname = document.getElementById("un");
    var pword = document.getElementById("pw");

    //-------------------load the data from php-------------------
    getUserData(function (user) {
      id.value = user.id;
      name1.value = user.name1;
      name2.value = user.name2;
      dob.value = user.dob;
      age.value = user.age;
      gender.value = user.gender;
      address.value = user.address;
      email.value = user.email;
      con1.value = user.contactno1;
      con2.value = user.contactno2;
      uname.value = user.username;
      pword.value = user.password;
      localStorage.setItem("docId-p", user.docId);
    });
    //-------------------load the data from php-------------------

    popupProfileContent.addEventListener("click", function (event) {
      if (event.target !== pwclick && !pwclick.contains(event.target)) {
        pword.type = "password";
        pword.readOnly = true;
      }
      if (event.target !== genclick && !genclick.contains(event.target)) {
        gender.querySelector('option[value="Male"]').disabled = true;
        gender.querySelector('option[value="Female"]').disabled = true;
      }
    });

    uname.addEventListener("input", function (event) {
      var text1 = event.target.value;
      validateUN(text1);
      //displaylbluser(text1);
    });

    pword.addEventListener("input", function (event) {
      var text2 = event.target.value;
      validatePW(text2);
      displaylblpass(text2);
    });

    con1.addEventListener("input", function (event) {
      var text3 = event.target.value;
      validateCON1(text3);
      displaylblcon1(text3);
    });

    con2.addEventListener("input", function (event) {
      var text = event.target.value;
      validateCON2(text);
      displaylblcon2(text);
    });

    email.addEventListener("input", function (event) {
      var text4 = event.target.value;
      validateEM(text4);
      displaylblmail(text4);
    });

    name1.addEventListener("input", function (event) {
      var text5 = event.target.value;
      validateNM1(text5);
      displaylbln1(text5);
    });

    name2.addEventListener("input", function (event) {
      var text6 = event.target.value;
      validateNM2(text6);
      displaylbln2(text6);
    });

    dob.addEventListener("input", function (event) {
      var text7 = event.target.value;
      validatedob(text7);
      displaylbldob(text7);
    });

    age.addEventListener("input", function (event) {
      var text8 = event.target.value;
      validateage(text8);
      displaylblage(text8);
    });

    gender.addEventListener("change", function () {
      var text9 = gender.value;
      validategender(text9);
      displaylblgender(text9);
    });

    address.addEventListener("input", function (event) {
      var text10 = event.target.value;
      validateaddress(text10);
      displaylbladdress(text10);
    });

    function validateUN(text1) {
      if (text1.length > 20 || text1.length < 2) {
        uname.classList.add("is-invalid");
      } else {
        uname.classList.remove("is-invalid");
        uname.classList.add("is-valid");
      }
    }

    function validatePW(text2) {
      var containsNumber = /\d/.test(text2);
      if (text2.length < 5 || !containsNumber) {
        pword.classList.add("is-invalid");
      } else {
        pword.classList.remove("is-invalid");
        pword.classList.add("is-valid");
      }
    }

    function validateCON1(text3) {
      var pattern = /^\d{10}$/;
      if (!pattern.test(text3)) {
        con1.classList.add("is-invalid");
      } else {
        con1.classList.remove("is-invalid");
        con1.classList.add("is-valid");
      }
    }

    function validateCON2(text) {
      var pattern = /^\d{10}$/;
      if (!pattern.test(text)) {
        con2.classList.add("is-invalid");
      } else {
        con2.classList.remove("is-invalid");
        con2.classList.add("is-valid");
      }
    }

    function validateEM(text4) {
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(text4)) {
        email.classList.add("is-invalid");
      } else {
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
      }
    }

    function validateNM1(text5) {
      var pattern = /^[a-zA-Z]+$/;
      if (pattern.test(text5)) {
        name1.classList.remove("is-invalid");
        name1.classList.add("is-valid");
      } else {
        name1.classList.add("is-invalid");
      }
    }

    function validateNM2(text6) {
      var pattern = /^[a-zA-Z]+$/;
      if (pattern.test(text6)) {
        name2.classList.remove("is-invalid");
        name2.classList.add("is-valid");
      } else {
        name2.classList.add("is-invalid");
      }
    }

    function validatedob(text7) {
      var pattern = /^(0[1-9]|1[0-2])\/([0-2][0-9]|3[01])\/\d{4}$/;
      if (pattern.test(text7)) {
        dob.classList.remove("is-invalid");
        dob.classList.add("is-valid");
      } else {
        dob.classList.add("is-invalid");
      }
    }

    function validateage(text8) {
      var age1 = parseInt(text8);
      if (age1 >= 16 && age1 < 120) {
        age.classList.remove("is-invalid");
        age.classList.add("is-valid");
      } else {
        age.classList.add("is-invalid");
      }
    }

    function validategender(text9) {
      if (text9 != "Gender") {
        gender.classList.remove("is-invalid");
        gender.classList.add("is-valid");
      } else {
        gender.classList.add("is-invalid");
      }
    }

    function validateaddress(text10) {
      var pattern = /^([^,]+),([^,]+),(.+)$/;
      if (pattern.test(text10)) {
        address.classList.remove("is-invalid");
        address.classList.add("is-valid");
      } else {
        address.classList.add("is-invalid");
      }
    }

    //-----------------update user infor by php-----------------
    $("#updateDetails").submit(function (event) {
      gender.querySelector('option[value="Male"]').disabled = false;
      gender.querySelector('option[value="Female"]').disabled = false;
      event.preventDefault();
      const formData = new FormData(this);

      if (imageInput.files.length > 0) {
        formData.append("user_image", imageInput.files[0]);
      }

      $.ajax({
        type: "POST",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/updatePatientInfo.php",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          $("#success-message").text(response);
          $("#success-container").show();

          setTimeout(function () {
            $("#success-container").hide();
          }, 2000);
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    });

    const imageInput = document.querySelector("#image_input");
    var uploadImage = "";

    imageInput.addEventListener("change", function () {
      const reader = new FileReader();
      const selectedFile = this.files[0];
      if (!selectedFile) {
      }
      reader.addEventListener("load", () => {
        uploadImage = reader.result;
        document.querySelector("#display_image").src = uploadImage;
      });
      reader.readAsDataURL(this.files[0]);
    });
  }

  function closePopupProfile() {
    popupProfileContainer.css("display", "none");
  }

  function outsideClickProfile(event) {
    if ($(event.target).is(popupProfileContainer)) {
      popupProfileContainer.css("display", "none");
    }
  }

  //--------------------------------------notification section--------------------------------------------

  var popupNotificationBtn = $("#popup-button-notification");
  var popupNotificationContainer = $("#popup-container-notification");
  var closeNotificationBtn = $("#close-notification-button");
  //var popupNotificationContent = document.getElementById("popup-content-notification");

  popupNotificationBtn.on("click", openPopupNotification);
  closeNotificationBtn.on("click", closePopupNotification);
  popupNotificationContainer.on("click", outsideClickNotification);

  function openPopupNotification() {
    popupNotificationContainer.css("display", "block");

    // Function to retrieve chat list from PHP
    function getNoticationsFromPHP(data) {  
      if (data == "view"){
        var postData = {
          type: data
        };
      }
      else {
        var postData = {
          type: "delete",
          id: data
        };
      }
      

      $.ajax({
        type: 'POST',
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/notifications.php",
        data: postData,
        success: function (response) {  

          if (data == "view"){
            var notificationData = JSON.parse(response);
            updateNotifications(notificationData);
          }
          else {
            getNoticationsFromPHP("view")
          }
          
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    }

    getNoticationsFromPHP("view")
    
    // Function to update the chat list with data
    function updateNotifications(notificationData) {
      var notificationList = document.getElementById("notification-list");
      notificationList.innerHTML = "";

      // Loop through the chat data and create list items
      notificationData.forEach(function (notificationItem) {

        var listItem = document.createElement("li");
        listItem.className = "notification-item d-flex";
        listItem.id = notificationItem.id;
        var imagePath = null;

        switch(notificationItem.type) {
          case "message": 
            imagePath = "Images/icons/sound_12484182.png";
            break;
            
          case "warning":
            imagePath = "Images/icons/exclamation-mark_3588294.png";
            break;
        }

        // Create and set the image element
        var img = document.createElement("img");
        img.src = imagePath; 
        img.className = "notification-img";

        // Create and set the massege element
        var message = document.createElement("h6");
        message.type = "button";
        message.textContent = notificationItem.title; 

        // Add a click event listener using a closure
        listItem.addEventListener(
          "click",
          (function (listItem) {
            return function () {
              notificationItemClickHandler(notificationItem);
            };
          })(listItem)
        );

        listItem.appendChild(img);
        listItem.appendChild(message);
        // Append the list item to the chat list
        notificationList.appendChild(listItem);
      });
    }

    function notificationItemClickHandler(notificationItem){ 

      var notificationViwer = $("#popup-container-notificationViewer");
      notificationViwer.css("display", "block");

      document.getElementById('notification-msg').textContent = notificationItem.message

      notificationViwer.on("click", function (event) {
        if ($(event.target).is(notificationViwer)) { 
          notificationViwer.css("display", "none");
          getNoticationsFromPHP(notificationItem.id);
        }
      });
    }
  }

  function addNotification(notification) {  
    var postData = {
      title: notification.title,
      message: notification.message,
      ntype: notification.ntype,
      type: "add"
    }
    $.ajax({
      type: 'POST',
      url: "http://localhost/login/Mental%20Health%20Management%20System/php/notifications.php",
      data: postData,
      success: function (response) {  alert(response)
        var notificationData = JSON.parse(response);
        //updateNotifications(notificationData);
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  function closePopupNotification() {
    popupNotificationContainer.css("display", "none");
  }

  function outsideClickNotification(event) {
    if ($(event.target).is(popupNotificationContainer)) {
      popupNotificationContainer.css("display", "none");
    }
  }

  //------------------------------function to get daily activities data from php----------------------------------
  function loadDailyActivities(callback) {
    $.ajax({
      type: "GET",
      url: "http://localhost/login/Mental%20Health%20Management%20System/php/dailyActivities.php",
      success: function (response) {
        var activity = JSON.parse(response);
        callback(activity);
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  //------------------------------function to update daily activities score from php----------------------------------
  function updateDailyActivitieScore(score, question) {
    var postData = {
      pid: localStorage.getItem("myData"),
      actScore: score,
      question: question,
    };

    $.ajax({
      type: "POST",
      url: "http://localhost/login/Mental%20Health%20Management%20System/php/dailyActivities.php",
      data: postData,
      success: function (response) {
        var msg = JSON.parse(response);
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  //--------------------------------------daily-activities section--------------------------------------------

  var popupDailyActivitiesBtn = $("#popup-button-daily-activities");
  var popupDailyActivitiesContainer = $("#popup-container-daily-activities");
  var closeDailyActivitiesBtn = $("#close-daily-activities-button");

  popupDailyActivitiesBtn.on("click", openPopupDailyActivities);
  closeDailyActivitiesBtn.on("click", closePopupDailyActivities);
  popupDailyActivitiesContainer.on("click", outsideClickDailyActivities);

  var completedScore = 0;
  var act = [];
  var actBtn = [];

  for (let i = 1; i <= 5; i++) {
    act[i] = document.getElementById("act-" + i);
    actBtn[i] = document.getElementById("act-btn-" + i);
  }

  loadDailyActivities(function (data) {
    data.forEach(function (row, index) {
      if (index >= 0 && index < 5) {
        act[index + 1].textContent = row.activity;
      }
    });
  });

  getActData(function (data) {
    var question1 = data.question1;
    var question2 = data.question2;
    var question3 = data.question3;
    var question4 = data.question4;
    var question5 = data.question5;

    if (question1 == "done") {
      actBtn[1].src = "Images/icons/icons8-done-24.png";
    }
    if (question2 == "done") {
      actBtn[2].src = "Images/icons/icons8-done-24.png";
    }
    if (question3 == "done") {
      actBtn[3].src = "Images/icons/icons8-done-24.png";
    }
    if (question4 == "done") {
      actBtn[4].src = "Images/icons/icons8-done-24.png";
    }
    if (question5 == "done") {
      actBtn[5].src = "Images/icons/icons8-done-24.png";
    }
  });

  function openPopupDailyActivities() {
    popupDailyActivitiesContainer.css("display", "block");

    actBtn[1].addEventListener("click", () => {
      if (!actBtn[1].src.endsWith("Images/icons/icons8-done-24.png")) {
        actBtn[1].src = "Images/icons/icons8-done-24.png";
        completedScore++;
        updateDailyActivitieScore(completedScore, "Q1");
      }
    });
    actBtn[2].addEventListener("click", () => {
      if (!actBtn[2].src.endsWith("Images/icons/icons8-done-24.png")) {
        actBtn[2].src = "Images/icons/icons8-done-24.png";
        completedScore++;
        updateDailyActivitieScore(completedScore, "Q2");
      }
    });
    actBtn[3].addEventListener("click", () => {
      if (!actBtn[3].src.endsWith("Images/icons/icons8-done-24.png")) {
        actBtn[3].src = "Images/icons/icons8-done-24.png";
        completedScore++;
        updateDailyActivitieScore(completedScore, "Q3");
      }
    });
    actBtn[4].addEventListener("click", () => {
      if (!actBtn[4].src.endsWith("Images/icons/icons8-done-24.png")) {
        actBtn[4].src = "Images/icons/icons8-done-24.png";
        completedScore++;
        updateDailyActivitieScore(completedScore, "Q4");
      }
    });
    actBtn[5].addEventListener("click", () => {
      if (!actBtn[5].src.endsWith("Images/icons/icons8-done-24.png")) {
        actBtn[5].src = "Images/icons/icons8-done-24.png";
        completedScore++;
        updateDailyActivitieScore(completedScore, "Q5");
      }
    });
  }

  function closePopupDailyActivities() {
    popupDailyActivitiesContainer.css("display", "none");
    toggleProgress();
  }

  function outsideClickDailyActivities(event) {
    if ($(event.target).is(popupDailyActivitiesContainer)) {
      popupDailyActivitiesContainer.css("display", "none");
      toggleProgress();
    }
  }

  //--------------------------------------checkup section--------------------------------------------

  var popupCheckupBtn = $("#popup-button-checkup");
  var popupCheckupContainer = $("#popup-container-checkup");
  var closeCheckupBtn = $("#close-checkup-button");

  popupCheckupBtn.on("click", openPopupCheckup);
  closeCheckupBtn.on("click", closePopupCheckup);
  popupCheckupContainer.on("click", outsideClickCheckup);

  function openPopupCheckup() {
    popupCheckupContainer.css("display", "block");

    var dropdownEmotinal = $("#dropdown-emotional");
    var btnEmotional = document.getElementById("emotional");
    var dropdownEmotinal2 = document.getElementById("dropdown-emotional");
    var contain = document.getElementById("con");

    var dropdownFood = $("#dropdown-food");
    var btnFood = document.getElementById("food");
    var dropdownFood2 = document.getElementById("dropdown-food");

    var dropdownIneraction = $("#dropdown-ineraction");
    var btnIneraction = document.getElementById("ineraction");
    var dropdownIneraction2 = document.getElementById("dropdown-ineraction");

    var dropdownMedicines = $("#dropdown-medicines");
    var btnMedicines = document.getElementById("medicines");
    var dropdownMedicines2 = document.getElementById("dropdown-medicines");

    var dropdownListning = $("#dropdown-listning");
    var btnListning = document.getElementById("listning");
    var dropdownListning2 = document.getElementById("dropdown-listning");

    btnEmotional.addEventListener("mouseover", () => {
      dropdownEmotinal.css("display", "block");
      contain.classList.add("contain-back");
    });
    btnEmotional.addEventListener("mouseout", () => {
      dropdownEmotinal.css("display", "none");
      contain.classList.remove("contain-back");
    });
    dropdownEmotinal2.addEventListener("mouseover", () => {
      dropdownEmotinal.css("display", "block");
      contain.classList.add("contain-back");
    });
    dropdownEmotinal2.addEventListener("mouseout", () => {
      dropdownEmotinal.css("display", "none");
      contain.classList.remove("contain-back");
    });

    btnFood.addEventListener("mouseover", () => {
      dropdownFood.css("display", "block");
      contain.classList.add("contain-back");
    });
    btnFood.addEventListener("mouseout", () => {
      dropdownFood.css("display", "none");
      contain.classList.remove("contain-back");
    });
    dropdownFood2.addEventListener("mouseover", () => {
      dropdownFood.css("display", "block");
      contain.classList.add("contain-back");
    });
    dropdownFood2.addEventListener("mouseout", () => {
      dropdownFood.css("display", "none");
      contain.classList.remove("contain-back");
    });

    btnIneraction.addEventListener("mouseover", () => {
      dropdownIneraction.css("display", "block");
      contain.classList.add("contain-back");
    });
    btnIneraction.addEventListener("mouseout", () => {
      dropdownIneraction.css("display", "none");
      contain.classList.remove("contain-back");
    });
    dropdownIneraction2.addEventListener("mouseover", () => {
      dropdownIneraction.css("display", "block");
      contain.classList.add("contain-back");
    });
    dropdownIneraction2.addEventListener("mouseout", () => {
      dropdownIneraction.css("display", "none");
      contain.classList.remove("contain-back");
    });

    btnMedicines.addEventListener("mouseover", () => {
      dropdownMedicines.css("display", "block");
      contain.classList.add("contain-back");
    });
    btnMedicines.addEventListener("mouseout", () => {
      dropdownMedicines.css("display", "none");
      contain.classList.remove("contain-back");
    });
    dropdownMedicines2.addEventListener("mouseover", () => {
      dropdownMedicines.css("display", "block");
      contain.classList.add("contain-back");
    });
    dropdownMedicines2.addEventListener("mouseout", () => {
      dropdownMedicines.css("display", "none");
      contain.classList.remove("contain-back");
    });

    btnListning.addEventListener("mouseover", () => {
      dropdownListning.css("display", "block");
      contain.classList.add("contain-back");
    });
    btnListning.addEventListener("mouseout", () => {
      dropdownListning.css("display", "none");
      contain.classList.remove("contain-back");
    });
    dropdownListning2.addEventListener("mouseover", () => {
      dropdownListning.css("display", "block");
      contain.classList.add("contain-back");
    });
    dropdownListning2.addEventListener("mouseout", () => {
      dropdownListning.css("display", "none");
      contain.classList.remove("contain-back");
    });

    //submit annual checkup
    document.getElementById("submit-checkup").onclick = function () {
      var checkboxes = document.querySelectorAll(".check-in");
      var emotionalMarks = 0;
      var interactionalMarks = 0;
      var physicalMarks = 0;
      var medicalMarks = 0;
      var outsideMarks = 0;
      var marks = 0;

      // Loop through the array of checkbox IDs
      for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        var checkboxId = checkbox.id;

        if (checkboxId == "cb23") {
          emotionalMarks = marks;
          marks = 0;
        }
        if (checkboxId == "cb34") {
          interactionalMarks = marks;
          marks = 0;
        }
        if (checkboxId == "cb44") {
          physicalMarks = marks;
          marks = 0;
        }
        if (checkboxId == "cb53") {
          medicalMarks = marks;
          marks = 0;
        }

        // Check if the checkbox is checked
        if (checkbox.checked) {
          marks++;
        } else {
          console.log(id + " is not checked");
        }

        if (checkboxId == "cb62") {
          outsideMarks = marks;
          marks = 0;
        }
      }

      postAnnualCheckupMarks(
        emotionalMarks,
        interactionalMarks,
        physicalMarks,
        medicalMarks,
        outsideMarks
      );
    };
  }

  function closePopupCheckup() {
    popupCheckupContainer.css("display", "none");
  }

  function outsideClickCheckup(event) {
    if ($(event.target).is(popupCheckupContainer)) {
      popupCheckupContainer.css("display", "none");
    }
  }

  //------------------------------function to post annual checkup marks to php----------------------------------
  function postAnnualCheckupMarks(
    emotionalMarks,
    interactionalMarks,
    physicalMarks,
    medicalMarks,
    outsideMarks
  ) {
    var postData = {
      pid: localStorage.getItem("myData"),
      emotionalMarks: emotionalMarks,
      interactionalMarks: interactionalMarks,
      physicalMarks: physicalMarks,
      medicalMarks: medicalMarks,
      outsideMarks: outsideMarks,
    };

    $.ajax({
      type: "POST",
      url: "http://localhost/login/Mental%20Health%20Management%20System/php/annualCheckup.php",
      data: postData,
      success: function (response) {
        if(response == "success"){
          var notification = {
            title: "Annual Checkup is done",
            message: "Annual Checkup done successfully. Your doctor will examine your annual checkup data and give his attention to that areas",
            ntype: "message"
          };
          addNotification(notification);
        }
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  //--------------------------------------therapy-settings section--------------------------------------------

  var popupTherapySettingsBtn = $("#popup-button-therapy-settings");
  var popupTherapySettingsContainer = $("#popup-container-therapy-settings");
  var closeTherapySettingsBtn = $("#close-therapy-settings-button");

  popupTherapySettingsBtn.on("click", openPopupTherapySettings);
  closeTherapySettingsBtn.on("click", closePopupTherapySettings);
  popupTherapySettingsContainer.on("click", outsideClickTherapySettings);

  function openPopupTherapySettings() {
    popupTherapySettingsContainer.css("display", "block");

    //-------------------------------get selected dates & durations---------------------------------
    const selectedDates = [];
    document.getElementById("send-doctor").disabled = true;

    getDateList(function (data) {
      data.forEach(function (row) {
        var selectedDate = {
          date: row.date,
          startTime: row.startTime,
          endTime: row.endTime,
        };
        selectedDates.push(selectedDate);
        updateSelectedDatesList();
      });
    });

    //-------------------------------select dates & durations---------------------------------
    $("#datepicker").datepicker({});

    $("#add-duration").click(function () {
      const date = $("#datepicker").val();
      const startTime = $("#start-time").val();
      const endTime = $("#end-time").val();

      if (date && startTime && endTime) {
        var selectedDate = {
          date: date,
          startTime: startTime,
          endTime: endTime,
        };
        selectedDates.push(selectedDate);
        updateSelectedDatesList();
        clearInputFields();
        document.getElementById("send-doctor").disabled = false;
      } else {
        //alert("Please select a date and both start and end times.");
      }
    });

    $(document).on("click", ".edit-button", function () {
      const index = $(this).data("index");
      const selectedDate = selectedDates[index];

      $("#datepicker").val(selectedDate.date);
      $("#start-time").val(selectedDate.startTime);
      $("#end-time").val(selectedDate.endTime);
      selectedDates.splice(index, 1);
      updateSelectedDatesList();
    });

    $(document).on("click", ".remove-button", function () {
      const index = $(this).data("index");
      selectedDates.splice(index, 1);
      updateSelectedDatesList();
    });

    function updateSelectedDatesList() {
      const $selectedDatesList = $("#selected-dates");
      $selectedDatesList.empty();

      for (let i = 0; i < selectedDates.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = `Date: ${selectedDates[i].date}, From: ${selectedDates[i].startTime}, To: ${selectedDates[i].endTime}`;
        listItem.className = "list-group-item";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className =
          "edit-button btn btn-primary rounded-pill js-btn";
        editButton.setAttribute("data-index", i);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className =
          "remove-button btn btn-primary rounded-pill js-btn";
        removeButton.setAttribute("data-index", i);

        listItem.appendChild(editButton);
        listItem.appendChild(removeButton);

        $selectedDatesList.append(listItem);
      }
    }

    function clearInputFields() {
      $("#datepicker").val("");
      $("#start-time").val("");
      $("#end-time").val("");
    }

    $(document).on("click", "#send-doctor", function () {
      var datesList = document.getElementById("selected-dates");
      var listItems = datesList.getElementsByTagName("li");

      for (let i = 0; i < listItems.length; i++) {
        postDateList(selectedDates[i], i + 1);
      }
      document.getElementById("send-doctor").disabled = true;
    });

    $(document).on("click", ".edit-button", function () {
      var datesList = document.getElementById("selected-dates");
      var listItems = datesList.getElementsByTagName("li");

      for (let i = 0; i < listItems.length; i++) {
        postDateList(selectedDates[i], i + 1);
      }
      document.getElementById("send-doctor").disabled = true;
    });

    //------------------------------function to post datelist into php----------------------------------
    function postDateList(list, sid) {
      var postData = {
        sid: sid,
        pid: localStorage.getItem("myData"),
        docId: localStorage.getItem("docId"),
        date: list.date,
        startTime: list.startTime,
        endTime: list.endTime,
        type: "changeRequest",
      };

      $.ajax({
        type: "POST",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/therapy.php",
        data: postData,
        success: function (response) {
          var msg = JSON.parse(response);
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    }

    //------------------------------function to get datelist into php----------------------------------
    function getDateList(callback) {
      var postData = {
        pid: localStorage.getItem("myData"),
        docId: localStorage.getItem("docId"),
      };

      $.ajax({
        type: "GET",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/therapy.php",
        data: postData,
        success: function (response) {
          var dateList = JSON.parse(response);
          callback(dateList);
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    }
  }

  function closePopupTherapySettings() {
    popupTherapySettingsContainer.css("display", "none");
  }

  function outsideClickTherapySettings(event) {
    if ($(event.target).is(popupTherapySettingsContainer)) {
      popupTherapySettingsContainer.css("display", "none");
    }
  }

  //--------------------------------------add to calender-date section--------------------------------------------
  var popupAddCalenderBtn = $("#popup-button-add-calender");
  var popupAddCalenderContainer = $("#popup-container-add-calender");
  var closeAddCalenderBtn = $("#close-add-calender-button");

  popupAddCalenderBtn.on("click", openPopupAddCalender);
  closeAddCalenderBtn.on("click", closePopupAddCalender);
  popupAddCalenderContainer.on("click", outsideClickAddCalender);

  function openPopupAddCalender() {
    if (localStorage.getItem("therapyEvent2") == "havent") {
      popupAddCalenderContainer.css("display", "block");
    }

    var addCalenderBtn = $("#btn-add-calender");
    var popupBtnCal = document.getElementById("popup-button-add-calender");
    var popupSuccessContainer = $("#popup-container-success");
    addCalenderBtn.on("click", addCalender);

    function addCalender() {
      popupBtnCal.classList.add("addSuccess");
      popupSuccessContainer.css("display", "block");
      popupAddCalenderContainer.css("display", "none");

      getTherapyData(function (therapy) {
        addEvent(
          therapy.date,
          therapy.time,
          therapy.title,
          therapy.description
        );
        var separatedDate = separateDate(therapy.date);
        highlightSpecificDate(
          separatedDate[0],
          separatedDate[1],
          separatedDate[2]
        );
      });

      var element = document.getElementById("popup-container-success");
      var opacity = 1;
      var fadeOutInterval = setInterval(function () {
        if (opacity <= 0) {
          clearInterval(fadeOutInterval);
          element.style.display = "none";
        } else {
          opacity -= 0.03;
          element.style.opacity = opacity;
        }
      }, 80);
    }
  }

  function closePopupAddCalender() {
    popupAddCalenderContainer.css("display", "none");
  }

  function outsideClickAddCalender(event) {
    if ($(event.target).is(popupAddCalenderContainer)) {
      popupAddCalenderContainer.css("display", "none");
    }
  }

  //check if event was added or not
  getTherapyData(function (therapy) {
    if (
      checkEvent(therapy.date, therapy.time, therapy.title) == "do not have"
    ) {
      document
        .getElementById("popup-button-add-calender")
        .classList.remove("addSuccess");
      localStorage.setItem("therapyEvent2", "havent");
    } else {
      document
        .getElementById("popup-button-add-calender")
        .classList.add("addSuccess");
      localStorage.setItem("therapyEvent2", "have");
    }
  });

  //--------------------------------------add notification-date section--------------------------------------------
  var popupAddNotificationBtn = $("#popup-button-add-notification");
  var popupAddNotificationContainer = $("#popup-container-add-notification");
  var closeAddNotificationBtn = $("#close-add-notification-button");

  popupAddNotificationBtn.on("click", openPopupAddNotification);
  closeAddNotificationBtn.on("click", closePopupAddNotification);
  popupAddNotificationContainer.on("click", outsideClickAddNotification);

  function openPopupAddNotification() {
    popupAddNotificationContainer.css("display", "block");

    var addNotificationBtn = $("#btn-add-notification");
    var popupBtnNot = document.getElementById("popup-button-add-notification");
    var popupSuccessContainer = $("#popup-container-success");
    addNotificationBtn.on("click", addDateNotification);

    function addDateNotification() {
      popupSuccessContainer.css("display", "block");
      popupBtnNot.classList.add("addSuccess");
      popupAddNotificationContainer.css("display", "none");

      var element = document.getElementById("popup-container-success");
      var opacity = 1;
      var fadeOutInterval = setInterval(function () {
        if (opacity <= 0) {
          clearInterval(fadeOutInterval);
          element.style.display = "none";
        } else {
          opacity -= 0.03;
          element.style.opacity = opacity;
        }
      }, 80);
    }
  }

  function closePopupAddNotification() {
    popupAddNotificationContainer.css("display", "none");
  }

  function outsideClickAddNotification(event) {
    if ($(event.target).is(popupAddNotificationContainer)) {
      popupAddNotificationContainer.css("display", "none");
    }
  }

  //--------------------------------------doctor's test section--------------------------------------------
  var popupDoctorsTestBtn = $("#popup-button-doctors-test");
  var popupDoctorsTestContainer = $("#popup-container-doctors-test");
  var closeDoctorsTestBtn = $("#close-doctors-test-button");

  popupDoctorsTestBtn.on("click", openPopupDoctorsTest);
  closeDoctorsTestBtn.on("click", closePopupDoctorsTest);
  popupDoctorsTestContainer.on("click", outsideClickDoctorsTest);

  function openPopupDoctorsTest() {
    popupDoctorsTestContainer.css("display", "block");
  }

  function closePopupDoctorsTest() {
    popupDoctorsTestContainer.css("display", "none");
  }

  function outsideClickDoctorsTest(event) {
    if ($(event.target).is(popupDoctorsTestContainer)) {
      popupDoctorsTestContainer.css("display", "none");
    }
  }

  //--------------------------------------choose doctor section--------------------------------------------
  var popupChooseDoctorBtn = $("#popup-button-choose-doctor");
  var popupChooseDoctorContainer = $("#popup-container-choose-doctor");
  var closeChooseDoctorBtn = $("#close-choose-doctor-button");

  popupChooseDoctorBtn.on("click", openPopupChooseDoctor);
  closeChooseDoctorBtn.on("click", closePopupChooseDoctor);
  popupChooseDoctorContainer.on("click", outsideClickChooseDoctor);

  function openPopupChooseDoctor() {
    popupChooseDoctorContainer.css("display", "block");
    document.getElementById("container-docInfo").style.display = "none";
    getDoctorsListFromPHP();

    //active the personal info tab
    document.getElementById("btn-personal2").onclick = function () {
      var elements = document.querySelectorAll(".doctor-info2");
      // Iterate over each element and remove the class
      elements.forEach(function (element) {
        element.classList.remove("active-tab2");
      });

      var tab = document.getElementById("personal-tab2");
      tab.classList.add("active-tab2");

      var btns = document.querySelectorAll(".tab-btn2");
      // Iterate over each element and remove the class
      btns.forEach(function (btn) {
        btn.classList.remove("btn-success");
        btn.classList.add("btn-outline-success");
      });

      var btn = document.getElementById("btn-personal2");
      btn.classList.remove("btn-outline-success");
      btn.classList.add("btn-success");
    };

    //active the experience info tab
    document.getElementById("btn-experience2").onclick = function () {
      var elements = document.querySelectorAll(".doctor-info2");
      // Iterate over each element and remove the class
      elements.forEach(function (element) {
        element.classList.remove("active-tab2");
      });

      var tab = document.getElementById("experience-tab2");
      tab.classList.add("active-tab2");

      var btns = document.querySelectorAll(".tab-btn2");
      // Iterate over each element and remove the class
      btns.forEach(function (btn) {
        btn.classList.remove("btn-success");
        btn.classList.add("btn-outline-success");
      });

      var btn = document.getElementById("btn-experience2");
      btn.classList.remove("btn-outline-success");
      btn.classList.add("btn-success");
    };

    //active the social info tab
    document.getElementById("btn-social2").onclick = function () {
      var elements = document.querySelectorAll(".doctor-info2");
      // Iterate over each element and remove the class
      elements.forEach(function (element) {
        element.classList.remove("active-tab2");
      });

      var tab = document.getElementById("social-tab2");
      tab.classList.add("active-tab2");

      var btns = document.querySelectorAll(".tab-btn2");
      // Iterate over each element and remove the class
      btns.forEach(function (btn) {
        btn.classList.remove("btn-success");
        btn.classList.add("btn-outline-success");
      });

      var btn = document.getElementById("btn-social2");
      btn.classList.remove("btn-outline-success");
      btn.classList.add("btn-success");
    };
  }

  function closePopupChooseDoctor() {
    popupChooseDoctorContainer.css("display", "none");
  }

  function outsideClickChooseDoctor(event) {
    if ($(event.target).is(popupChooseDoctorContainer)) {
      popupChooseDoctorContainer.css("display", "none");
    }
  }

  // Function to get doctors list from PHP
  function getDoctorsListFromPHP() {
    var postData = {
      type: "docList",
    };

    $.ajax({
      type: "GET",
      url: "http://localhost/login/Mental%20Health%20Management%20System/php/chooseDoctor.php",
      data: postData,
      success: function (response) {
        var doctorData = JSON.parse(response);
        updateDoctorsList(doctorData);
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  //------------------function to get clicked doctor data from php------------------
  function getClickedDocData(callback) {
    var postData = {
      type: "docData",
      docId: localStorage.getItem("currentDoctorId"),
    };

    $.ajax({
      type: "GET",
      url: "http://localhost/login/Mental%20Health%20Management%20System/php/chooseDoctor.php",
      data: postData,
      success: function (response) {
        var doctor = response;
        callback(doctor);
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  // Function to update the chat list with data
  function updateDoctorsList(doctorData) {
    var doctorList = document.getElementById("doc-list");
    doctorList.innerHTML = "";

    // Loop through the chat data and create list items
    doctorData.forEach(function (doctorItem) {
      var listItem = document.createElement("li");
      listItem.className = "docListItem d-flex";
      listItem.id = doctorItem.id;

      var imagePath = String("php/" + doctorItem.userImage);
      var fullName = String(doctorItem.firstName + " " + doctorItem.lastName);

      // Create and set the image element
      var img = document.createElement("img");
      img.src = imagePath;
      img.className = "docList-img";

      var btn = document.createElement("button");
      btn.textContent = "Request";
      btn.className = "btn rounded-pill request";

      // Create and set the name element
      var name = document.createElement("div");
      name.className = "doc-name";
      name.type = "button";
      name.textContent = fullName;

      // Add a click event listener using a closure
      listItem.addEventListener(
        "click",
        (function (listItem) {
          return function () {
            doctorElementClickHandler(listItem);
          };
        })(listItem, img)
      );

      // Add a click event listener using a closure
      btn.addEventListener(
        "click",
        (function (listItem) {
          return function () {
            requestDoctorClickHandler(listItem);
          };
        })(listItem, img)
      );

      // Append image and name elements to the list item
      listItem.appendChild(img);
      listItem.appendChild(name);
      listItem.appendChild(btn);
      // Append the list item to the chat list
      doctorList.appendChild(listItem);
    });
  }

  // Define a click event handler outside of the function
  function doctorElementClickHandler(listItem) {
    localStorage.setItem("currentDoctorId", listItem.id);
    openDoctorProfile();
  }

  //function to handle reuest btn click event
  function requestDoctorClickHandler(listItem) {
    localStorage.setItem("currentDoctorId", listItem.id);
    sendDoctorRequest();
  }

  function openDoctorProfile() {
    document.getElementById("container-docInfo").style.display = "block";

    var id = document.getElementById("docId-cd");
    var name = document.getElementById("name-cd");
    var age = document.getElementById("age-cd");
    var jobTitle = document.getElementById("jobTitle-cd");
    var hostpital = document.getElementById("hostpital-cd");
    var email = document.getElementById("dMail-cd");
    var career = document.getElementById("career-cd");
    var contact = document.getElementById("dCon-cd");
    var img = document.getElementById("doc-img-cd");

    //-------------------load the data from php-------------------
    getClickedDocData(function (doctor) {
      id.value = doctor.id;
      name.value = doctor.name1 + " " + doctor.name2;
      age.value = doctor.age;
      jobTitle.value = doctor.jobTitle;
      hostpital.value = doctor.hostpital;
      email.textContent = doctor.email;
      career.value = doctor.career + " years";
      contact.textContent = doctor.contactno;
      img.src = "php/" + doctor.img;

      createExperienceArray(doctor.experience);
    });
  }

  //function to create experience array
  function createExperienceArray(experience) {
    var experienceArray = experience.split(/\.(?=\s)/);
    // Remove any empty strings from the array
    experienceArray = experienceArray.filter(function (sentence) {
      return sentence.trim() !== "";
    });

    var experienceList2 = document.getElementById("experienceList2");
    // Loop through the array
    experienceArray.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      experienceList2.appendChild(li);
    });
  }

  //function to send a request to the doctor
  function sendDoctorRequest() {
    var postData = {
      type: "docRequest",
      pid: localStorage.getItem("myData"),
      docId: localStorage.getItem("currentDoctorId"),
    };

    $.ajax({
      type: "POST",
      url: "http://localhost/login/Mental%20Health%20Management%20System/php/chooseDoctor.php",
      data: postData,
      success: function (response) {
        var resp = JSON.parse(response);
        //updateDoctorsList(doctorData);
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  //--------------------------------------doctor chat section--------------------------------------------
  var popupDoctorChatBtn = $("#popup-button-doctor-chat");
  var popupDoctorChatContainer = $("#popup-container-doctor-chat");
  var closeDoctorsChatBtn = $("#close-doctors-test-button");

  popupDoctorChatBtn.on("click", openPopupDoctorChat);
  closeDoctorsChatBtn.on("click", closePopupDoctorsChat);
  popupDoctorChatContainer.on("click", outsideClickDoctorsChat);

  function openPopupDoctorChat() {
    popupDoctorChatContainer.css("display", "block");

    const chatMessages = document.querySelector(".chat-messages");
    const chatInputForm = document.querySelector(".chat-input-form");
    const chatInput = document.querySelector(".chat-input");
    const clearChatBtn = document.querySelector(".clear-chat-button");

    let messageSender = "patient";

    function loadMessages() {
      getDPChatData(function (data) {
        data.forEach(function (row) {
          if (row.docMsg == "" && row.patientMsg != "") {
            const Rmessage = {
              sender: "patient",
              text: row.patientMsg,
              timestamp: row.timeStamp,
              img: localStorage.getItem("patientImg"),
            };
            chatMessages.innerHTML += createChatMessageElement(Rmessage);
            document.querySelector(".nw").classList.remove("nw");
          } else if (row.patientMsg == "" && row.docMsg != "") {
            const Rmessage = {
              sender: "doctor",
              text: row.docMsg,
              timestamp: row.timeStamp,
              img: localStorage.getItem("docImg"),
            };
            chatMessages.innerHTML += createChatMessageElement(Rmessage);
            document.querySelector(".nw").classList.remove("nw");
          }
        });
      });
    }

    loadMessages();

    const messages = JSON.parse(localStorage.getItem("messages")) || [];

    const createChatMessageElement = (message) =>
      `
      <img src="${message.img}" class="${message.sender}-img" alt="">
      <div class="message nw ${
        message.sender === "patient" ? "blue-bg" : "gray-bg"
      }">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
      </div>
    `;

    window.onload = () => {
      messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message);
      });
    };

    const sendMessage = (e) => {
      e.preventDefault();
      const timestamp = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      if (chatInput.value != "") {
        const message = {
          sender: messageSender,
          text: chatInput.value,
          timestamp,
          img: localStorage.getItem("patientImg"),
        };
        /* Save message to local storage */
        messages.push(message);
        postDPChatData(message);
        localStorage.setItem("messages", JSON.stringify(messages));
        /* Add message to DOM */
        chatMessages.innerHTML += createChatMessageElement(message);
        //loadMessages();
        /* Clear input field */
        chatInputForm.reset();
        /*  Scroll to bottom of chat messages */
        chatMessages.scrollTop = chatMessages.scrollHeight;

        const delayInMilliseconds = 500;
        setTimeout(function () {
          document.querySelector(".nw").classList.remove("nw");
        }, delayInMilliseconds);
      }
    };

    chatInputForm.addEventListener("submit", sendMessage);

    clearChatBtn.addEventListener("click", () => {
      //localStorage.clear();
      chatMessages.innerHTML = "";
    });
  }

  function closePopupDoctorsChat() {
    popupDoctorChatContainer.css("display", "none");
  }

  function outsideClickDoctorsChat(event) {
    if ($(event.target).is(popupDoctorChatContainer)) {
      popupDoctorChatContainer.css("display", "none");
    }
  }
});

//-------------------------function to post doctor-patient chat data to php----------------------------
function postDPChatData(message) {
  var postData = {
    pid: localStorage.getItem("myData"),
    docId: localStorage.getItem("docId-p"),
    sender: message.sender,
    content: message.text,
  };

  $.ajax({
    type: "POST",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/DPChat.php",
    data: postData,
    success: function (response) {
      //var data = JSON.parse(response);
      //callback(data);
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

//-------------------------function to get doctor-patient chat data from php----------------------------
function getDPChatData(callback) {
  var postData = {
    pid: localStorage.getItem("myData"),
    docId: localStorage.getItem("docId-p"),
    receiver: "patient",
  };

  $.ajax({
    type: "GET",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/DPChat.php",
    data: postData,
    success: function (response) {
      var data = JSON.parse(response);
      callback(data);
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

//--------------------------------------doctor video chat section--------------------------------------------

var popupDoctorVideoChatBtn = $("#popup-button-doctor-video-chat");
var popupDoctorVideoChatContainer = $("#popup-container-doctor-video-chat");
var closeDoctorVideoChatBtn = $("#close-doctor-video-chat-button");

popupDoctorVideoChatBtn.on("click", openPopupDoctorVideoChat);
closeDoctorVideoChatBtn.on("click", closePopupDoctorVideoChat);
popupDoctorVideoChatContainer.on("click", outsideClickDoctorVideoChat);

function openPopupDoctorVideoChat() {
  popupDoctorVideoChatContainer.css("display", "block");

  //check the mental state (popup the chat window)
  document.getElementById("join-meeting-btn").onclick = function () {
    var meetingId = document.getElementById("meeting-ID").value;
    window.open(meetingId, "_blank");
  };
}

function closePopupDoctorVideoChat() {
  popupDoctorVideoChatContainer.css("display", "none");
}

function outsideClickDoctorVideoChat(event) {
  if ($(event.target).is(popupDoctorVideoChatContainer)) {
    popupDoctorVideoChatContainer.css("display", "none");
  }
}

//--------------------------------------doctor info section--------------------------------------------
var popupDoctorinfoBtn = $("#popup-button-doctor-info");
var popupDoctorinfoContainer = $("#popup-container-doctor-info");
var closeDoctorinfoBtn = $("#close-doctor-info-button");

popupDoctorinfoBtn.on("click", openPopupDoctorinfo);
closeDoctorinfoBtn.on("click", closePopupDoctorinfo);
popupDoctorinfoContainer.on("click", outsideClickDoctorinfo);

function openPopupDoctorinfo() {
  popupDoctorinfoContainer.css("display", "block");

  //active the personal info tab
  document.getElementById("btn-personal").onclick = function () {
    var elements = document.querySelectorAll(".doctor-info");
    // Iterate over each element and remove the class
    elements.forEach(function (element) {
      element.classList.remove("active-tab");
    });

    var tab = document.getElementById("personal-tab");
    tab.classList.add("active-tab");

    var btns = document.querySelectorAll(".tab-btn");
    // Iterate over each element and remove the class
    btns.forEach(function (btn) {
      btn.classList.remove("btn-success");
      btn.classList.add("btn-outline-success");
    });

    var btn = document.getElementById("btn-personal");
    btn.classList.remove("btn-outline-success");
    btn.classList.add("btn-success");
  };

  //active the experience info tab
  document.getElementById("btn-experience").onclick = function () {
    var elements = document.querySelectorAll(".doctor-info");
    // Iterate over each element and remove the class
    elements.forEach(function (element) {
      element.classList.remove("active-tab");
    });

    var tab = document.getElementById("experience-tab");
    tab.classList.add("active-tab");

    var btns = document.querySelectorAll(".tab-btn");
    // Iterate over each element and remove the class
    btns.forEach(function (btn) {
      btn.classList.remove("btn-success");
      btn.classList.add("btn-outline-success");
    });

    var btn = document.getElementById("btn-experience");
    btn.classList.remove("btn-outline-success");
    btn.classList.add("btn-success");
  };

  //active the social info tab
  document.getElementById("btn-social").onclick = function () {
    var elements = document.querySelectorAll(".doctor-info");
    // Iterate over each element and remove the class
    elements.forEach(function (element) {
      element.classList.remove("active-tab");
    });

    var tab = document.getElementById("social-tab");
    tab.classList.add("active-tab");

    var btns = document.querySelectorAll(".tab-btn");
    // Iterate over each element and remove the class
    btns.forEach(function (btn) {
      btn.classList.remove("btn-success");
      btn.classList.add("btn-outline-success");
    });

    var btn = document.getElementById("btn-social");
    btn.classList.remove("btn-outline-success");
    btn.classList.add("btn-success");
  };

  var docId = document.getElementById("docId");
  //get the users docId
  getUserData(function (user) {
    docId.value = user.docId;
    localStorage.setItem("docId-p", docId.value);
  });

  var dName = document.getElementById("dname");
  var dAge = document.getElementById("dage");
  var jobTitle = document.getElementById("jobTitle");
  var hostpital = document.getElementById("hostpital");
  var career = document.getElementById("career");
  var dContact = document.getElementById("dCon");
  var dMail = document.getElementById("dMail");

  getDocData(function (user) {
    dName.value = user.name1 + " " + user.name2;
    dAge.value = user.age;
    jobTitle.value = user.jobTitle;
    hostpital.value = user.hostpital;
    career.value = user.career + " years";
    dContact.textContent = user.contactno;
    dMail.textContent = user.email;

    createExperienceArray(user.experience);
  });

  //function to create experience array
  function createExperienceArray(experience) {
    var experienceArray = experience.split(/\.(?=\s)/);
    // Remove any empty strings from the array
    experienceArray = experienceArray.filter(function (sentence) {
      return sentence.trim() !== "";
    });

    var experienceList = document.getElementById("experienceList");
    // Loop through the array
    experienceArray.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      experienceList.appendChild(li);
    });
  }

  //popup send gmail
  document.getElementById("popupGmail").onclick = function () {
    openGmail(dMail.textContent);
  };

  //popup doctor chat
  document.getElementById("docChat").onclick = function () {
    closePopupDoctorinfo();
    var popupDoctorChatContainer = $("#popup-container-doctor-chat");
    popupDoctorChatContainer.css("display", "block");
  };
}

function closePopupDoctorinfo() {
  popupDoctorinfoContainer.css("display", "none");
}

function outsideClickDoctorinfo(event) {
  if ($(event.target).is(popupDoctorinfoContainer)) {
    popupDoctorinfoContainer.css("display", "none");
  }
}

//------------------function to get doctor object from php------------------
function getDocData(callback) {
  var postData = {
    docId: localStorage.getItem("docId-p"),
    type: "patintAccess",
  };

  $.ajax({
    type: "POST",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/doctor.php",
    data: postData,
    success: function (response) {
      var user = response;
      callback(user);
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

function openGmail(address) {
  var emailAddress = address;

  var link = document.createElement("a");
  link.href =
    "https://mail.google.com/mail/?view=cm&to=" +
    encodeURIComponent(emailAddress);
  link.target = "_blank";
  link.click();
}

//----------------------enable editing the user info----------------------
function editItem(item) {
  if (item == "name1-icon") {
    name1.readOnly = !name1.readOnly;
    name1.focus();
  }
  if (item == "name2-icon") {
    name2.readOnly = !name2.readOnly;
    name2.focus();
  }
  if (item == "dob-icon") {
    dob.readOnly = !dob.readOnly;
    dob.focus();
  }
  if (item == "age-icon") {
    age.readOnly = !age.readOnly;
    age.focus();
  }
  if (item == "gender-icon") {
    if (cmbgender.querySelector('option[value="Male"]').disabled == true) {
      cmbgender.querySelector('option[value="Male"]').disabled = false;
      cmbgender.querySelector('option[value="Female"]').disabled = false;
    } else {
      cmbgender.querySelector('option[value="Male"]').disabled = true;
      cmbgender.querySelector('option[value="Female"]').disabled = true;
    }

    cmbgender.focus();
  }
  if (item == "address-icon") {
    address.readOnly = !address.readOnly;
    address.focus();
  }
  if (item == "email-icon") {
    email.readOnly = !email.readOnly;
    email.focus();
  }
  if (item == "con1-icon") {
    con1.readOnly = !con1.readOnly;
    con1.focus();
  }
  if (item == "con2-icon") {
    con2.readOnly = !con2.readOnly;
    con2.focus();
  }
  if (item == "un-icon") {
    un.readOnly = !un.readOnly;
    un.focus();
  }
  if (item == "pw-icon") {
    pw.readOnly = !pw.readOnly;
    pw.focus();
    if (pw.type == "password") {
      pw.type = "text";
    } else {
      pw.type = "password";
    }
  }
}

//popup tooltips
document.addEventListener("DOMContentLoaded", function () {
  tippy("#editEvent", {
    content: "Edit Event",
  });

  tippy("#deleteEvent", {
    content: "Delete Event",
  });

  tippy("#searchEvent", {
    content: "Search Event",
  });

  tippy("#addEvent", {
    content: "Add Event",
  });

  tippy("#clearForm", {
    content: "Clear Form",
  });

  tippy("#popup-button-add-notification", {
    content: "Add Notification",
  });

  tippy("#popup-button-add-calender", {
    content: "Add Calender Event",
  });

  tippy("#popup-button-therapy-settings", {
    content: "Therapy Settings",
  });

  tippy("#navIcon", {
    content: "Navigation Panel",
  });

  tippy(".disabled", {
    content: "This section is disabled",
  });
});
