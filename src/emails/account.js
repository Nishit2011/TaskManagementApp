const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendAccountConfirmationMail = (email, name) => {
  sgMail.send({
    to: email,
    from: "nranjan.2004@gmail.com",
    subject: "Task Management App",
    text: `${name} has created an account.`,
  });
};

const sendAccountDeletionMail = (email, name) => {
  sgMail.send({
    to: email,
    from: "nranjan.2004@gmail.com",
    subject: "Task Management App",
    text: `Hi ${name}. Sorry to see you go!!`,
  });
};

module.exports = { sendAccountConfirmationMail ,sendAccountDeletionMail};
