const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function mail(email, key) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    console.log("key: " + key)
    
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 25,
        secure: false, // true for 465, false for other ports
        tls: {
            rejectUnauthorized:false        
        }
    }, );


    // send mail with defined transport object
    let info = await transporter.sendMail({
        to: email, // list of receivers
        subject: 'Hello', // Subject line
        text: 'validation key: <' + key + '>' // plain text body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = mail