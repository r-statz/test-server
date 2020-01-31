const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
// const sgMail = require('@sendgrid/mail');
// const sgApiKey = process.env.SENDGRID_API_KEY;
// sgMail.setApiKey(sgApiKey);

const mailgun = require('mailgun-js')({
  apiKey,
  domain
  // testMode: true,
  // testModeLogger: (httpOptions, payload, form) => {
  //   exports.testModeDeliveries.push({ httpOptions, payload, form })
  // }
});

exports.deliver = ({ to, from, subject, text, html }) => {
  const messageData = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html
  };

  return mailgun.messages().send(messageData, function(error, body) {
    console.log(body, "body")
      if (error) {
        console.log(error.response.body.errors, 'error');
      }
    });

  // return sgMail.send(messageData, function(error, body) {
  //   if (error) {
  //     console.log(error.response.body.errors, 'error');
  //   }
  // });
};

exports.mailgun = mailgun;
exports.testModeDeliveries = [];
