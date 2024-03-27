# serverless
# Email Verification Cloud Function

This Cloud Function is designed to handle the email verification process for user accounts. It sends a verification email containing a unique link to the user's email address upon receiving a Pub/Sub message. The email link expires after 2 minutes.

## Prerequisites

Before using this Cloud Function, ensure you have the following:

- Google Cloud Platform (GCP) account
- Mailgun account for sending emails
- Node.js installed on your local machine
- Access to a CloudSQL database

## Installation

1. Set up environment variables:

- DB_NAME: Name of your MySQL database
- DB_USER: MySQL database username
- DB_PASSWORD: MySQL database password
- DB_HOST: MySQL database host
- DB_PORT: MySQL database port
- MAILGUN_API_KEY: API key for Mailgun
- MAILGUN_DOMAIN: Domain configured in Mailgun


2. Usage

Deploy the Cloud Function to Google Cloud Platform.

Ensure Pub/Sub is configured to trigger the Cloud Function when a message is published to the specified topic (helloPubSub).

When a user requests email verification, publish a message to the Pub/Sub topic with the user's email address in the payload.

3.Configuration

Modify the email content and sender details in the Cloud Function code as per your requirements.

Adjust the expiration time for the verification link according to your application's needs.