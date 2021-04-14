const xlsxFile = require("read-excel-file/node");
const {
  default: readXlsxFileNode,
} = require("read-excel-file/commonjs/readXlsxFileNode");
const readXlsxFile = require("read-excel-file/node");
const { sendSms } = require("./sendSms");

// https://bezkoder.com/node-js-upload-excel-file-database/

const getSMSHandler = async (req) => {
  xlsxFile("./Data.xlsx").then((rows) => {
    let service_advisor = "";
    let contact_number = "";
    let time = "";
    let allSms = [];
    for (let index = 0; index < rows.length; index++) {
      const entry = rows[index];
      if (index === 0) {
        service_advisor = entry.findIndex(getServiceAdvisor);
        contact_number = entry.findIndex(getContactNumber);
        time = entry.findIndex(getTime);
      } else {
        const uid = 1234;
        const username = 'anna';
        const password = "password";
        const type = 'sms';

        const body = `<XML>
          <SENDBATCH delivery_report="1" status_report="1">
             <SMSLIST>
               <SMS_SEND uid=${uid} user=${username} password=${password} to=${entry[contact_number]}>Dear Valued Customer, your vehicle is booked for ${entry[time]} with ${entry[service_advisor]}. Please ensure no valuables in the car.</SMS_SEND>
             </SMSLIST>
          </SENDBATCH>
       </XML>`;

      const smsBody =  `<?xml version="1.0" encoding="utf-8"?>
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://systinet.com/wsdl/bsi/service/"> 
        <soapenv:Header/>   
         <soapenv:Body>    
            <ser:SendMessage> 	   
                 <ser:p0>${username}</ser:p0> 	    
                     <ser:p1>${type}</ser:p1> 	   
                          <ser:p2>${entry[contact_numer]}</ser:p2> 	
                                  <ser:p3>Dear Valued Client, thank you for booking your vehicle in at SMG Century City. 
                                    Your vehicle is booked for Monday  at ${entry[time]}  with ${entry[service_advisor]}. To adhere to the current social distancing measures,
                                    we request that you please remain in your vehicle upon arrival until one of our SMG representatives assists you.
                                    Please ensure all valuables have been removed from your vehicle as well as all discarded masks and tissues   
                                    prior to check-in and kindly note we are a cashless site. Our Shuttle Service is operational should you not be 
                                    able to make arrangements for your own transportation. We look forward to welcoming you to the dealership.
                                    Stay Safe, Stay Healthy, Stay Sanitized!
                                  </ser:p3>      
              </ser:SendMessage>  
            </soapenv:Body>
          </soapenv:Envelope>`;

          allSms.push[smsBody];

        // sendSms(smsBody);
        console.log(allSms);
      }
    }
  });
};

const getServiceAdvisor = (entry) => {
  return entry === "Service Advisor";
};

const getContactNumber = (entry) => {
  return entry === "Contact Number";
};
const getTime = (entry) => {
  return entry === "Time";
};

const upload = async (req, res) => {
  let content = [];
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path = __basedir + "/public/resources/uploads/" + req.file.filename;

    readXlsxFile(path).then((rows) => {
      var service_advisor = "";
      var contact_number = "";
      var time = "";
      for (var index = 2; index < rows.length; index++) {
        const entry = rows[index];
        if (index === 2) {
          service_advisor = entry.findIndex(getServiceAdvisor);
          contact_number = entry.findIndex(getContactNumber);
          time = entry.findIndex(getTime);
        } else {
          const uid = 1234;
          const username = 'anna';
          const password = "password";
          const type = 'sms';

          // const body = `<XML>
          //     <SENDBATCH delivery_report="1" status_report="1">
          //        <SMSLIST>
          //          <SMS_SEND uid=${uid} user=${username} password=${password} to=${entry[contact_number]}>
          //          Dear Valued Client, thank you for booking your vehicle in at SMG Century City. 
          //          Your vehicle is booked for tomorrow at ${entry[time]} with ${entry[service_advisor]}. 
          //          To adhere to the current social distancing measures, 
          //          we request that you please remain in your vehicle upon arrival until one 
          //          of our SMG representatives assists you. Please ensure all valuables have been removed from
          //          your vehicle as well as all discarded masks and tissues  
          //          prior to check-in and kindly note we are a cashless site. 
          //          Our Shuttle Service is operational should you not be able to make arrangements for your own transportation.
          //          We look forward to welcoming you to the dealership. Stay Safe, Stay Healthy, Stay Sanitized
          //        </SMS_SEND>
          //        </SMSLIST>
          //     </SENDBATCH>
          //  </XML>`;

           const smsBody =  `<?xml version="1.0" encoding="utf-8"?>
           <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://systinet.com/wsdl/bsi/service/"> 
             <soapenv:Header/>   
              <soapenv:Body>    
                 <ser:SendMessage> 	   
                      <ser:p0>${username}</ser:p0> 	    
                          <ser:p1>${type}</ser:p1> 	   
                               <ser:p2>${entry[contact_number]}</ser:p2> 	
                                       <ser:p3>Dear Valued Client, thank you for booking your vehicle in at SMG Century City. 
                                         Your vehicle is booked for Monday  at ${entry[time]}  with ${entry[service_advisor]}. To adhere to the current social distancing measures,
                                         we request that you please remain in your vehicle upon arrival until one of our SMG representatives assists you.
                                         Please ensure all valuables have been removed from your vehicle as well as all discarded masks and tissues   
                                         prior to check-in and kindly note we are a cashless site. Our Shuttle Service is operational should you not be 
                                         able to make arrangements for your own transportation. We look forward to welcoming you to the dealership.
                                         Stay Safe, Stay Healthy, Stay Sanitized!
                                       </ser:p3>      
                   </ser:SendMessage>  
                 </soapenv:Body>
               </soapenv:Envelope>`;
          sendSms(smsBody);
          content.push(smsBody);
        }
      }

      res.status(200).send({
        message: "files uploaded" + content,
      });
      return "uploaded";
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

module.exports = { getSMSHandler, upload };
