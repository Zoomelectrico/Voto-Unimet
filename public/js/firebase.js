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

//Constantes de Firebase
const db = firebase.database();
const auth = firebase.auth();

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
	console.log('flag 1');
	firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then(function(result){
		var user = result.user;
	}).catch(function(error){
		console.log(error)
	});
	firebase.auth().getRedirectResult().then(function(result){
		var user = result.user;
		console.log(user);
	}).catch(function(error){
		console.log(error);
	});
}
function logout () {
	auth.signOut()
		.then(function(){
			// Beio
		}).catch(function(error){
			console.log(error);
		});
}

