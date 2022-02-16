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
