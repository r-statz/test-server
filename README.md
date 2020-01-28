# Running
- Make sure you have Node v11 or greater
- Run `npm install`
- localhost:8000 (Postman  POST to `localhost:8000/api/email`=> body: `{"to_name": "Name", "to": "whitelisted@email", "subject": "SUBJECT", "body": "BODY"}`)
- heroku (Postman POST to `https://statz-server.herokuapp.com/api/email` => body: `{"to_name": "Name", "to": "whitelisted@email", "subject": "SUBJECT", "body": "BODY"}`)

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
- I made an account at Mailgun, was super easy to get an API_KEY and set up a sandbox domain. Both of these variables are hidden in the .env (and also configured on heroku). In order to receive emails, I had to whitelist my email address and then confirm via that email account that I wanted to receive emails from mailgun. I imagine I will have to whitelist any future tester's(YOUR) email in order for this code to work.

Sendgrid (backup service):
- To activate Sendgrid code, comment out lines 24-27 and comment in lines 28-30
- I was able to sign up for an account and followed all the instructions, but unable to authenticate a domain in order to actually receive emails. When I activate the sendgrid code, I get an unauthorized error due to the domain not being whitelisted. I deployed the client code to Heroku and input statz-client.heroku.app as the domain to see if that would suffice, but alas Sendgrid wanted me to add some reports to Heroku, and when I tried that, Heroku told me I couldn't add other heroku domains. So there.
- I attempted to do a sendgrid addon on heroku (heroku addons:create sendgrid:starter), but ran into the same whitelisting issue.
- I'm sorry I didn't have time to jump through the hoops at GoDaddy.com, I feel sick to my stomach not having gotten both services up and running...


# Production
I realize that publishing the code was not necessarily a part of the exercise, but in troubleshooting Sendgrid domain situation, I ended up deploying both the client and server to heroku. 

# Improvements
- Ideally the file structure is less flat, there is a global testing suite in place, a db connected etc.
- And sendgrid would be functional. Dang you domain authentication!!!