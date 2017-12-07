$(document).ready(function() {
  firebase.auth().onAuthStateChanged(function(userG) {
    if (userG) {
      var userRef = firebase.database().ref('User/' + userG.uid);
      userRef.on('value', function(snapshotUser) {
        var user = snapshotUser.val();
        console.log(user);
        if (user.voto === false || typeof user.voto === 'undefined') {
          $('#votar').removeClass('hide');
          document.getElementById('votoMensaje').innerHTML = 'No has votado';
        } else {
          $('#votar').addClass('hide');
          document.getElementById('votoMensaje').innerHTML = 'Ya votaste';
        }
      })
    } else {
      window.location = 'index.html';
    }
  });
});