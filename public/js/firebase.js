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
// Inicio de Sesion
$('#login').click(function(){
	console.log('Flag 3');
	login();
});
// Funciones de Auth
function login () {
	var provedor =  new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithRedirect(provedor).then(function(result){
			console.log('Flag 4');
			var token = result.credential.accessToken;
  			var user = firebase.auth().currentUser;
  			if (typeof user === "undefined") {console.log('aqui')}
  			db.ref('User/'+user.UID).set({
  				UID: user.UID,
  				nombre: user.displayName,
  			});
  		}).catch(function(error){
		console.log(error);
	});  
}
function logout () {
	firebase.auth().signOut().then(function(){
			console.log('Flag 5');
		}).catch(function(error){
			console.log(error);
		});
}