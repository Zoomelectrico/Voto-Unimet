$(document).ready(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    var nombre = document.getElementById('nombre');
    var email = document.getElementById('email');
    console.log(nombre);
    if (user) {
    	nombre.value = user.displayName;
      email.value = user.email;
      document.getElementById('enviarDenuncia').addEventListener('click', function() {
      	var denuncia = document.getElementById('denuncia').value;
      	guardarDenuncia(denuncia, user.uid);
      });
    } else {
    	document.getElementById('enviarDenuncia').addEventListener('click', function() {
        alert('Debes estar registrado'); 
      });
    }
  });
  function guardarDenuncia (denuncia, UID) {
  	var myRef = firebase.database().ref('Denuncias/'+UID+'/').push();
  	var key = myRef.key;
  	var newData = {
      ID: UID,
      Denuncia: denuncia,
      URLArchivo: ['']
    }
  	myRef.push(newData);
  }
});