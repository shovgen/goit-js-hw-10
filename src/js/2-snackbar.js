console.log('snackbar');

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";



const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const { delay, state } = e.currentTarget.elements;
    const deleyValue = Number(delay.value);
    const stateValue = state.value;
    createPromise(deleyValue, stateValue)
        .then(value => {
            iziToast.success({
                title: 'OK',
                message: `✅ Fulfilled promise in ${value}ms`, position: "topRight"
            });
            console.log(`✅ Fulfilled promise in ${value}ms`);

        })
        .catch(value => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${value}ms`,
        position: 'topRight'
            });
            console.log(`❌ Rejected promise in ${value}ms`);
        })
    form.reset();
});


function createPromise(delay , state) {
    return  new Promise((res, rej) => {
        setTimeout(() => {
            if (state ==='fulfilled') {
                res(delay);
            } else {
                rej(delay);
            }
        },delay );

    });
  
}