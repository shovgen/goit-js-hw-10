import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";


console.log('timer');

const startBtn = document.querySelector('button[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const Ddays = document.querySelector('[data-days]');
const Dhours = document.querySelector('[data-hours]');
const Dminutes = document.querySelector('[data-minutes]');
const Dseconds = document.querySelector('[data-seconds]');
const timer = document.querySelector('.timer');


let userSelectedDate = null;
let timerId = null;

startBtn.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates;
      console.log(selectedDates[0]);
      
        if (selectedDate[0] <= new Date()) {
              iziToast.error({
                title: 'Error',
                message: "Please choose a date in the future",
        position: 'topRight'
            });
        
          startBtn.disabled = true;

      } else {
          userSelectedDate = selectedDates[0];
          startBtn.disabled = false;
      }
  },
};
flatpickr(datetimePicker, options);

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    datetimePicker.disabled = true;

    timerId = setInterval(() => {
        const currentTime = new Date();
        const deltaTime = userSelectedDate - currentTime;
        if (deltaTime < 0) {
            clearInterval(timerId);
            updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        const time = convertMs(deltaTime);
        updateTimerInterface(time);
    }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
    Ddays.textContent = addLeadingZero(days);
    Dhours.textContent = addLeadingZero(hours);
    Dminutes.textContent = addLeadingZero(minutes);
    Dseconds.textContent = addLeadingZero(seconds);
}




