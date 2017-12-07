$(document).ready(function() {

  var db = firebase.database();
  var ref = db.ref("Candidatos");
  var storage = firebase.storage();
  var table = document.getElementById("candidatos-table");

  table.innerHTML = "";
  var i = 0;
  var j = 0;



  function armarTabla(data) {

    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    
    cell1.innerHTML = data.Cargo;
    cell2.innerHTML = data.Plancha;
    cell3.innerHTML = data.Nombre;
    cell4.innerHTML = data.Miscelaneo.Carrera;

    var storage = firebase.storage();
    console.log(555);
    var gsReference = storage.refFromURL(data.urlFoto);
    if (typeof data.urlFoto === 'undefined') {
      cell5.innerHTML = 'Hola';
    }
    gsReference.getDownloadURL().then(function(url) { 
      cell5.innerHTML = '<img src= ' + '\'' + url + '\'' + ' class= ' + '\' ' + 'responsive-img circle' + '\'' + '>';
    }).catch(function(error) {});
    
    console.log('listopoooo')
  }

  ref.orderByChild("Cargo").equalTo("Consejero Estudiantil").on("child_added", function(snapshot) {

    var data = snapshot.val();
    console.log(data.Nombre);

    armarTabla(data);

    console.log("consejero");
    var parent = document.getElementById("cont1");
    $('<p><input name="groupCons" type="radio" id="consejero' + '\'' + i + '\"' + ' value = "' + data.username + '"/><label for="consejero' + '\'' + i + '\"' + '>' + data.Nombre + '</label>').appendTo(parent);
    i++;

  });


  ref.orderByChild("Cargo").equalTo("Presidente Estudiantil").on("child_added", function(snapshot) {

    var data = snapshot.val();
    console.log(data.Nombre);

    armarTabla(data);

    console.log("Presidente");
    var parent = document.getElementById("cont2");
    $('<p><input name="groupPres1" type="radio" id="presidente' + '\'' + j + '\"' + ' value = "' + data.username + '"/><label for="presidente' + '\'' + j + '\"' + '>' + data.Nombre + '</label>').appendTo(parent);
    j++;
    //console.log("este es el nombre " + document.formVotar.groupPres1[0].value);

  });


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      if (user.voto === false || typeof user.voto === 'undefined') {
        $('#votacion').removeClass('hide');
      } else {
        alert('Ya vostate');
        $('#votacion').addClass('hide');
        window.location = 'index.html'

      }
    } else {
      alert('No puedes votar si no estas registrado')
      window.location = 'index.html'
    }
  });
});


$('#votarBtn').click(function() { //pasar el user para comprobar que no puede votar dos veces, poner la condicion de que si voto a true
  var i
  var votosRef = firebase.database().ref("Votos");

  //Para los consejeros de escuela
  for (i = 0; i < document.formVotar.groupCons.length; i++) {
    if (document.formVotar.groupCons[i].checked)
      break;
  }


  var numVotosRef = firebase.database().ref().child('/Candidatos/' + document.formVotar.groupCons[i].value);
  numVotosRef.once("value", function(snapshot) {
    var cantVotosActual = snapshot.val().cantVotos + 1;
    console.log("Cantidad de votos: " + snapshot.val().Nombre);
    numVotosRef.update({
      cantVotos: cantVotosActual
    });
    window.location = 'panel.html';
  })

  let newData = {
    idUser: document.formVotar.groupCons[i].value
  }
  votosRef.push(newData);


  //Para los presidentes
  for (i = 0; i < document.formVotar.groupPres1.length; i++) {
    console.log("entro en un ciclo");
    if (document.formVotar.groupPres1[i].checked)
      break;
  }

  numVotosRef = firebase.database().ref().child('/Candidatos/' + document.formVotar.groupPres1[i].value);
  numVotosRef.once("value", function(snapshot) {
    var cantVotosActual = snapshot.val().cantVotos + 1;
    console.log("Cantidad de votos: " + snapshot.val().Nombre);
    numVotosRef.update({
      cantVotos: cantVotosActual
    });
  })

  newData = {
    idUser: document.formVotar.groupPres1[i].value
  }
  votosRef.push(newData);

});