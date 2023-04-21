
const EmailConnector = require('../connectors/EmailConnector');
const logger = require('../helpers/logger');

const emailConnector = new EmailConnector();

async function handleMessages(records) {
    for (const record of records) {
        await sendNotification(record.body);
    }
}

async function sendNotification(message) {
    try {
        const messageContent = JSON.parse(message);
        let response;

        switch (messageContent.type) {
            case 'email': {
                response = await emailConnector.send(messageContent);
                break;
            }
            default:
                throw new Error('Unsupported message type');
        }

        await logger.log({
            request: messageContent,
            response
        });
    } catch (error) {
        console.error('Notification Error :: ', error);

        await logger.log({
            request: messageContent,
            error
        });
    }
}

module.exports = {
    handleMessages
};