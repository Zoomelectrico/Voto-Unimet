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


   


	var db = firebase.database();
	var ref = db.ref("Candidatos");
	     
	var table = document.getElementById("tabla");
	    
	//limpia la tabla
	table.innerHTML = "";
	 
	 //con esta función recorre todos los datos almacenados en FB ordenados por mi child(tipo)
	    
	ref/*.orderByChild("tipo")*/.on("child_added", function(snapshot){
	//repite el proceso como cuantas referencias encuentre y los asigna a la lista "d"
	     
	  var d = snapshot.val(); 
	  console.log(d.Nombre);       
	        
	  {
	  var row = table.insertRow(0);
	  var cell1 = row.insertCell(0);
	  var cell2 = row.insertCell(1);
	  var cell3 = row.insertCell(2);
	  
	  // asigna a las celdas el valir del Child especificado
	  cell1.innerHTML = d.Nombre;
	  cell2.innerHTML = d.Candidato;
	  cell3.innerHTML = d.Nombre;

	  }
	 
	        
	});
	 








//Gráfica
var ctx = document.getElementById("myChart");

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
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