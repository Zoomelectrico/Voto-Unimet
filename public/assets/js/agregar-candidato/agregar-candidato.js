$(document).ready(function() {
  document.getElementById('agregar').addEventListener('click', function() {
    var file = document.getElementById("fileUpload").files[0];
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child('Candidatos/' + file.name).put(file);
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
      firebase.database().ref('Candidatos/'+document.getElementById('nombre').value).set({
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        cargo: document.getElementById('cargo').value,
        plancha: document.getElementById('plancha').value,
        foto: uploadTask.snapshot.downloadURL
      });
      alert('agregado con exito');
      window.location = 'index.html';
    });
  });
});