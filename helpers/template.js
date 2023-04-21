const aws = require('aws-sdk');
const handlebars = require('handlebars');

const s3 = new aws.S3();

// Template File Extensions
const TEMPLATE_CONFIG = {
    email: { s3_prefix: "templates/email", ext: 'html' },
    push: { s3_prefix: "templates/push", ext: 'txt' },
    sms: { s3_prefix: "templates/sms", ext: 'txt' },
};

// Configs
const bucket = process.env.BUCKET || "eventsx-notifier-data-prod";

async function generateTemplateContent(options) {

    const {
        type,
        template_id: templateId,
        vars: variables
    } = options;

    const { Body: templateContent } = await s3.getObject({
        Bucket: bucket,
        Key: `${TEMPLATE_CONFIG[type].s3_prefix}/${templateId}.${TEMPLATE_CONFIG[type].ext}`
    }).promise();

    const template = handlebars.compile(templateContent.toString('utf-8'));
    const html = template(variables);

    return html;
}

module.exports = { generateTemplateContent };