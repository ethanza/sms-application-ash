var http = require("http");

const sendSms = (messageBody) => {
  const options = {
    hostname: "http://172.20.96.46:6060/INTRANETService/",
    method: "POST",
    headers: {
      "Content-Type": "text/xml;charset=UTF-8l",
      'SOAPAction': "",
      'Transfer-Encoding': 'chunked',
      'X-WASP-Message-ID': '1b1-OstcZLf3vIstN+/hHYWvTQ==',
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
