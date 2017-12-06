firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (user.voto === false || typeof user.voto === 'undefined') {
      $('#votacion').removeClass('hide');
    } else {
       alert('Ya vostate loco');
       $('#votacion').addClass('hide');
    }
  } else {
    $('#votacion').addClass('hide');
  }
});