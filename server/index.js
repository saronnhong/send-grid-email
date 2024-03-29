const express = require('express'); //needed to launch server
const cors = require('cors'); //needed to disable sendgrid security
const sgMail = require('@sendgrid/mail'); //sendgrid library to send emails 

const app = express(); //alias from the express function



//sendgrid api key



app.use(cors()); //utilize Cors so the browser doesn't restrict data, without it Sendgrid will not send!
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// Welcome page of the express server 
app.get('/', (req, res) => {

    res.send("Welcome to the Sendgrid Emailing Server");

});

app.get('/send-email', (req, res) => {

    // //Get Variables from query string in the search bar
    const { recipient, sender, topic, text } = req.query; 

    // //Sendgrid Data Requirements
    const msg = {
        to: recipient, 
        from: sender,
        subject: topic,
        text: text,
    }

    // //Send Email
    sgMail.send(msg);
    // .then((msg) => console.log(msg.text));

    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // const msg = {
    //     to: 'saronnhong@gmail.com',
    //     from: 'test@example.com',
    //     subject: 'Sending with Twilio SendGrid is Fun',
    //     text: 'and easy to do anywhere, even with Node.js'
    // };
    // sgMail.send(msg);
});

// to access server run 'nodemon index.js' then click here: http://localhost:4000/
app.listen(4000, () => console.log("Running on Port 4000")); 