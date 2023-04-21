const AWS = require('aws-sdk');

const ses = new AWS.SES();

const BaseConnector = require('./BaseConnector');
const templateHelper = require('../helpers/template');

const fromEmail = process.env.FROM_EMAIL;

class EmailConnector extends BaseConnector {
    async send(options) {
      const  {
          subject,
          recipients,
          replyToAddresses = [],
      } = options;

      const content = await templateHelper.generateTemplateContent(options);
  
      const params = {
        Source: fromEmail,
        Destination: {
          ToAddresses: recipients.map(recipient => recipient.email),
        },
        ReplyToAddresses: replyToAddresses,
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: content,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          }
        },
      };
  
      return ses.sendEmail(params).promise();
    }
    
}

module.exports = EmailConnector;