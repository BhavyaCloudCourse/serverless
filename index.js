const functions = require('@google-cloud/functions-framework');
const moment = require('moment');
const crypto = require('crypto');
const mailgun = require('mailgun-js')({
  apiKey: '240bbcedec04969dcbe897349c5cd945-309b0ef4-64054532',
  domain: 'mail.csye6225-bhavya-prakash.me'
});
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
});


functions.cloudEvent('helloPubSub', async (cloudEvent) => {
  try{
    const pubSubMessage = cloudEvent.data.message.data;
    const userData = JSON.parse(Buffer.from(pubSubMessage, 'base64').toString());

    const userEmail = userData.email;
    console.log(userEmail);

    const token = crypto.randomBytes(20).toString('hex');
    
    const data = {
      from: "Webapp <webapp@mail.csye6225-bhavya-prakash.me>",
      to: userEmail,
      subject: "Verify Email Address",
      template: "verify-email-get-request",
	    'h:X-Mailgun-Variables': JSON.stringify({
       token: token
      })
    };
    
    // Send the email
    const result = await mailgun.messages().send(data);
    console.log('Email sent:', result);


    //Insert token timestamp 
    const tokenExpiry = moment().add(2, 'minutes').toDate();
    await sequelize.sync({ alter: true });
    await sequelize.query("UPDATE Users SET verificationToken = :token, tokenExpiry = :tokenExpiry WHERE username = :userEmail", {replacements: { token: token, tokenExpiry: tokenExpiry, userEmail: userEmail }});
    
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
});

