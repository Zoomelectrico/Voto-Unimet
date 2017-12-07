// Llenar tabla
/*var ref = firebase.database().ref("Candidatos/CID");
ref.once("value")
  .then(function(snapshot) {
    var name = snapshot.child("Nombre").val(); // {first:"Ada",last:"Lovelace"}

    var d = '<tbody>' +

      '<tr>' +
      '<td>' + name + '</td>' +
      '<td>' + 'nose' + '</td>' +
      '<td>' + 'nose' + '</td>' +
      '<td>' + 'nose' + '</td>' +
      '</tr>' +
      '</tbody>';
    $("#tabla").append(d);
  });

ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    
  });
});
*/


   


	
	var ref = firebase.database().ref("Candidatos");
	     
	var tabla = document.getElementById("tabla");

	tabla.innerHTML = "";
	    
	ref.orderByValue().limitToLast(4).on("child_added", function(snapshot){
	     
	  var data = snapshot.val(); 
	  console.log(data.Nombre); 

	  var row = tabla.insertRow(0);
	  var nombre = row.insertCell(0);
	  var cargo = row.insertCell(1);
	  var plancha = row.insertCell(2);
    var cantVotos = row.insertCell(3);

	  nombre.innerHTML = data.Nombre;
	  cargo.innerHTML = data.Cargo;
	  plancha.innerHTML = data.Plancha;
    cantVotos.innerHTML = data.cantVotos;
	 
    
	        
	});
	 
/*
function contarVotos(candidato){
  firebase.database().ref('Votos').on("child_added", function(snapshot){
    var v = snapshot.val();

    if(v.idUser == candidato.Nombre){

    }
  });
}*/

ref.on("child_added", function(snapshot){
  var data = snapshot.val(); 
  addData(myChart, data.Nombre, data.cantVotos);
})

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}



//Gráfica
var ctx = document.getElementById("myChart");
var tble = document.getElementById('tabla');

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: '# of Votes',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});