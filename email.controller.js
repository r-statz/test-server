const emailService = require('./email.service');

exports.sendEmail = async (req, res, next) => {
  const {
    body: { toName, toEmail, subject, body }
  } = req;

  const errors = await exports.validate({ toName, toEmail, body });
  if (errors.length) {
    const error = new Error(`Record Invalid: ${errors.join(',')}`);
    error.errors = errors;
    throw error;
  }
  const from_name = `Mailgun Sandbox`;
  const from = `postmaster@sandboxc964dd1f50b9420bb1b0aca0d9e84ecb.mailgun.org`;

  //sg variables
  // const from_name = `Howdy Doody`;
  // const from = `road_jerky@hotmail.com`;

  try {
    const message = {
      to_name: toName,
      to: toEmail,
      from_name: from_name,
      from: from,
      subject: subject,
      text: `Hello ${to_name}, ${body}`,
      html: `<p>Hello ${to_name},</p></br><p>${body}</p>`
    };

    await emailService.deliver(message);
    res.send(`Your email has been sent!`);
  } catch (e) {
    console.log(e, 'e');
    res.status(422).json({ error: 'Could not send the email' });
  }
};

exports.validate = async ({ toName, toEmail, body }) => {
  const errors = [];
  if (!body.length) errors.push('Email body cannot be blank');
  if (!toName || !toName.trim()) errors.push('To name cannot be blank');
  if (!toEmail || !toEmail.trim()) errors.push('To email cannot be blank');
  if (toEmail && !toEmail.match(/^.+@.+\..+$/)) errors.push('Email format is invalid');
  console.log(errors, 'errors');
  return errors;
};
