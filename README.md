# Running
- Make sure you have Node v11 or greater
- Run `npm install`
- localhost:8000 (Postman  POST to `localhost:8000/api/email`=> body: `{"to_name": "Name", "to": "whitelisted@email", "subject": "SUBJECT",  "noun1": "noun1", "noun2": "noun2", "adjective1": "adjective1", "adjective2": "adjective2"}`)
- heroku (Postman POST to `https://statz-server.herokuapp.com/api/email` => body: `{"to_name": "Name", "to": "whitelisted@email", "subject": "SUBJECT", "noun1": "noun1", "noun2": "noun2", "adjective1": "adjective1", "adjective2": "adjective2"}`)

# Dependencies
- I used body-parser to handle incoming requests from the client code
- I used cors to enable cross origin communication
- I used dotenv so I could stash sensitive data(i.e. apiKeys)
- I used nodemon because nobody wants to fire up the project manually after each tweak of the code
- I brought in mocha and chai to do the testing with nodejs
- I also installed sinon and supertest thinking I would need them and then didn't

# Testing
To test the email service:
  1) copy and paste these config vars in the terminal prior to running npm test:
      export MAILGUN_API_KEY=ABC123
      export MAILGUN_DOMAIN=mail.test.host

  2) comment in lines 9-12 in email.service.js before running tests.

  Notes on testing: I would have liked to test the controller by setting up a mockrequest with req, but ran out of time. 

# Validation
- I made a validation function to make sure the to_name, to(email), and body were filled in and the email is the correct format.
- For Mailgun, the from and from_name are hard coded with their domain and name


# Email sevices
Mailgun (default service):
- I made an account at Mailgun, was super easy to get an API_KEY and set up a domain. Both of these variables are hidden in the .env (and also configured on heroku). In order to receive emails, I had to whitelist my email address(and those of others) and then confirm via that email account that I wanted to receive emails from mailgun. I imagine I will have to whitelist any future tester's(YOUR) email in order for this code to work. (UNLESS: I add my credit card to Mailgun's site as free plans without credit cards have limitations)

Sendgrid (backup service):
- To activate Sendgrid code, comment out lines 24-27 and comment in lines 28-30
- I was able to sign up for an account and followed all the instructions, and had it working until I accidentally exposed an API_KEY on github(oh, the horrors!), and now I'm waiting on them to re-authorize my account.
- I did sendgrid addon on heroku (heroku addons:create sendgrid:starter)

# Production
- `https://statz-server.herokuapp.com/`
I realize that publishing the code was not necessarily a part of the exercise, but in troubleshooting Sendgrid domain situation, I ended up deploying both the client and server to heroku. 

# Errors
- To view production serverside logs, run `heroku logs -t`

# Improvements
- Ideally the file structure is less flat, there is a global testing suite in place, a db connected etc.
- I learned a lot about domains and DNS record during this project, mainly how to "point" to locations. I had never added a custom domain to heroku, nor configured an addon, so that was really fun.
- I learned how to navigate Mailgun's UI, Sendgrid's UI, and GoDaddy's UI
- I learned a bit about how messages get flagged as spam and how to avoid that pitfall
- I had a lot of fun working on this, but I'm totally bummed at my sendgrid failure!