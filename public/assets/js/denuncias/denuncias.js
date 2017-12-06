$(document).ready(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    let nombre = document.getElementById('nombre');
    let email = document.getElementById('email');
    console.log(nombre);
    if (user) {
      nombre.value = user.displayName;
      email.value = user.email;
      document.getElementById('enviarDenuncia').addEventListener('click', function() {
        var file = document.getElementById("fileUpload").files[0];
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child('Denuncias/' + file.name).put(file);
        uploadTask.on('state_changed', function(snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {
          console.log(error)
        }, function() {
          let denuncia = document.getElementById('denuncia').value;
          guardarDenuncia(denuncia, user.uid,uploadTask.snapshot.downloadURL);
          window.location = 'index.html';  
        });
        
      });
    } else {
      document.getElementById('enviarDenuncia').addEventListener('click', function() {
        alert('Debes estar registrado');
      });
    }
  });

  function guardarDenuncia(denuncia, UID, url) {
    let myRef = firebase.database().ref('Denuncias/' + UID + '/').push();
    let key = myRef.key;
    let newData = {
      ID: UID,
      Denuncia: denuncia,
      URLArchivo: url
    }
    myRef.push(newData);
  }
});