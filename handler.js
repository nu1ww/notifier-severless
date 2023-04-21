'use strict';

const messageService = require('./services/message')

async function handleMessage(event) {
  await messageService.handleMessages(event.Records);
};

module.exports = { handleMessage };