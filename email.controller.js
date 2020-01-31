const emailService = require('./email.service');

exports.sendEmail = async (req, res, next) => {
  const {
    body: { toName, toEmail, subject, noun1, noun2, adjective1, adjective2 }
  } = req;

  //Sandbox testing domain for Mailgun
  // const from_name = `Mailgun Sandbox`;
  // const from = `postmaster@sandboxc964dd1f50b9420bb1b0aca0d9e84ecb.mailgun.org`;

  const from_name = `Robin Statz`;
  const from = `robinstatz@gmail.com`;

  //sg variables
  // const from_name = `Senseisams`;
  // const from = `senseisallysams@gmail.com`;

  const errors = [];
  if (
    !noun1.length ||
    !noun2.length ||
    !adjective1.length ||
    !adjective2.length
  )
    errors.push('All of the fields are required');
  if (!toName || !toName.trim()) errors.push('To name cannot be blank');
  if (!subject || !subject.trim()) errors.push('Subject cannot be blank');
  if (!toEmail || !toEmail.trim()) errors.push('To email cannot be blank');
  if (toEmail && !toEmail.match(/^.+@.+\..+$/))
    errors.push('Email format is invalid');

  if (errors.length) {
    const error = new Error(`Record Invalid: ${errors.join(',')}`);
    error.errors = errors;
    res.send({ errors: error });
  }

  try {
    const message = {
      to_name: toName,
      to: toEmail,
      from_name: from_name,
      from: from,
      subject: subject,
      text: `Hello ${toName}, Here is a custom fortune for you: A dubious ${noun1} may be an enemy in camoflage and a ${adjective1}, smart, ${adjective2} person will be coming into your ${noun2}. This message was sent to you by ${from_name}`,
      html: `<p>Hello ${toName},</p></br><p> Here is a custom fortune for you:</p></br><p>A dubious ${noun1} may be an enemy in camoflage and a ${adjective1}, smart, and ${adjective2} person will be coming into your ${noun2}.</p></br><p> This message was sent to you by ${from_name}</p>`
    };

    await emailService.deliver(message);
    res.send({ message: `Your email has been sent!` });
  } catch (e) {
    console.log(e, 'e');
  }
};
