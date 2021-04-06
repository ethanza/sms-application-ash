const xlsxFile = require("read-excel-file/node");
const {
  default: readXlsxFileNode,
} = require("read-excel-file/commonjs/readXlsxFileNode");
const readXlsxFile = require("read-excel-file/node");

// https://bezkoder.com/node-js-upload-excel-file-database/

// const excelFilter = (req, file, cb) => {
//     if(
//         file.mimetype.includes('excel') ||
//         file.mimetype.includes('spreadsheetml')
//     ){
//         cb(null, true);
//     }else{
//         cb("please upload excel file.", false);
//     }

//     var storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, __basedir + "/resources/static/assets/uploads/");
//         },
//         filename: (req, file, cb) => {
//             console.log(file.originalname);
//             cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
//         },
//     });
// }
// var uploadFile = multer({storage: storage, filFilter: excelFilter});

const getSMSHandler = async (req) => {
  xlsxFile("./Data.xlsx").then((rows) => {
    let service_advisor = "";
    let contact_number = "";
    let time = "";
    for (let index = 0; index < rows.length; index++) {
      const entry = rows[index];
      if (index === 0) {
        service_advisor = entry.findIndex(getServiceAdvisor);
        contact_number = entry.findIndex(getContactNumber);
        time = entry.findIndex(getTime);
      } else {
        const uid = 1234;
        const username = "username";
        const password = "password";

        const body = `<XML>
          <SENDBATCH delivery_report="1" status_report="1">
             <SMSLIST>
               <SMS_SEND uid=${uid} user=${username} password=${password} to=${entry[contact_number]}>Dear Valued Customer, your vehicle is booked for ${entry[time]} with ${entry[service_advisor]}. Please ensure no valuables in the car.</SMS_SEND>
             </SMSLIST>
          </SENDBATCH>
       </XML>`;

        console.log(body);
      }
    }

    // console.log(`Dear value client, your car has been booked in with  ${entry[0]} for ${entry[1]}`);
  });
};

const getServiceAdvisor = (entry) => {
  return entry === "service_advisor";
};

const getContactNumber = (entry) => {
  return entry === "number";
};
const getTime = (entry) => {
  return entry === "time";
};

// const upload = async(req, res) => {

//     try {
//         if (req.file == undefined){
//             return res.status(400).send("Please upload excel file!");
//         }
//         let path =  __basedir + "/resources/static/assets/uploads/" + req.file.filename;

//         readXlsxFile(path).then((rows) => {
//             let service_advisor = "";
//             let contact_number = "";
//             let time = "";
//             for (let index = 0; index < rows.length; index++) {
//               const entry = rows[index];
//               if (index === 0) {
//                 service_advisor = entry.findIndex(getServiceAdvisor);
//                 contact_number = entry.findIndex(getContactNumber);
//                 time = entry.findIndex(getTime);
//               } else {
//                 const uid = 1234;
//                 const username = "username";
//                 const password = "password";

//                 const body = `<XML>
//                   <SENDBATCH delivery_report="1" status_report="1">
//                      <SMSLIST>
//                        <SMS_SEND uid=${uid} user=${username} password=${password} to=${entry[contact_number]}>Dear Valued Customer, your vehicle is booked for ${entry[time]} with ${entry[service_advisor]}. Please ensure no valuables in the car.</SMS_SEND>
//                      </SMSLIST>
//                   </SENDBATCH>
//                </XML>`;

//               console.log(body);
//               }
//             }
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//           message: "Could not upload the file: " + req.file.originalname,
//         });
//       }
// };

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    debugger;
    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    readXlsxFile(path).then((rows) => {
      debugger;
      let service_advisor = "";
      let contact_number = "";
      let time = "";
      for (let index = 0; index < rows.length; index++) {
        const entry = rows[index];
        if (index === 0) {
          service_advisor = entry.findIndex(getServiceAdvisor);
          contact_number = entry.findIndex(getContactNumber);
          time = entry.findIndex(getTime);
        } else {
          const uid = 1234;
          const username = "username";
          const password = "password";

          const body = `<XML>
              <SENDBATCH delivery_report="1" status_report="1">
                 <SMSLIST>
                   <SMS_SEND uid=${uid} user=${username} password=${password} to=${entry[contact_number]}>
                   Dear Valued Client, thank you for booking your vehicle in at SMG Century City. 
                   Your vehicle is booked for tomorrow at ${entry[time]} with ${entry[service_advisor]}. 
                   To adhere to the current social distancing measures, 
                   we request that you please remain in your vehicle upon arrival until one 
                   of our SMG representatives assists you. Please ensure all valuables have been removed from
                   your vehicle as well as all discarded masks and tissues  
                   prior to check-in and kindly note we are a cashless site. 
                   Our Shuttle Service is operational should you not be able to make arrangements for your own transportation.
                   We look forward to welcoming you to the dealership. Stay Safe, Stay Healthy, Stay Sanitized
                 </SMS_SEND>
                 </SMSLIST>
              </SENDBATCH>
           </XML>`;

          console.log(body);
         
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

module.exports = { getSMSHandler, upload };
