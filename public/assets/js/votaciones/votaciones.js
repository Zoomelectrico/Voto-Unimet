$(document).ready(function() {

  let ref = firebase.database().ref("Candidatos");
  ref.once("value").then(function(snapshot) {
    let obj = snapshot.val();
    console.log(snapshot.val());
    var d;
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let val = obj[key];
        d =
        '<tr>' +
        '<td>' + '<img src=' + '\' ' + val.urlFoto + '\'' + 'class=' + '\' ' + 'responsive-img circle' + '\'' + '>' + '</td>' +
        '<td>' + val.nombre + '</td>' +
        '<td>' + val.cargo + '</td>' +
        '<td>' + val.plancha + '</td>' +
        '</tr>';
      $("#candidatos-table").append(d);      }
    }  
  });
/*
function sumarVoto (CID) {
  let votos = firebase.database().ref('Votos'+CID);
  votos.transaction(function(currentRank) {
    // If users/ada/rank has never been set, currentRank will be `null`.
    return currentRank + 1;
  });
}
*/

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