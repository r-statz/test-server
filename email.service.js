const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailgun = require('mailgun-js')({
  apiKey,
  domain,
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
    // console.log(error, 'error');
    // console.log(body, "body")
  });
  // return sgMail.send(messageData, function(error, body) {
  //   console.log(error, 'error');
  // });
};

exports.mailgun = mailgun
exports.testModeDeliveries = []