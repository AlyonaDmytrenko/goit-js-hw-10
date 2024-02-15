import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
    const currentDate = new Date();
    if (userSelectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

const daysEl = document.querySelector('.timer .value[data-days]');
const hoursEl = document.querySelector('.timer .value[data-hours]');
const minutesEl = document.querySelector('.timer .value[data-minutes]');
const secondsEl = document.querySelector('.timer .value[data-seconds]');

const startBtn = document.querySelector('[data-start]');

startBtn.addEventListener('click', startCountdown);

function startCountdown() {
  const selectedDate = flatpickr.parseDate(
    document.getElementById('datetime-picker').value,
    'Y-m-d H:i'
  );
  const currentDate = new Date();
  if (selectedDate <= currentDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    return;
  }

  startBtn.disabled = true;
  document.getElementById('datetime-picker').disabled = true;

  let difference = selectedDate.getTime() - currentDate.getTime();

  const countdownInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(difference);
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    difference -= 1000;

    if (difference < 0) {
      clearInterval(countdownInterval);
      iziToast.success({
        title: 'Countdown Finished',
        message: 'The countdown has ended.',
      });
      startBtn.disabled = false;
      document.getElementById('datetime-picker').disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
