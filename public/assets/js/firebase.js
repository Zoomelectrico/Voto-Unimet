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
    $('.user-view').removeClass('hide');
    $('#user-name').append(user.displayName);
    $('#user-photo').attr("src", user.photoURL);
    $('#logout').removeClass('hide');
    $('#login').addClass('hide');
  } else {
    console.log('2');
    $('.user-view').addClass('hide');
    $('#logout').addClass('hide');
    $('#login').removeClass('hide');
  }
});

document.querySelector("#login").addEventListener('click', signIn);
document.querySelector("#login-m").addEventListener('click', signInMobile);

function signIn() {
  let provider = new firebase.auth.GoogleAuthProvider();
  console.log("a ver");
  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log("esta entrando");
    let user = result.user;
    console.log("Entra bien");
    firebase.database().ref('User/' + user.uid).set({
      UID: user.uid,
      nombre: user.displayName,
      email: user.email
    });
    //window.location = 'panel.html';
  }).catch(function(error) {});
}

function signInMobile() {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider).then(function(result) {
    let user = result.user;
    firebase.database().ref('User/' + user.uid).set({
      UID: user.uid,
      nombre: user.displayName,
      email: user.email
    });
  }).catch(function(error) {});
}

document.querySelector("#logout").addEventListener('click', signOut);

function signOut() {
  firebase.auth().signOut().then(function() {}).catch(function(error) {});
}