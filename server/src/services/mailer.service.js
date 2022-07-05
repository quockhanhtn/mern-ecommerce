// @see https://blog.logrocket.com/send-emails-nodejs-nodemailer/
import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import LogUtils from '../utils/LogUtils.js';

// initialize nodemailer
const transporter = createTransport({
  service: process.env.MAILER_SERVICE || 'gmail',
  auth: {
    user: process.env.MAILER_AUTH_USER,
    pass: process.env.MAILER_AUTH_PASS
  }
});

const templateDir = path.resolve('public/mail-template');

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: templateDir,
    defaultLayout: false
  },
  viewPath: templateDir
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions));

// need to custom template
export const sendMail = (receiver, subject, title, content) => {
  if (typeof receiver === 'string') {
    receiver = [receiver];
  }

  const mailOptions = {
    from: process.env.MAILER_AUTH_USER, // sender address
    to: receiver,
    subject,
    template: 'verification', // public/mail-template/verification.hbs
    context: {
      logoHref: 'https://mern-ecommerce-b848d.web.app/',
      description: 'Welcome to HK Mobile',
      title,
      content
    },
    attachments: [
      {
        filename: 'hk.png',
        path: `${templateDir}/img/hk.png`,
        cid: 'logo'
      },
      {
        filename: 'facebook.png',
        path: `${templateDir}/img/facebook.png`,
        cid: 'facebook'
      },
      {
        filename: 'twitter.png',
        path: `${templateDir}/img/twitter.png`,
        cid: 'twitter'
      },
      {
        filename: 'instagram.png',
        path: `${templateDir}/img/instagram.png`,
        cid: 'instagram'
      },
      {
        filename: 'github.png',
        path: `${templateDir}/img/github.png`,
        cid: 'github'
      }
    ]
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      LogUtils.error('MAILER', 'Error sending mail', err);
    } else {
      LogUtils.info('MAILER', 'Mail sent', info);
    }
  });
};
