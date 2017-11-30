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

document.getElementById('signup').addEventListener('click', function(){
	var email = document.getElementById('email').value;
	var pass = document.getElementById('password').value;
	if (email.endsWith('@correo.unimet.edu.ve')) {
		signup(email, pass);	
	} else {
		alert('Usuario no permitido')
	}
	
});

document.getElementById('login').addEventListener('click', function(){
	var email = document.getElementById('email').value;
	var pass = document.getElementById('password').value;
	if (email.endsWith('@correo.unimet.edu.ve')) {
		login(email, pass);	
	} else {
		alert('Usuario no permitido')
	}
});

function signup (email,pass) {
	firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		console.log(error);
	});
}

function login (email,pass) {
	firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
 	var errorCode = error.code;
  	var errorMessage = error.message;
  	console.log(error)
});
}