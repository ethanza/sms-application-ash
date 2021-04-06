var http = require("http");

const sendSms = (messageBody) => {
  const options = {
    hostname: "http://sg1.channelmobile.co.za/",
    method: "POST",
    headers: {
      "Content-Type": "text/xml",
    },
  };

  const request = http.request(options, (res) => {
    res.on("data", (response) => {
      console.log("response: ", response);
    });
  });

  request.write(messageBody);
  request.end();
};

module.exports = { sendSms };
