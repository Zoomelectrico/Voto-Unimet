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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	console.log('1');
  	console.log(user);
  	$('#chip-div').removeClass('hide');
  	$('#user-name').append(user.displayName);
  	$('#img-user').attr("src",user.photoURL);
  	$('#logout').removeClass('hide');
  	$('#login').addClass('hide');
  	document.getElementById('user-name').innerHTML = user.displayName;
  } else {
  	console.log('2');
    $('#chip-div').addClass('hide');
    $('#logout').addClass('hide');
    $('#login').removeClass('hide');
  }
});

document.querySelector("#login").addEventListener('click', signIn);
document.querySelector("#login-m").addEventListener('click', signInMobile);

function signIn () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
	    var user = result.user;
	    firebase.database().ref('User/' + user.uid).set({
			UID: user.uid,
			nombre: user.displayName,
			email: user.email
		});
    }).catch(function(error) {});
}

function signInMobile () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {
	    var user = result.user;
	    firebase.database().ref('User/' + user.uid).set({
			UID: user.uid,
			nombre: user.displayName,
			email: user.email
		});
    }).catch(function(error) {});
}

document.querySelector("#logout").addEventListener('click', signOut);
function signOut(){
	firebase.auth().signOut().then(function () {}).catch(function (error) {});
}