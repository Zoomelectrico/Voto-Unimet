$(document).ready(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      if (user.voto === false || typeof user.voto === 'undefined') {
        $('#votar').removeClass('hide');
        document.getElementById('votoMensaje').innerHTML = 'No has votado';
      } else {
        $('#votar').addClass('hide');
      }
    } else {
      window.location = 'index.html';
    }
  });
});