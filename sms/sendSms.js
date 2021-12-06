var http = require("http");

/** 
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
*/

const sendSms = (messageBody) => {
  const ipAddress = "172.20.96.46";
  const xmlhttp = new XMLHttpRequest();

  // open xmlhttp request
  try {
    xmlhttp.open(
      "POST",
      `http://${ipAddress}:6060/INTRANETService/`,
      true
    );
  } catch (e) {
    alert("error on open : " + e.toString());
  }
  // construct message
  try {
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
  } catch (e) {
    alert("error on setRequestHeader : " + e.toString());
  }

  try {
    xmlhttp.send(messageBody);
  } catch (e) {
    alert("error on send : " + e.toString());
  }
}

module.exports = { sendSms };
