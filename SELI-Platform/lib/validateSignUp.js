import { Meteor } from 'meteor/meteor';
const EmailValidator = require('email-deep-validator');

Meteor.methods({
  'ValidateEmail'(email){
    return validateEmail(email);
  }
});

async function validateEmail(email) {
  let isValid;
  try {
    const emailValidator = new EmailValidator();
    const { wellFormed, validDomain, validMailbox } = await emailValidator.verify(email);
    isValid = validDomain && wellFormed;
  } catch (e) {
    console.log(e);
  }
  return isValid;
}
