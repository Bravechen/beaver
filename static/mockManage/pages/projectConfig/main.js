
function init() {
  window.addEventListener('DOMContentLoaded', onDocReady);
}

function onDocReady() {
  window.removeEventListener('DOMContentLoaded', onDocReady);
}



init();
