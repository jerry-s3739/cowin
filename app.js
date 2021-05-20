const axios = require("axios");
const nodemailer = require("nodemailer");
const moment = require("moment");

var request = require('request');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'skelli19340@gmail.com',
    pass: 'lzmblvldjxjznyxu'
    }
});

var olddate = "20-05-2021";

function getdate(){

    var date = new Date();
    var getdate = date.getDate();

    console.log(getdate);

    var newdate = new Date(new Date(date).setDate(new Date(date).getDate() + 1));

    console.log(moment(newdate).format("DD-MM-YYYY"));
    console.log(moment(date).format("DD-MM-YYYY"));
    newdate = moment(newdate).format("DD-MM-YYYY");
    date = moment(date).format("DD-MM-YYYY");

    // if(olddate !== moment(date).format("DD-MM-YYYY")){
    //     var data = JSON.stringify({"data":[{"Date":`${date}`}]});

    //     var config = {
    //     method: 'put',
    //     url: 'https://sheetdb.io/api/v1/6a6ao6c09uzyu/Id/1',
    //     headers: { 
    //         'Content-Type': 'application/json'
    //     },
    //     data : data
    //     };

    //     axios(config)
    //     .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //         olddate = date;
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }
    

        var options = {
            'method': 'GET',
            'url': `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=486001&date=${date}`,
            'headers': {
            }
        };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        var response1 = JSON.parse(response.body);
        console.log(JSON.parse(response.body));
        console.log(response1.sessions.length);
        if(response1.sessions.length){
            console.log("TRUE");
            response1.sessions.map(result=>{
                if(result.min_age_limit === 18){
                    
                    var mailOptions = {
                        from: 'skelli19340@gmail.com',
                        to: 'keshari.ankit18@gmail.com, skelli19340@gmail.com, deepanshimishra131@gmail.com, shubhamshukla813@gmail.com',
                        subject: 'Vaccine Slot Available',
                        text: `Slot Available in ${result.address} ${result.pincode} on ${date}`
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        }
                    });

                }
            })
            }
    });

	var options = {
            'method': 'GET',
            'url': `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=486001&date=${newdate}`,
            'headers': {
            }
        };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        var response1 = JSON.parse(response.body);
        console.log(JSON.parse(response.body));
        console.log(response1.sessions.length);
        if(response1.sessions.length){
            console.log("TRUE");
            response1.sessions.map(result=>{
                if(result.min_age_limit === 18){
                    
                    var mailOptions = {
                        from: 'skelli19340@gmail.com',
                        to: 'keshari.ankit18@gmail.com, skelli19340@gmail.com, deepanshimishra131@gmail.com, shubhamshukla813@gmail.com',
                        subject: 'Vaccine Slot Available',
                        text: `Slot Available in ${result.address} ${result.pincode} on ${newdate}`
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        }
                    });

                }
            })
            }
    });
}

setInterval(() => {
    getdate();
}, 15000);
  

//keshari.ankit18@gmail.com