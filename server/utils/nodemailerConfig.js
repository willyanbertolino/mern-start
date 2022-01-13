module.exports = {
  // AWS SES configurations
  host: process.env.SMTP_SERVER_NAME,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
};
