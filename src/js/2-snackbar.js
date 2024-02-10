// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delayInput = parseInt(form.elements['delay'].value);
    const state = form.elements['state'].value;

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delayInput);
        } else if (state === 'rejected') {
          reject(delayInput);
        }
      }, delayInput);
    });

    promise
      .then(delay => {
        iziToast.success({
          title: 'Fulfilled Promise',
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
      })
      .catch(delay => {
        iziToast.error({
          title: 'Rejected Promise',
          message: `❌ Rejected promise in ${delay}ms`,
        });
      });
  });
});
