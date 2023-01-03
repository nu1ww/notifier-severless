# Serverless Notifier

## Introduction

> This repository contains [Serverless](https://www.serverless.com/) lambda which can be host in AWS environment for handling **_Email, SMS, Push Notifications_**. 

> This lambda will automatically trigger based on the SQS messages. This will consume SQS messages and send relevant notification based on the notification type.

## Installation

Initially clone the project from this repository.
```sh
$ https://github.com/nu1ww/notifier-severless.git
```

Please refer following steps to run the project in local or development environment.

**Configure AWS Credentials**

Please add following AWS credentials to `.bashrc` file or run directly in the terminal instance.
```sh
export AWS_ACCESS_KEY_ID="<Your Access Key Id>"
export AWS_SECRET_ACCESS_KEY="<Your Access Key>"
export AWS_DEFAULT_REGION="<Used AWS Region>"
```

First clone the project form this repository then run following commands.

**Install Serverless**
```sh
$ npm i serverless -g --save
```

For deploying the code please execute following command.
```sh
$ serverless deploy
```
or you can run this with stage (Ex - prod)
```sh
$ serverless deploy --stage production
```

## Code/Folder Structure
This application contains following code/folder structure.
* `.serverless/` – temporary location for storing serverless cache and state files
* `connectors/` – contains all the 3rd party communication channels (Ex - Email, SMS) related logics
* `helpers/` – contains reusable logics
* `services/` – contains services which initiate data processing
* `handler.js` – initializes the app and glues everything together
* `package.json` – remembers all packages that app depends on and their versions
* `serverless.yml` – serverless framework's YML based configuration file