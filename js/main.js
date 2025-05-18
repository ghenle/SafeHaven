import { config } from './config.js';
import { XHR } from './XHR.js';

document.addEventListener('DOMContentLoaded', (e) => {
  /*
  const bgElements = document.querySelectorAll('[data-background-async]');
  bgElements.forEach((e)=>{
    e.style.backgroundImage = e.getAttribute('data-background-async');
  });
  /**/

  XHR.get(config.URLs.locationData).then((json) => {
    const jsonObj = JSON.parse(json);
    console.log(jsonObj);
  }).catch((error) => {
    console.error(error);
    console.log(new Error().stack);
  });
});