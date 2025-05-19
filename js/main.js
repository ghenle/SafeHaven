import { config } from './config.min.js';

document.addEventListener('DOMContentLoaded', (e) => {
  const path       = window.location.pathname ?? '/';
  const pathArray  = path.substring(1).split('/');
  const paramArray = new URLSearchParams(window.location.search);

  const allInputs     = document.querySelectorAll('#contact > form input:not([type="radio"])');
  const userInputs    = document.querySelectorAll('input:not([type="radio"]):not([type="hidden"])');
  const urchinInputs  = document.querySelectorAll('input[name^="utm_"]');
  const serviceArea   = document.querySelector('input[name="service_area"]');
  const inServiceArea = document.querySelector('input[name="in_service_area"]');
  const locationName  = document.querySelector('#call > h2 > span');
  const locationPhone = document.querySelector('#call > h3 > a');
  const myForm        = document.querySelector('#contact > form');
  const myFormButton  = document.querySelector('#contact > form > button');
  const myGPSButton   = document.querySelector("#contact > form div.gps > button")
  const customerZip   = document.querySelector("#zip");
  
  let locationInfo = false;

  const populateInputs = ()=>{
    let local   = path;
    let inLocal = 'UNKNOWN - location incorrect';

    if ( locationInfo ) {
      const zip = customerZip.value.match(/^\d{5}/);

      local = locationInfo.location;

      if ( zip ) {
        inLocal = (locationInfo.serviceZips.indexOf(zip[0]) !== -1)
          ? 'YES'
          : 'NO';
      } else {
        inLocal = "UNKNOWN - zip code incorrect"
      }
    }

    serviceArea.value   = path;
    inServiceArea.value = inLocal;

    console.log(serviceArea.value);
    console.log(inServiceArea.value);
  };

  console.log(pathArray);

  /**
   * Validate user inputs for the benifit of the user
   * Input sanitization will occur in the processing API.
   **/
  userInputs.forEach((e)=>{
    if ( e.hasAttribute('pattern') ) {
      let regex  = new RegExp('^' + e.getAttribute('pattern') + '$', 'i');

      e.addEventListener('blur', (evt) => {
        evt.target.style.borderColor = regex.test(evt.target.value)
          ? config.color.good
          : config.color.bad;
      });
    } else {
      e.addEventListener('blur', (evt) => {
        evt.target.style.borderColor = !(!evt.target.value)
          ? config.color.good
          : config.color.bad;
      });
    }
  });
  /**
   * Intercept the form submission.
   **/
  myFormButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    populateInputs();
    // Trigger the form submission
    myForm.submit();
  });
  /**
   * Autofill the ZIP Code.
   * Google Geocoding API
   **/
  myGPSButton.addEventListener('click', (e) => {
    navigator.geolocation.getCurrentPosition((position) => {
      config.google.query.latlng =  `${position.coords.latitude},${position.coords.longitude}`;

      const params = new URLSearchParams(config.google.query).toString();
      const url    = `${config.google.url}?${params}`;
      
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // For clarity. The address_components array in the results
          const address = data.results[0].address_components;

          // Find the postal code (zip code)
          const postalCode = address.find(component => component.types.includes('postal_code')).long_name;

          // prefill the ZIP
          customerZip.style.borderColor = config.color.good;
          customerZip.value = postalCode;

          // Use the postal code as needed
          console.log(`[XHR] geolocation data: ${postalCode}`);
        }).catch((error) => {
          console.error(error);
          console.log(new Error().stack);
        });
  });


  });
  /**
   * capture the phone link click.
   **/
  locationPhone.addEventListener('click', (e) => {
    const formData = new FormData();

    formData.append('branchPhone', e.target.getAttribute('href'));

    populateInputs();

    allInputs.forEach((e)=>{
      let name = e.getAttribute('name');
      formData.append(name, e.value);
    });

    fetch('/api/lead', {
      method: 'POST',
      body: formData
    });
  });


  /**
   * Set UTM (Urchin Tracking Module) parameters
   *
   * @url https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
   **/
  urchinInputs.forEach((e)=>{
    let utm_name = e.getAttribute('name');
    console.log(utm_name);

    if ( paramArray.has(utm_name) ) {
      e.value = paramArray.get(utm_name)
    }
  });

  /**
   * Based on the URL path, select the location
   **/
  fetch(config.URLs.locationData)
    .then(response => response.json())
    .then(data => {
      const locArray = Object.keys(data);

      // intersection of path parts with the location peoperty names.
      const filtered = pathArray.filter((n) => {return locArray.indexOf(n) !== -1;}).shift();

      console.log(`[XHR] location data: ${filtered}`);

      if ( typeof filtered !== 'undefined' && typeof data[filtered] !== 'undefined' ) {
        locationInfo = data[filtered];

        locationName.firstChild.nodeValue = `${locationInfo.location} is`;
        locationPhone.setAttribute('href', `tel:${locationInfo.phone}`);
      }
    }).catch((error) => {
      console.error(error);
      console.log(new Error().stack);
    });
});