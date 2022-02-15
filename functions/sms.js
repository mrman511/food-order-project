// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
require("dotenv").config();

const client = require("twilio")(
  "AC9ec83d5bd555f244fe05f869992ec3fe",
  "f9dc80a75032facdf5eef918b18adba6"
);

const sendSMS = function () {
  client.messages
    .create({
      body: "You are a great coder!",
      from: "+18596953484",
      to: "+17789980493",
    })
    .then((message) => console.log(message.sid));
};

module.exports = { sendSMS };
