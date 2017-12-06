'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

const APP_NAME = 'Voto Unimet'; //Nombre de la aplicacion

exports.sendWelcomeEmail = functions.auth.user().onCreate(event => {
  const user = event.data; // The Firebase user.
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The name of the user
  return welcomeEmail(email, displayName); //The promise return
});

function welcomeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <norespondervotounimet@gmail.com>`,
    to: email
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hola ${displayName || ''}! Bienvenido a ${APP_NAME}. \n Esperamos que tu experiencia sea placentera, y no olvides votar. \n\n Sinceramente el Equipo de Voto Unimet`;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New welcome email sent to:', email);
  });
}