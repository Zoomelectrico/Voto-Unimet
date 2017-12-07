$(document).ready(function() {
/*
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
  });*/
/*
function sumarVoto (CID) {
  let votos = firebase.database().ref('Votos'+CID);
  votos.transaction(function(currentRank) {
    // If users/ada/rank has never been set, currentRank will be `null`.
    return currentRank + 1;
  });
}
*/



var db = firebase.database();
  var ref = db.ref("Candidatos");
       
  var table = document.getElementById("candidatos-table");
      
  table.innerHTML = "";
  var i = 0;
  var j=0;
   
      
  ref.orderByChild("Cargo").on("child_added", function(snapshot){
       
    var d = snapshot.val(); 
    console.log(d.Nombre);       
          
    {
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    // asigna a las celdas el valir del Child especificado
    cell1.innerHTML =  d.Cargo;
    cell2.innerHTML = d.Plancha;
    cell3.innerHTML = d.Nombre;
    cell4.innerHTML = '<img src= ' + '\' ' + d.urlFoto + '\'' + 'class = ' + '\' ' + 'responsive-img circle' + '\'' + '>' ;

      if(d.Cargo=="Consejero Estudiantil"){
        console.log("consejero");
        //var input = document.createElement("input");
        //input.type = "radio";
        //input.setAttribute("String",d.Nombre);
        var parent = document.getElementById("cont1");
        $('<p><input name="groupCons" type="radio" id="consejero'+ '\''+i+'\"' + ' value = "'+d.username+'"/><label for="consejero'+ '\''+i+'\"'+'>'+d.Nombre+ '</label>').appendTo(parent);
        i++;
      }else if(d.Cargo == "Presidente Estudiantil"){
        console.log("Presidente");
        var parent = document.getElementById("cont2");
        $('<p><input name="groupPres1" type="radio" id="presidente'+ '\''+j+'\"' + ' value = "'+d.username+'"/><label for="presidente'+ '\''+j+'\"'+'>'+d.Nombre+ '</label>').appendTo(parent);
        j++;
      }
    }
        console.log("este es el nombre " + document.formVotar.groupPres1[0].value);
          
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


$('#votarBtn').click(function(){
  var i 
  var votosRef = firebase.database().ref("Votos");
  for (i=0;i<document.formVotar.groupCons.length;i++){ 
      if (document.formVotar.groupCons[i].checked) 
        break; 
  } 
  console.log("hola" + document.formVotar.groupCons[i].value);

  var numVotosRef = firebase.database().ref().child('/Candidatos/'+document.formVotar.groupCons[i].value);// +  '\'' + document.formVotar.groupCons[i].value + '\'')
  numVotosRef.once("value",function(snapshot){
    var cantVotosActual = snapshot.val().cantVotos + 1;
    console.log("Cantidad de votos: "+snapshot.val().Nombre);
    numVotosRef.update({
      cantVotos: cantVotosActual
    });
  })
  
  let newData = {
      idUser: document.formVotar.groupCons[i].value
    }
    votosRef.push(newData);

  for (i=0;i<document.formVotar.groupPres.length;i++){ 
      if (document.formVotar.groupPres1[i].checked) 
        break; 
  } 
  newData = {
      idUser: document.formVotar.groupPres1[i].value
    }
  votosRef.push(newData);
  });
  