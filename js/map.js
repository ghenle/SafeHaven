async function init() {
  await customElements.whenDefined('gmp-map');

  const map = document.querySelector('gmp-map');

  map.innerMap.setOptions({
    mapTypeControl: false
  });
}

document.addEventListener('DOMContentLoaded', init);