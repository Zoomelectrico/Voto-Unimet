$(document).ready(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    let nombre = document.getElementById('nombre');
    let email = document.getElementById('email');
    console.log(nombre);
    if (user) {
    	nombre.value = user.displayName;
      email.value = user.email;
      document.getElementById('enviarDenuncia').addEventListener('click', function() {
      	subirArchivo();
        let denuncia = document.getElementById('denuncia').value;
      	guardarDenuncia(denuncia, user.uid); 
        window.location = 'index.html';
      });
    } else {
    	document.getElementById('enviarDenuncia').addEventListener('click', function() {
        alert('Debes estar registrado'); 
      });
    }
  });
  function guardarDenuncia (denuncia, UID) {
  	let myRef = firebase.database().ref('Denuncias/'+UID+'/').push();
  	let key = myRef.key;
  	let newData = {
      ID: UID,
      Denuncia: denuncia,
      URLArchivo: ['']
    }
  	myRef.push(newData);
  }
  function subirArchivo () {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      let denunciasRef = firebase.storage.ref("Denuncias");
      let fileUpload = document.getElementById("fileUpload");
      fileUpload.on('change', function(evt) {
        let file = evt.target.file[0];
        if (file) { let uploadTask = denunciasRef.child(file.name).put(firstFile); }
        else { console.log ('No subio nada');}
      });
    } else {
      alert('Tu navegador no permite subir archivos');
    }

    
  }
});