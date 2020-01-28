const chai = require('chai');
const expect = chai.expect;
const queryString = require('querystring');
const emailService = require('./email.service.js');
const emailCtrl = require('./email.controller');

describe('deliver', () => {
  afterEach(() => (emailService.testModeDeliveries = []));

  it('delivers the email', async () => {
    await emailService.deliver({
      to: 'to-y to',
      from: 'from-y from',
      subject: 'subject-y subject',
      text: 'texty text',
      html: 'htmly html'
    });
    const payload = queryString.parse(
      emailService.testModeDeliveries[0].payload
    );
    expect(payload.from).to.eq('from-y from');
    expect(payload.to).to.eq('to-y to');
    expect(payload.subject).to.eq('subject-y subject');
    expect(payload.text).to.eq('texty text');
    expect(payload.html).to.eq('htmly html');
  });
});

describe('sendEmail', () => {
  describe('validate', () => {
    it('throws an error when email format is wrong', async () => {
      try {
        await emailCtrl.validate({
          to_name: '',
          to: 'nachomama@aol',
          body: ''
        });
      } catch (err) {
        expect(err.errors).to.include('Email format is invalid');
        expect(err.errors).to.include('To name cannot be blank');
        expect(err.errors).to.include('Email body cannot be blank');
        return;
      }
    });
  });
});
