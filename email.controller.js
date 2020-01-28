const emailService = require('./email.service');

exports.sendEmail = async (req, res, next) => {
  const {
    body: { toName, toEmail, subject, noun1, noun2, adjective1, adjective2 }
  } = req;

  const errors = await exports.validate({
    toName,
    toEmail,
    noun1,
    noun2,
    adjective1,
    adjective2
  });
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
      // text: `Hello ${toName}, ${body}</br> This message was sent to you by ${from_name}`,
      text: `Hello ${toName}, Here is a custom fortune for you: A dubious ${noun1} may be an enemy in camoflage and a ${adjective1}, smart, ${adjective2} person will be coming into your ${noun2}. This message was sent to you by ${from_name}`,
      // html: `<p>Hello ${toName},</p></br><p>${body}</p></br> This message was sent to you by ${from_name}`
      html: `<p>Hello ${toName},</p></br><p> Here is a custom fortune for you:</p></br><p>A dubious ${noun1} may be an enemy in camoflage and a ${adjective1}, smart, and ${adjective2} person will be coming into your ${noun2}.</p></br><p> This message was sent to you by ${from_name}</p>`
    };

    await emailService.deliver(message);
    res.send(`Your email has been sent!`);
  } catch (e) {
    console.log(e, 'e');
    res.status(422).json({ error: 'Could not send the email' });
  }
};

exports.validate = async ({
  toName,
  toEmail,
  noun1,
  noun2,
  adjective1,
  adjective2
}) => {
  const errors = [];
  if (
    !noun1.length ||
    !noun2.length ||
    !adjective1.length ||
    !adjective2.length
  )
    errors.push('All of the fields are requireds');
  // if (!body.length) errors.push('Email body cannot be blank');
  if (!toName || !toName.trim()) errors.push('To name cannot be blank');
  if (!toEmail || !toEmail.trim()) errors.push('To email cannot be blank');
  if (toEmail && !toEmail.match(/^.+@.+\..+$/))
    errors.push('Email format is invalid');
  console.log(errors, 'errors');
  return errors;
};
