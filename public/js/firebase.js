// Configuracipn de Firebase
var config = {
  apiKey: "AIzaSyBa0nE6NxMXyBDwzG-a4VFK3AVRnl-ueHU",
  authDomain: "votounimet.firebaseapp.com",
  databaseURL: "https://votounimet.firebaseio.com",
  projectId: "votounimet",
  storageBucket: "votounimet.appspot.com",
  messagingSenderId: "601104183423"
};
firebase.initializeApp(config);
const dbUser = firebase.database().ref().child('users');
const dbVotos = firebase.database().ref().child('votos');
const dbDenuncias = firebase.database().ref().child('denuncias');
const dbCandidatos = firebase.database().ref().child('candidatos');


// Inicio de Sesion
$('#login').click(function(){
	var user = firebase.auth().currentUser;
	if(user){
		logout();
	} else {
		login();
	}	
});

// Funciones de Auth
function login () {
	var provedor =  new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithRedirect(provedor)
		.then(function(result){
			var token = result.credential.accessToken;
			var user = result.user;

		}).catch(function(error){
		console.log(error);
	});  
}
function logout () {
	firabse.auth().signOut()
		.then(function(){
			// Beio
		}).catch(function(error){
			console.log(error);
		});
}