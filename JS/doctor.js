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
    docId: localStorage.getItem("docId"),
    date: event.date,
    time: event.time,
    title: event.title,
    description: event.description,
  };

  $.ajax({
    type: "POST",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/doctorEvents.php",
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
    docId: localStorage.getItem("docId"),
  };

  $.ajax({
    type: "GET",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/doctorEvents.php",
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
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/doctorEvents.php",
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
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/doctorEvents.php",
    data: postData,
    success: function (response) {
      //var score = JSON.parse(response);
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

// Show Event Modal
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

    // First, compare by date
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;

    // If dates are equal, compare by time
    const timeA = a.time.toLowerCase();
    const timeB = b.time.toLowerCase();
    if (timeA < timeB) return -1;
    if (timeA > timeB) return 1;

    return 0; // Events are identical
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

// Function to retrieve patient list from PHP
function getPatientListFromPHP() {
  var postData = {
    type: "patientList",
    docId: localStorage.getItem("docId"),
  };

  $.ajax({
    type: "GET",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/patientList.php",
    data: postData,
    success: function (response) {
      // Assuming the response is an array of patient data objects
      var patientData = JSON.parse(response);
      updatePatientList(patientData);
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

// Function to update the patient list with data
function updatePatientList(patientData) {
  var patientList = document.getElementById("main-patients-list");
  patientList.innerHTML = "";

  // Loop through the patient data and create list items
  patientData.forEach(function (patientItem, index) {
    var listItem = document.createElement("li");
    listItem.className = "li-patient d-flex";
    listItem.id = patientItem.id;

    var imagePath = String("php/" + patientItem.userImage);
    var fullName = String(patientItem.firstName + " " + patientItem.lastName);

    // Create and set the image element
    var img = document.createElement("img");
    img.src = imagePath; // Replace with your data property
    img.className = "patient-img";

    // Create and set the name element
    var name = document.createElement("div");
    name.className = "patient-name pn2";
    name.type = "button";
    name.textContent = fullName; // Replace with your data property

    // Add a click event listener using a closure
    listItem.addEventListener(
      "click",
      (function (listItem) {
        return function () {
          patientElementClickHandler(listItem);
        };
      })(listItem)
    );

    // Append image and name elements to the list item
    listItem.appendChild(img);
    listItem.appendChild(name);
    // Append the list item to the chat list
    patientList.appendChild(listItem);
  });
}

getPatientListFromPHP();

// Define a click event handler outside of the function
function patientElementClickHandler(elementId) { 
  localStorage.setItem("currentProfilePatientId", elementId.id); 
  openPopupPatientProfile();
}

//------------------function to get list of therapy sessions from php------------------
function getTherapyList() {
  var postData = {
    docId: localStorage.getItem("docId"),
  };

  $.ajax({
    type: "GET",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/therapy.php",
    data: postData,
    success: function (response) {
      var therapyData = JSON.parse(response);
      updateTherapyList(therapyData);
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

//------------------function to get list of therapy sessions from php------------------
function getTherapyData(callback) {
  var postData = {
    sid: localStorage.getItem("currentTherapyId"),
  };

  $.ajax({
    type: "GET",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/therapy.php",
    data: postData,
    success: function (response) { 
      var therapyData = JSON.parse(response);
      callback(therapyData);
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

// Function to sort therapy by date and time
function sortTherapyByDateAndTime() {
  therapyDataList.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    // First, compare by date
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;

    // If dates are equal, compare by time
    const timeA = a.time.toLowerCase();
    const timeB = b.time.toLowerCase();
    if (timeA < timeB) return -1;
    if (timeA > timeB) return 1;

    return 0; // Events are identical
  });
}

const elementList = [];
const imgList = [];
const nameList = [];
const therapyDataList = [];
let currentListIndex = 0;

function updateTherapyList(therapyData) {
  var therapyList = document.getElementById("schedule-list");
  therapyList.innerHTML = "";

  therapyData.forEach(function (therapyItem, index) {
    const therapyData = {
      id: index + 1,
      pid: therapyItem.pid,
      sid: therapyItem.sid,
      title: therapyItem.title,
      date: therapyItem.date,
      time: therapyItem.startTime,
      description: therapyItem.description,
      firstName: therapyItem.firstName,
      lastName: therapyItem.lastName,
      userImage: therapyItem.userImage,
    };
    therapyDataList.push(therapyData);
  });

  sortTherapyByDateAndTime();

  // Loop through the patient data and create list items
  therapyDataList.forEach(function (therapyItem, index) {
    var listItem = document.createElement("li");
    listItem.className = "li-shedule d-flex";
    listItem.id = therapyItem.sid;

    var imagePath = String("php/" + therapyItem.userImage);
    var fullName = String(therapyItem.firstName + " " + therapyItem.lastName);

    // Create and set the image element
    var img = document.createElement("img");
    img.src = imagePath; // Replace with your data property
    img.className = "sheduleview";

    // Create and set the name element
    var name = document.createElement("h6");
    name.className = "title";
    name.type = "button";
    name.textContent = fullName; // Replace with your data property

    if (index == 0) {
      listItem.classList.add("first");
      img.classList.add("firstimg");
      name.classList.add("first-title");

      const therapy = {
        id: index + 1,
        pid: therapyItem.pid,
        sid: therapyItem.sid,
        title: therapyItem.title,
        date: therapyItem.date,
        time: therapyItem.time,
        description: therapyItem.description,
      };

      loadTherapyDataToForm(therapy);
    }

    elementList.push(listItem);
    imgList.push(img);
    nameList.push(name);

    const therapy = {
      id: index + 1,
      pid: therapyItem.pid,
      sid: therapyItem.sid,
      title: therapyItem.title,
      date: therapyItem.date,
      time: therapyItem.time,
      description: therapyItem.description,
    };

    // Add a click event listener using a closure
    listItem.addEventListener(
      "click",
      (function (listItem, img, name, index) {
        return function () {
          therapyElementClickHandler(listItem, img, name, index, therapy);
        };
      })(listItem, img, name, index)
    );

    // Append image and name elements to the list item
    listItem.appendChild(img);
    listItem.appendChild(name);
    // Append the list item to the chat list
    therapyList.appendChild(listItem);
  });
}

getTherapyList();

// Define a click event handler outside of the function
function therapyElementClickHandler(listItem, img, name, index, therapy) {
  removeClassesFromAll();
  loadTherapyDataToForm(therapy);
  listItem.classList.add("first");
  img.classList.add("firstimg");
  name.classList.add("first-title");
  currentListIndex = index;
}

function addClassesToCurrent() {
  elementList[currentListIndex].classList.toggle("scrl");

  setTimeout(function () {
    elementList[currentListIndex].classList.add("first");
    elementList[currentListIndex].classList.toggle("scrl");
    nameList[currentListIndex].classList.add("first-title");
    imgList[currentListIndex].classList.add("firstimg");
  }, 5);
}

function removeClassesFromAll() {
  elementList.forEach((item) => {
    item.classList.remove("first");
  });
  imgList.forEach((item) => {
    item.classList.remove("firstimg");
  });
  nameList.forEach((item) => {
    item.classList.remove("first-title");
  });
}

var navDownBtn = document.getElementById("downBtn");
var navUpBtn = document.getElementById("upBtn");

navDownBtn.addEventListener("click", function () {
  if (currentListIndex < therapyDataList.length - 1) {
    currentListIndex++;
  }
  therapyDataList.forEach((therapy, index) => {
    if (index == currentListIndex) {
      removeClassesFromAll();
      addClassesToCurrent();
      loadTherapyDataToForm(therapy);
    }
  });
});

navUpBtn.addEventListener("click", function () {
  if (currentListIndex > 0) {
    currentListIndex--;
  }
  therapyDataList.forEach((therapy, index) => {
    if (index == currentListIndex) {
      removeClassesFromAll();
      addClassesToCurrent();
      loadTherapyDataToForm(therapy);
    }
  });
});

function dateString(date) {
  var separatedDate = separateDate(date);
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
  return dateString;
}

function loadTherapyDataToForm(therapy) { 
  var therapyDate = document.getElementById("therapyDate");
  var therapyTime = document.getElementById("therapyTime");
  therapyDate.textContent = dateString(therapy.date);
  therapyTime.textContent = therapy.time;
  localStorage.setItem("currentTherapyPId", therapy.pid);

  if (checkEvent(therapy.date, therapy.time, therapy.title) == "do not have") {
    localStorage.setItem("currentTherapyId", therapy.sid); 
    localStorage.setItem("therapyEvent", "havent");
    document
      .getElementById("popup-button-add-calender")
      .classList.remove("addSuccess");
  } else {
    document
      .getElementById("popup-button-add-calender")
      .classList.add("addSuccess");
    localStorage.setItem("therapyEvent", "have");
  }
}

//--------------------------------------therapy-settings section--------------------------------------------

var popupTherapySettingsBtn = $("#popup-button-therapy-settings2");
var popupTherapySettingsContainer = $("#popup-container-therapy-settings");
var closeTherapySettingsBtn = $("#close-therapy-settings-button");

popupTherapySettingsBtn.on("click", openPopupTherapySettings);
closeTherapySettingsBtn.on("click", closePopupTherapySettings);
popupTherapySettingsContainer.on("click", outsideClickTherapySettings);

function openPopupTherapySettings() {
  $(function () {
    $(".datepicker").datepicker();
  });

  popupTherapySettingsContainer.css("display", "block");

  //function to change the date
  document.getElementById("date-change").onclick = function () {
    const date = $("#datepicker").val();
    const startTime = $("#start-time").val();
    const endTime = $("#end-time").val();

    if (date && startTime && endTime) {
      var postData = {
        pid: localStorage.getItem("currentTherapyPId"),
        docId: localStorage.getItem("docId"),
        date: date,
        startTime: startTime,
        endTime: endTime,
        type: 'changeDate'
      };
  
      $.ajax({
        type: "POST",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/therapy.php",
        data: postData,
        success: function (response) { 
          alert(response);
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });

    } else {
      //alert("Please select a date and both start and end times.");
    }
  }



  //-------------------------------get selected dates & durations---------------------------------
  const selectedDates = [];

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

  function updateSelectedDatesList() {
    const $selectedDatesList = $("#selected-dates");
    $selectedDatesList.empty();

    for (let i = 0; i < selectedDates.length; i++) {
      const listItem = document.createElement("li");
      //listItem.textContent = `Date: ${selectedDates[i].date}, From: ${selectedDates[i].startTime}, To: ${selectedDates[i].endTime}`;
      listItem.className = "list-group-item d-flex";

      const date = document.createElement("h6");
      date.textContent = `${selectedDates[i].date}`;
      date.className = "therapySettingsDate";

      const time = document.createElement("h6");
      time.textContent = `From: ${selectedDates[i].startTime}, To: ${selectedDates[i].endTime}`;
      time.className = "therapySettingsDate";

      listItem.appendChild(date);
      listItem.appendChild(time);

      $selectedDatesList.append(listItem);
    }
  }

  //------------------------------function to get datelist into php----------------------------------
  function getDateList(callback) {
    var postData = {
      pid: localStorage.getItem("currentTherapyPId"),
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

function loadMore() {
  $("#moreContainer").toggle();
}


//--------------------------------------add to calender-date section--------------------------------------------
var popupAddCalenderBtn = $("#popup-button-add-calender");
var popupAddCalenderContainer = $("#popup-container-add-calender");
var closeAddCalenderBtn = $("#close-add-calender-button");

popupAddCalenderBtn.on("click", openPopupAddCalender);
closeAddCalenderBtn.on("click", closePopupAddCalender);
popupAddCalenderContainer.on("click", outsideClickAddCalender);

function openPopupAddCalender() {
  if (localStorage.getItem("therapyEvent") == "havent") {
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
      therapy.forEach(function (therapy) {
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
  addNotificationBtn.on("click", addNotification);

  function addNotification() {
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

//----------------------Male-Female line chart------------------------
var ctx = document.getElementById("lineChart").getContext("2d");

var data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Male",
      data: [50, 45, 70, 65, 80, 100, 80, 85, 70, 50, 60, 40],
      borderColor: "#14bac6ff",
      backgroundColor: "rgba(26, 115, 232, 0.27)",
      cubicInterpolationMode: "monotone", // Use 'monotone' for curved lines
    },
    {
      label: "Female",
      data: [30, 55, 40, 75, 60, 65, 80, 100, 80, 50, 45, 70],
      borderColor: "#CD6688",
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      cubicInterpolationMode: "monotone",
    },
  ],
};
var options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "top", // You can change the position to 'top', 'right', 'left', or 'bottom'
      labels: {
        boxWidth: 10, // Adjust the legend item box size
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Hide x-axis gridlines
      },
    },
    y: {
      grid: {
        display: false, // Hide y-axis gridlines
      },
    },
  },
};
var lineChart = new Chart(ctx, {
  type: "line",
  data: data,
  options: options,
});

//----------------------doughnut chart------------------------
var ctx = document.getElementById("doughnutChart").getContext("2d");

var data = {
  labels: ["Teenagers", "Midlle age", "Old"],
  datasets: [
    {
      data: [50, 40, 20], // Provide the data values here
      backgroundColor: ["#f15162ff", "#5a68ebff", "#46ab67ff"],
    },
  ],
};
var options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top", // You can change the position to 'top', 'right', 'left', or 'bottom'
      labels: {
        boxWidth: 10, // Adjust the legend item box size
      },
    },
  },
};
var doughnutChart = new Chart(ctx, {
  type: "doughnut",
  data: data,
  options: options,
});

//------------------function to get patient data from php------------------
function getPatientData(callback) {
  var postData = {
    myData: localStorage.getItem("currentProfilePatientId"),
  };

  $.ajax({
    type: "POST",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/getPatientData.php",
    data: postData,
    success: function (response) {
      var patient = response;
      callback(patient);
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

//--------------------------------------patient profiles--------------------------------------------
var popupPatientProfileContainer = $("#popup-container-patient-profile");
var closePatientProfileBtn = $("#close-patient-profile-button");
var popupProfileContent = document.getElementById("popup-content-profile");

closePatientProfileBtn.on("click", closePopupPatientProfile);
popupPatientProfileContainer.on("click", outsideClickPatientProfile);

function openPopupPatientProfile() {
  popupPatientProfileContainer.css("display", "block");

  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove the "active" class from all tab buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add the "active" class to the clicked tab button and content
      const tabId = button.getAttribute("data-tab");
      const tabContent = document.getElementById(tabId);
      button.classList.add("active");
      tabContent.classList.add("active");
    });
  });

  //personal info tab
  var id = document.getElementById("pid");
  var name1 = document.getElementById("pname1");
  var name2 = document.getElementById("pname2");
  var dob = document.getElementById("pdob");
  var age = document.getElementById("page");
  var gender = document.getElementById("pcmbgender");
  var address1 = document.getElementById("paddress");
  var email = document.getElementById("pemail");
  var con1 = document.getElementById("pcontactno1");
  var con2 = document.getElementById("pcontactno2");
  var img = document.getElementById("patientImg");

  //-------------------load the data from php-------------------
  getPatientData(function (patient) {
    id.value = patient.id;
    name1.value = patient.name1;
    name2.value = patient.name2;
    dob.value = patient.dob;
    age.value = patient.age;
    gender.value = patient.gender;
    address1.value = patient.address;
    email.value = patient.email;
    con1.value = patient.contactno1;
    con2.value = patient.contactno2;
    img.src = "php/" + patient.img;
  });

  //medical info tab
  var disElement1 = document.getElementById("disElement1");
  var disElement2 = document.getElementById("disElement2");
  var disElement3 = document.getElementById("disElement3");

  var disorder1 = document.getElementById("disorder01");
  var disorder2 = document.getElementById("disorder02");
  var disorder3 = document.getElementById("disorder03");

  var primaryConcern = document.getElementById("primaryConcern");
  var diagnosis = document.getElementById("diagnosis");
  var symptoms = document.getElementById("symptoms");
  var treatmentPlan = document.getElementById("treatmentPlan");
  var additionalNotes = document.getElementById("additionalNotes");

  //-------------------load the data from php-------------------
  getPatientData(function (patient) {
    // Split the paragraph into sentences using commas
    var disorderList = patient.disorderList.split(",");
    // Trim leading and trailing whitespaces from each sentence
    disorderList = disorderList.map(function (sentence) {
      return sentence.trim();
    });

    var symptomsList = patient.symptoms.split(",");
    // Trim leading and trailing whitespaces from each sentence
    symptomsList = symptomsList.map(function (sentence) {
      return sentence.trim();
    });
    var symptomsText = symptomsList.join("\n");

    if (disorderList.length == 0) {
      disElement2.style.display = "none";
      disElement3.style.display = "none";
    }
    if (disorderList.length == 1) {
      disorder1.value = disorderList[0];
      disElement2.style.display = "none";
      disElement3.style.display = "none";
    }
    if (disorderList.length == 2) {
      disorder1.value = disorderList[0];
      disorder2.value = disorderList[1];
      disElement3.style.display = "none";
    }
    if (disorderList.length == 3) {
      disorder1.value = disorderList[0];
      disorder2.value = disorderList[1];
      disorder3.value = disorderList[2];
    }

    primaryConcern.value = patient.primaryConcern;
    diagnosis.value = patient.diagnosis;
    symptoms.value = symptomsText;
    symptoms.rows = symptoms.value.split("\n").length;
    treatmentPlan.value = patient.treatmentPlan;
    additionalNotes.value = patient.additionalNotes;
  });

  document.getElementById("addDisorder").onclick = function () {
    if (disElement2.style.display == "block") {
      disElement3.style.display = "block";
    } else {
      disElement2.style.display = "block";
    }
  };

  document.getElementById("chnageMedicalDetails").onclick = function () {
    if (!disorder2.value.trim() == "" && disorder3.value.trim() == "") {
      var disorderList2 = disorder1.value.toString() + ", " + disorder2.value;
    } else if (!disorder2.value.trim() == "" && !disorder3.value.trim() == "") {
      var disorderList2 =
        disorder1.value + ", " + disorder2.value + ", " + disorder3.value;
    } else if (
      !disorder1.value.trim() == "" &&
      disorder2.value.trim() == "" &&
      disorder3.value.trim() == ""
    ) {
      var disorderList2 = disorder1.value;
    }

    var symptomsList2 = symptoms.value.split("\n");
    // Trim leading and trailing whitespaces from each sentence
    symptomsList2 = symptomsList2.map(function (sentence) {
      return sentence.trim();
    });
    var symptomsText2 = symptomsList2.join(", ");

    var postData = {
      pid: localStorage.getItem("currentProfilePatientId"),
      disorderList: disorderList2,
      primaryConcern: primaryConcern.value,
      diagnosis: diagnosis.value,
      symptoms: symptomsText2,
      treatmentPlan: treatmentPlan.value,
      additionalNotes: additionalNotes.value,
    };

    $.ajax({
      type: "POST",
      url: "http://localhost/login/Mental%20Health%20Management%20System/php/getPatientData.php",
      data: postData,
      success: function (response) {
        alert(response);
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  };

  document.getElementById("discardChanges").onclick = function () {
    getPatientData(function (patient) {
      // Split the paragraph into sentences using commas
      var disorderList = patient.disorderList.split(",");
      // Trim leading and trailing whitespaces from each sentence
      disorderList = disorderList.map(function (sentence) {
        return sentence.trim();
      });

      var symptomsList = patient.symptoms.split(",");
      // Trim leading and trailing whitespaces from each sentence
      symptomsList = symptomsList.map(function (sentence) {
        return sentence.trim();
      });
      var symptomsText = symptomsList.join("\n");

      if (disorderList.length == 0) {
        disElement2.style.display = "none";
        disElement3.style.display = "none";
      }
      if (disorderList.length == 1) {
        disorder1.value = disorderList[0];
        disElement2.style.display = "none";
        disElement3.style.display = "none";
      }
      if (disorderList.length == 2) {
        disorder1.value = disorderList[0];
        disorder2.value = disorderList[1];
        disElement3.style.display = "none";
      }
      if (disorderList.length == 3) {
        disorder1.value = disorderList[0];
        disorder2.value = disorderList[1];
        disorder3.value = disorderList[2];
      }

      primaryConcern.value = patient.primaryConcern;
      diagnosis.value = patient.diagnosis;
      symptoms.value = symptomsText;
      symptoms.rows = symptoms.value.split("\n").length;
      treatmentPlan.value = patient.treatmentPlan;
      additionalNotes.value = patient.additionalNotes;
    });
  };
}

function closePopupPatientProfile() {
  popupPatientProfileContainer.css("display", "none");
}

function outsideClickPatientProfile(event) {
  if ($(event.target).is(popupPatientProfileContainer)) {
    popupPatientProfileContainer.css("display", "none");
  }
}

//------------------function to get user object from php------------------
function getUserData(callback) {
  var postData = {
    docId: localStorage.getItem("docId"),
    type: "docAccess",
  };

  $.ajax({
    type: "POST",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/doctor.php",
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
  getUserData(function (user) {
    var userNameElement = document.querySelector(".userName");
    userNameElement.textContent = "Dr. " + user.name1;
    localStorage.setItem("docName", user.name1 + " " + user.name2);

    const imagePath = String("php/" + user.img);
    document.querySelector("#profile").src = imagePath;
    document.querySelector("#display_image2").src = imagePath;
    localStorage.setItem("docImg", imagePath);
  });

  //--------------------------------------New patients section--------------------------------------------
  var popupNewPatientsBtn = $("#popup-button-new-patients");
  var popupNewPatientsContainer = $("#popup-container-new-patients");
  var closeNewPatientsBtn = $("#close-button-new-patients");

  popupNewPatientsBtn.on("click", openPopupNewPatients);
  closeNewPatientsBtn.on("click", closePopupNewPatients);
  popupNewPatientsContainer.on("click", outsideClickNewPatients);

  function openPopupNewPatients() {
    popupNewPatientsContainer.css("display", "block");
    getNewPatientsListFromPHP();
  }

  function closePopupNewPatients() {
    popupNewPatientsContainer.css("display", "none");
  }

  function outsideClickNewPatients(event) {
    if ($(event.target).is(popupNewPatientsContainer)) {
      popupNewPatientsContainer.css("display", "none");
    }
  }

  /*function toggleInfo() {
    const toggleButton = document.getElementById("toggleButton");
    const personalInfo = document.querySelector(".personalInfo");
    const medicalInfo = document.querySelector(".medicalInfo");
    let isPersonalInfoVisible = false;

    toggleButton.addEventListener("click", function () {
      if (isPersonalInfoVisible) {
        personalInfo.style.display = "none";
        medicalInfo.style.display = "block";
        toggleButton.textContent = "View Personal Info";
      } else {
        personalInfo.style.display = "block";
        medicalInfo.style.display = "none";
        toggleButton.textContent = "View Medical Info";
      }
      isPersonalInfoVisible = !isPersonalInfoVisible;
    });
  }*/

  // Function to retrieve chat list from PHP
  function getNewPatientsListFromPHP() {
    var postData = {
      type: "newPatientsList",
      docId: localStorage.getItem("docId"),
    };

    $.ajax({
      type: "GET",
      url: "http://localhost/login/Mental%20Health%20Management%20System/php/newPatients.php",
      data: postData,
      success: function (response) { 
        // Assuming the response is an array of chat data objects
        var newPatientData = JSON.parse(response);
        updateNewPatientsList(newPatientData)
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  // Function to update the chat list with data
  function updateNewPatientsList(newPatientData) {
    var newPatientList = document.getElementById("newPatient-list");
    newPatientList.innerHTML = "";

    // Loop through the chat data and create list items
    newPatientData.forEach(function (patientItem) {
      var listItem = document.createElement("li");
      listItem.className = "newPatient d-flex";
      listItem.id = patientItem.id;

      var imagePath = String("php/" + patientItem.userImage);
      var fullName = String(patientItem.firstName + " " + patientItem.lastName);

      // Create and set the image element
      var img = document.createElement("img");
      img.src = imagePath; // Replace with your data property
      img.className = "patient-img";

      var btn = document.createElement("button");
      btn.textContent = "Accept";
      btn.className = "btn rounded-pill accept";

      // Create and set the name element
      var name = document.createElement("div");
      name.className = "patient-name";
      name.type = "button";
      name.textContent = fullName; // Replace with your data property

      // Add a click event listener using a closure
      listItem.addEventListener(
        "click",
        (function (listItem) {
          return function () {
            newPatientElementClickHandler(listItem);
          };
        })(listItem, img)
      );

      // Add a click event listener using a closure
      btn.addEventListener(
        "click",
        (function (listItem) {
          return function () {
            acceptPatientClickHandler(listItem);
          };
        })(listItem, img)
      );

      // Append image and name elements to the list item
      listItem.appendChild(img);
      listItem.appendChild(name);
      listItem.appendChild(btn);
      // Append the list item to the chat list
      newPatientList.appendChild(listItem);
    });
  }

  // Define a click event handler outside of the function
  function newPatientElementClickHandler(elementId) {
    localStorage.setItem("currentNewPatientId", elementId.id);
    openNewPatientProfile();
  }

  //function to accept patient
  function acceptPatientClickHandler(listItem){
    var postData = {
      docId: localStorage.getItem("docId"),
      pid: listItem.id
    };

    $.ajax({
      type: "GET",
      url: "http://localhost/login/Mental%20Health%20Management%20System/php/newPatients.php",
      data: postData,
      success: function (response) {
        alert(response);
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  function openNewPatientProfile() {

    const personalInfo = document.querySelector(".personalInfo");
    personalInfo.style.display = "block";

    var id = document.getElementById("np-id");
    var name1 = document.getElementById("np-name1");
    var name2 = document.getElementById("np-name2");
    var dob = document.getElementById("np-dob");
    var age = document.getElementById("np-age");
    var gender = document.getElementById("np-cmbgender");
    var address1 = document.getElementById("np-address");
    var email = document.getElementById("np-email");
    var con1 = document.getElementById("np-contactno");
    var img = document.getElementById("new-patient-pic");

    //-------------------load the data from php-------------------
    getNewPatientData(function (patient) { 
      //id.value = patient.id;
      name1.value = patient.name1;
      name2.value = patient.name2;
      dob.value = patient.dob;
      age.value = patient.age;
      gender.value = patient.gender;
      address1.value = patient.address;
      email.value = patient.email;
      con1.value = patient.contactno1;
      img.src = "php/" + patient.img;
    });
  }

  //------------------function to get new patient data from php------------------
  function getNewPatientData(callback) {
    var postData = {
      pid: localStorage.getItem("currentNewPatientId"),
    };

    $.ajax({
      type: "POST",
      url: "http://localhost/login/Mental%20Health%20Management%20System/php/newPatients.php",
      data: postData,
      success: function (response) { 
        var patient = response;
        callback(patient);
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  //--------------------------------------chat section--------------------------------------------
  var popupChatBtn = $("#popup-button-chat");
  var popupChatContainer = $("#popup-container-chat");
  var closeChatBtn = $("#close-chat-button");

  popupChatBtn.on("click", openPopupChat);
  closeChatBtn.on("click", closePopupChat);
  popupChatContainer.on("click", outsideClickChat);

  function openPopupChat() {
    popupChatContainer.css("display", "block");

    const chatMessages = document.querySelector(".chat-messages");
    const chatInputForm = document.querySelector(".chat-input-form");
    const chatInput = document.querySelector(".chat-input");

    let messageSender = "doctor";

    function loadMessages() {
      chatMessages.innerHTML = "";

      getDPChatData(function (data) {
        data.forEach(function (row) {
          if (row.docMsg == "" && row.patientMsg != "") {
            const Rmessage = {
              sender: "patient",
              text: row.patientMsg,
              timestamp: row.timeStamp,
              img: localStorage.getItem("currentChatPatientImg"),
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

    const messages = JSON.parse(localStorage.getItem("messages")) || [];

    const createChatMessageElement = (message) =>
      `
       <img src="${message.img}" class="${message.sender}-img" alt="">
       <div class="message nw ${
         message.sender === "doctor" ? "blue-bg" : "gray-bg"
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
          img: localStorage.getItem("docImg"),
        };
        /* Save message to local storage */
        messages.push(message);
        postDPChatData(message);
        localStorage.setItem("messages", JSON.stringify(messages));
        /* Add message to DOM */
        chatMessages.innerHTML += createChatMessageElement(message);
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

    /*clearChatBtn.addEventListener("click", () => {
      //localStorage.clear();
      chatMessages.innerHTML = "";
    });*/

    //-------------------------function to post doctor-patient chat data to php----------------------------
    function postDPChatData(message) {
      var postData = {
        pid: localStorage.getItem("currentChatPatientId"),
        docId: localStorage.getItem("docId"),
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
        pid: localStorage.getItem("currentChatPatientId"),
        docId: localStorage.getItem("docId"),
        receiver: "doctor",
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

    // Function to retrieve chat list from PHP
    function getChatListFromPHP() {
      var postData = {
        type: "chatList",
        docId: localStorage.getItem("docId"),
      };

      $.ajax({
        type: "GET",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/patientList.php",
        data: postData,
        success: function (response) {
          // Assuming the response is an array of chat data objects
          var chatData = JSON.parse(response);
          updateChatList(chatData);
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    }

    // Function to update the chat list with data
    function updateChatList(chatData) {
      var chatList = document.getElementById("chatList");
      chatList.innerHTML = "";

      // Loop through the chat data and create list items
      chatData.forEach(function (chatItem) {
        var listItem = document.createElement("li");
        listItem.className = "chatListItem d-flex";
        listItem.id = chatItem.id;

        var imagePath = String("php/" + chatItem.userImage);
        var fullName = String(chatItem.firstName + " " + chatItem.lastName);

        // Create and set the image element
        var img = document.createElement("img");
        img.src = imagePath; // Replace with your data property
        img.className = "patient-img2";

        // Create and set the name element
        var name = document.createElement("div");
        name.className = "patient-name pn2";
        name.type = "button";
        name.textContent = fullName; // Replace with your data property

        // Add a click event listener using a closure
        listItem.addEventListener(
          "click",
          (function (listItem, img) {
            return function () {
              patientElementClickHandler(listItem, img);
            };
          })(listItem, img)
        );

        // Append image and name elements to the list item
        listItem.appendChild(img);
        listItem.appendChild(name);
        // Append the list item to the chat list
        chatList.appendChild(listItem);
      });
    }

    getChatListFromPHP();

    // Define a click event handler outside of the function
    function patientElementClickHandler(elementId, imgElement) {
      localStorage.setItem("currentChatPatientId", elementId.id);
      localStorage.setItem("currentChatPatientImg", imgElement.src);
      loadMessages();
    }

    // Function to search chat
    document.getElementById("searchPatientChat").addEventListener("keyup", function() {
        var searchQuery = this.value.toLowerCase(); 
        var chatListItems = document.querySelectorAll('.chatListItem');

        chatListItems.forEach(function(item) {
            var patientName = item.querySelector('.patient-name').textContent.toLowerCase(); 
            if (patientName.includes(searchQuery)) { 
                item.style.display = "flex";
            } else {
                item.style.display = "none";
                item.classList.remove("d-flex")
            }
        });
    });
    
  }

  function closePopupChat() {
    popupChatContainer.css("display", "none");
  }

  function outsideClickChat(event) {
    if ($(event.target).is(popupChatContainer)) {
      popupChatContainer.css("display", "none");
    }
  }

  //--------------------------------------Progress section--------------------------------------------
  var popupProgressBtn1 = $("#popup-button-progress");
  var popupProgressBtn2 = $("#quickAccessProgress");
  var popupProgressContainer = $("#popup-container-progress");
  var closeProgressBtn = $("#close-button-progress");

  popupProgressBtn1.on("click", openPopupProgress);
  popupProgressBtn2.on("click", openPopupProgress2);
  closeProgressBtn.on("click", closePopupProgress);
  popupProgressContainer.on("click", outsideClickProgress);

  function openPopupProgress2() {
    /*const elementId = {
      id: localStorage.getItem("currentTherapyPId")
    };*/
    openPopupProgress();
    localStorage.setItem("currentProgressPatientId", localStorage.getItem("currentTherapyPId"));
      
  }

  function openPopupProgress() {
    popupProgressContainer.css("display", "block");

    // Function to retrieve patient list from PHP
    function getPatientListFromPHP() {
      var postData = {
        type: "patientList",
        docId: localStorage.getItem("docId"),
      };

      $.ajax({
        type: "GET",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/patientList.php",
        data: postData,
        success: function (response) { 
          // Assuming the response is an array of patient data objects
          var patientData = JSON.parse(response);  //alert(patientData)
          updatePatientList(patientData);
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    }

    // Function to update the patient list with data
    function updatePatientList(patientData) {
      var patientList = document.getElementById("Patient-list-progress");
      patientList.innerHTML = "";

      // Loop through the patient data and create list items
      patientData.forEach(function (patientItem, index) {
        var listItem = document.createElement("li");
        listItem.className = "progressPatient d-flex";
        listItem.id = patientItem.id;

        var imagePath = String("php/" + patientItem.userImage);
        var fullName = String(
          patientItem.firstName + " " + patientItem.lastName
        );

        // Create and set the image element
        var img = document.createElement("img");
        img.src = imagePath; // Replace with your data property
        img.className = "patient-img";

        // Create and set the name element
        var name = document.createElement("div");
        name.className = "patient-name pn2";
        name.type = "button";
        name.textContent = fullName; // Replace with your data property

        var btnProgress = document.createElement("button");
        btnProgress.className = "btn rounded-pill viewPro";
        btnProgress.textContent = "View Progress";

        // Add a click event listener using a closure
        btnProgress.addEventListener(
          "click",
          (function (listItem) {
            return function () {
              patientElementClickHandlerPrg(listItem);
            };
          })(listItem)
        );

        // Append image and name elements to the list item
        listItem.appendChild(img);
        listItem.appendChild(name);
        listItem.appendChild(btnProgress);
        // Append the list item to the chat list
        patientList.appendChild(listItem);
      });
    }

    getPatientListFromPHP();

    // Define a click event handler outside of the function
    function patientElementClickHandlerPrg(elementId) {
      localStorage.setItem("currentProgressPatientId", elementId.id);
      weeklyProgressSpinner();
      monthlyProgressSpinner();
      yearlyProgressSpinner();
      animateBars();
    }

    //------------function to load progress data from php--------------
    function getDailyProgressData(callback) {
      var postData = {
        pid: localStorage.getItem("currentProgressPatientId"),
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

    //------------function to load progress bargraph data from php--------------
    function getProgressData(callback) {
      var postData = {
        pid: localStorage.getItem("currentProgressPatientId"),
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

    //load bar graph
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
  }

  // Function to search progress
  document.getElementById("searchPtaientProgress").addEventListener("keyup", function() {
    var searchQuery = this.value.toLowerCase(); 
    var chatListItems = document.querySelectorAll('.progressPatient');

    chatListItems.forEach(function(item) {
        var patientName = item.querySelector('.patient-name').textContent.toLowerCase(); 
        if (patientName.includes(searchQuery)) { 
            item.style.display = "flex";
        } else {
            item.style.display = "none";
            item.classList.remove("d-flex")
        }
    });
  });

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
  var closeReportBtn = $("#close-button-report");

  popupReportBtn.on("click", openPopupReport);
  closeReportBtn.on("click", closePopupReport);
  popupReportContainer.on("click", outsideClickReport);

  function openPopupReport() {
    popupReportContainer.css("display", "block");

    // Function to retrieve patient list from PHP
    function getPatientListFromPHP() {
      var postData = {
        type: "patientList",
        docId: localStorage.getItem("docId"),
      };

      $.ajax({
        type: "GET",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/report.php",
        data: postData,
        success: function (response) {  
          var patientData = JSON.parse(response); 
          updatePatientList(patientData);
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    }

    // Function to update the patient list with data
    function updatePatientList(patientData) {  
      var patientList = document.getElementById("Patient-list-report");
      patientList.innerHTML = "";

      // Loop through the patient data and create list items
      patientData.forEach(function (patientItem) {  
        var listItem = document.createElement("li");
        listItem.className = "reportPatient d-flex";
        listItem.id = patientItem.pid;

        var imagePath = String("php/" + patientItem.userImg);
        var fullName = String(patientItem.userName);

        // Create and set the image element
        var img = document.createElement("img");
        img.src = imagePath; // Replace with your data property
        img.className = "patient-img";

        // Create and set the name element
        var name = document.createElement("div");
        name.className = "patient-name pn2";
        name.type = "button";
        name.textContent = fullName; // Replace with your data property

        var btnView = document.createElement("button");
        btnView.className = "btn rounded-pill viewReport";
        btnView.textContent = "View Report";

        var btnApprove = document.createElement("button");
        btnApprove.className = "btn rounded-pill approve";
        btnApprove.textContent = "Approve";

        // Add a click event listener using a closure
        btnView.addEventListener(
          "click",
          (function (listItem) {
            return function () {
              reportViewHandler(listItem);
            };
          })(listItem)
        );

        // Add a click event listener using a closure
        btnApprove.addEventListener(
          "click",
          (function (listItem, btnApprove) {
            return function () {
              reportApproveHandler(listItem, btnApprove);
            };
          })(listItem, btnApprove)
        );

        // Append image and name elements to the list item
        listItem.appendChild(img);
        listItem.appendChild(name);
        listItem.appendChild(btnView);
        listItem.appendChild(btnApprove);
        // Append the list item to the chat list
        patientList.appendChild(listItem);
      });
    }

    getPatientListFromPHP();

    // Define a click event handler outside of the function
    function reportViewHandler(elementId) {
      localStorage.setItem("currentReportPatientId", elementId.id);
      viewReport("view", elementId);
    }
    // Define a click event handler outside of the function
    function reportApproveHandler(elementId, btnApprove) {
      localStorage.setItem("currentReportPatientId", elementId.id);
      viewReport("approve", btnApprove);
    }

    //-------------------------function to get report data from php----------------------------
    function getReportData(callback) {
      var postData = {
        pid: localStorage.getItem("currentReportPatientId"),
        docId: localStorage.getItem("docId"),
        type: "viewReport",
      };

      $.ajax({
        type: "GET",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/report.php",
        data: postData,
        success: function (response) { 
          var data = JSON.parse(response);
          callback(data);
        },
        error: function (xhr, status, error) {
          onsole.error(xhr.responseText);
        },
      });
    }

    function saveReportBackToPHP(reportData) {
      $.ajax({
        type: "POST",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/report.php",
        data: reportData,
        success: function (response) {},
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    }

    function viewReport(type, btnApprove) {
      if (type == "view") {
        getReportData(function (data) {
          data.forEach(function (data) {
            var spinner = document.getElementById("spinner1");
            spinner.style.display = "block";

            const reportContainer = document.getElementById("reportContainer");

            setTimeout(() => {
              spinner.style.display = "none";

              const report = generateReport1(
                data.userName,
                data.age,
                data.gender,
                data.email,
                data.primaryConcern,
                data.diagnosis,
                data.symptoms,
                data.treatmentPlan,
                data.additionalNotes,
                data.disorder1,
                data.disorder2,
                data.about1,
                data.about2
              );
              reportContainer.innerHTML = report;
            }, 5000);
          });
        });
      } else if (type == "approve") {
        getReportData(function (data) {
          data.forEach(function (data) {
            var spinner = document.getElementById("spinner2");
            spinner.style.display = "block";

            const reportContainer = document.getElementById("reportContainer");
            const docName = localStorage.getItem("docName");

            setTimeout(() => {
              spinner.style.display = "none";

              const report = generateReport2(
                data.userName,
                data.age,
                data.gender,
                data.email,
                data.primaryConcern,
                data.diagnosis,
                data.symptoms,
                data.treatmentPlan,
                data.additionalNotes,
                data.disorder1,
                data.disorder2,
                data.about1,
                data.about2,
                docName
              );
              reportContainer.innerHTML = report;
              btnApprove.textContent = "Approved";
              btnApprove.disabled = true;

              const reportData = {
                pid: data.pid,
                docId: data.docId,
                approval: true,
              };
              saveReportBackToPHP(reportData);
            }, 5000);
          });
        });
      }
    }

    function generateReport1(
      patientName,
      age,
      gender,
      email,
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
      primaryConcern,
      diagnosis,
      symptoms,
      treatmentPlan,
      additionalNotes,
      disorder1,
      disorder2,
      about1,
      about2,
      docName
    ) {
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
          
          <p>This medical report has been reviewed and approved by Dr. ${docName}.</p>
          
          <p>Best regards,<br>Your Mental Health Team</p>
          <h6>www.Brainstorm.com</h6>
    
      </div>
      `;

      return template;
    }
  }

  // Function to search progress
  document.getElementById("searchPtaientReport").addEventListener("keyup", function() {
    var searchQuery = this.value.toLowerCase(); 
    var chatListItems = document.querySelectorAll('.reportPatient');

    chatListItems.forEach(function(item) {
        var patientName = item.querySelector('.patient-name').textContent.toLowerCase(); 
        if (patientName.includes(searchQuery)) { 
            item.style.display = "flex";
        } else {
            item.style.display = "none";
            item.classList.remove("d-flex")
        }
    });
  });

  function closePopupReport() {
    popupReportContainer.css("display", "block");
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
  var closeLogoutBtn = $("#close-button-logout");

  popupLogoutBtn.on("click", openPopupLogout);
  closeLogoutBtn.on("click", closePopupLogout);
  popupLogoutContainer.on("click", outsideClickLogout);

  function openPopupLogout() {
    popupLogoutContainer.css("display", "block");

    document.getElementById("loggingout-btn").onclick = function () {
      var postData = {
        role: "doctor",
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

  //--------------------------------------Profile section--------------------------------------------
  var popupProfileBtn = $("#popup-button-profile");
  var popupProfileContainer = $("#popup-container-profile");
  var closeProfileBtn = $("#close-profile-button");
  var popupProfileContentd = document.getElementById("popup-content-profile");
  var pwclick = document.getElementById("doc-pwclick");
  var genclick = document.getElementById("doc-genclick");

  popupProfileBtn.on("click", openPopupProfile);
  closeProfileBtn.on("click", closePopupProfile);
  popupProfileContainer.on("click", outsideClickProfile);

  function openPopupProfile() {
    popupProfileContainer.css("display", "block");

    $(function () {
      $(".datepicker").datepicker();
    });

    var id = document.getElementById("doc-id");
    var name1 = document.getElementById("doc-name1");
    var name2 = document.getElementById("doc-name2");
    var dob = document.getElementById("doc-dob");
    var age = document.getElementById("doc-age");
    var gender = document.getElementById("doc-cmbgender");
    var address = document.getElementById("doc-address");
    var email = document.getElementById("doc-email");
    var contactno = document.getElementById("doc-contactno");
    var uname = document.getElementById("doc-un");
    var pword = document.getElementById("doc-pw");

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
      contactno.value = user.contactno;
      uname.value = user.username;
      pword.value = user.password;
      userImg = user.userImage;
    });

    popupProfileContentd.addEventListener("click", function (event) {
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
      displaylbluser(text1);
    });

    pword.addEventListener("input", function (event) {
      var text2 = event.target.value;
      validatePW(text2);
      displaylblpass(text2);
    });

    contactno.addEventListener("input", function (event) {
      var text3 = event.target.value;
      validateCON1(text3);
      displaylblcon1(text3);
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
      //displaylblgender(text9);
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
    $("#updateDetails2").submit(function (event) {
      gender.querySelector('option[value="Male"]').disabled = false;
      gender.querySelector('option[value="Female"]').disabled = false;
      event.preventDefault();
      const formData = new FormData(this);

      if (imageInput2.files.length > 0) {
        formData.append("user_image2", imageInput2.files[0]);
      }

      $.ajax({
        type: "POST",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/updateDoctorInfo.php",
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

    const imageInput2 = document.querySelector("#image_input2");
    var uploadImage2 = "";

    imageInput2.addEventListener("change", function () {
      const reader2 = new FileReader();
      const selectedFile = this.files[0];
      if (!selectedFile) {
      }
      reader2.addEventListener("load", () => {
        uploadImage2 = reader2.result;
        document.querySelector("#display_image2").src = uploadImage2;
      });
      reader2.readAsDataURL(this.files[0]);
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
});

//------------------info toggle button--------------------
document.addEventListener("DOMContentLoaded", function () {});

function editItem(item) {
  var name1 = document.getElementById("doc-name1");
  var name2 = document.getElementById("doc-name2");
  var dob = document.getElementById("doc-dob");
  var age = document.getElementById("doc-age");
  var gender = document.getElementById("doc-cmbgender");
  var address = document.getElementById("doc-address");
  var email = document.getElementById("doc-email");
  var contactno = document.getElementById("doc-contactno");
  var un = document.getElementById("doc-un");
  var pw = document.getElementById("doc-pw");

  var disorder1 = document.getElementById("disorder01");
  var disorder2 = document.getElementById("disorder02");
  var disorder3 = document.getElementById("disorder03");
  var primaryConcern = document.getElementById("primaryConcern");
  var diagnosis = document.getElementById("diagnosis");
  var symptoms = document.getElementById("symptoms");
  var treatmentPlan = document.getElementById("treatmentPlan");
  var additionalNotes = document.getElementById("additionalNotes");

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
    if (gender.querySelector('option[value="Male"]').disabled == true) {
      gender.querySelector('option[value="Male"]').disabled = false;
      gender.querySelector('option[value="Female"]').disabled = false;
    } else {
      gender.querySelector('option[value="Male"]').disabled = true;
      gender.querySelector('option[value="Female"]').disabled = true;
    }

    gender.focus();
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
    contactno.readOnly = !contactno.readOnly;
    contactno.focus();
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

  if (item == "dis1-icon") {
    disorder1.readOnly = !disorder1.readOnly;
    disorder1.focus();
  }
  if (item == "dis2-icon") {
    disorder2.readOnly = !disorder2.readOnly;
    disorder2.focus();
  }
  if (item == "dis3-icon") {
    disorder3.readOnly = !disorder3.readOnly;
    disorder3.focus();
  }
  if (item == "primaryConcern-icon") {
    primaryConcern.readOnly = !primaryConcern.readOnly;
    primaryConcern.focus();
  }
  if (item == "diagnosis-icon") {
    diagnosis.readOnly = !diagnosis.readOnly;
    diagnosis.focus();
  }
  if (item == "symptoms-icon") {
    symptoms.readOnly = !symptoms.readOnly;
    symptoms.focus();
  }
  if (item == "treatmentPlan-icon") {
    treatmentPlan.readOnly = !treatmentPlan.readOnly;
    treatmentPlan.focus();
  }
  if (item == "additionalNotes-icon") {
    additionalNotes.readOnly = !additionalNotes.readOnly;
    additionalNotes.focus();
  }
}

//popup tooltips
document.addEventListener('DOMContentLoaded', function() {
  tippy('#editEvent', {
      content: 'Edit Event',
  });
  
  tippy('#deleteEvent', {
      content: 'Delete Event',
  });
  
  tippy('#searchEvent', {
      content: 'Search Event',
  });

  tippy('#addEvent', {
    content: 'Add Event',
  });

  tippy('#clearForm', {
    content: 'Clear Form',
  });

  tippy('#popup-button-add-notification', {
    content: 'Add Notification',
  });

  tippy('#popup-button-add-calender', {
      content: 'Add Calender Event',
  });

  tippy('#popup-button-therapy-settings', {
      content: 'Therapy Settings',
  });

  tippy('#navIcon', {
    content: 'Navigation Panel',
  });
});