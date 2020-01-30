const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

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

  // return mailgun.messages().send(messageData);

  return sgMail.send(messageData, function(error, body) {
    // console.log(error.response.body.errors, 'error');
  });
};

exports.mailgun = mailgun
exports.testModeDeliveries = []