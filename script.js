const MONTHS = [
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
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const section = document.querySelector(".section-center");
const alert = document.querySelector(".alert");
const form = document.querySelector(".bDay-form");
const input = document.querySelector(".birthdate-input");
const values = document.querySelectorAll(".section-center h4");

let dateString;
let userDate;
let timeLeft;

const oneMinute = 60 * 1000;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;

const date = new Date();

function validate(e) {
  e.preventDefault();
  const value = input.value;
  if (!value) {
    setAlert("please enter your birth-date", "warning");
    return;
  }
  dateString = value;
  userDate = new Date(dateString);

  if (value && userDate == "Invalid Date") {
    setAlert("Invalid Date", "warning");
    input.value = "";
    return;
  }

  section.style.visibility = "visible";
  const timer = setInterval(() => {
    setCountDown();
  }, 1000);

  setCountDown();
  input.value = "";

  if (timeLeft <= -oneDay) {
    section.innerText = "birthday celebrated";
    clearInterval(timer);
    setTimeout(() => {
      section.innerText = "";
    }, 2000);
    return;
  }

  if (timeLeft <= 0) {
    section.innerText = "happy birthday";
    clearInterval(timer);
    setTimeout(() => {
      section.innerText = "";
    }, 2000);
    return;
  }
}

form.addEventListener("submit", validate);

function setCountDown() {
  const dateNow = new Date();
  timeLeft = userDate - dateNow;
  const days = Math.floor(timeLeft / oneDay);
  const hours = Math.floor((timeLeft % oneDay) / oneHour);
  const minutes = Math.floor((timeLeft % oneHour) / oneMinute);
  const seconds = Math.floor((timeLeft % oneMinute) / 1000);
  let result = [days, hours, minutes, seconds];

  values.forEach((item, index) => {
    item.innerText = result[index];
  });
}

function setAlert(message, action) {
  alert.innerText = message;
  alert.classList.add(action);

  setTimeout(() => {
    alert.innerText = "";
    alert.classList.remove(action);
  }, 1000);
}
