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

document.querySelector('[data-start]').addEventListener('click', () => {
  const userSelectedDate = flatpickr.parseDate(
    document.querySelector('#datetime-picker').value
  );
  const currentDate = new Date();

  if (userSelectedDate <= currentDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    return;
  }

  document.querySelector('[data-start]').disabled = true;
  document.querySelector('#datetime-picker').disabled = true;

  const intervalId = setInterval(() => {
    const timeLeft = userSelectedDate - new Date();
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      document.querySelector('.timer .value[data-days]').textContent = '00';
      document.querySelector('.timer .value[data-hours]').textContent = '00';
      document.querySelector('.timer .value[data-minutes]').textContent = '00';
      document.querySelector('.timer .value[data-seconds]').textContent = '00';
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    document.querySelector('.timer .value[data-days]').textContent =
      addLeadingZero(days);
    document.querySelector('.timer .value[data-hours]').textContent =
      addLeadingZero(hours);
    document.querySelector('.timer .value[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('.timer .value[data-seconds]').textContent =
      addLeadingZero(seconds);
  }, 1000);
});

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
  return value < 10 ? '0' + value : value;
}
