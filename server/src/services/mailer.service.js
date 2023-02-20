// @see https://blog.logrocket.com/send-emails-nodejs-nodemailer/
import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import configs from '../configs.js';
import LogUtils from '../utils/LogUtils.js';

const mailerService = configs.mailer.service;
const mailerUsername = configs.mailer.user;
const mailerPassword = configs.mailer.pass;

// initialize nodemailer
const transporter = createTransport({
  service: mailerService,
  auth: { user: mailerUsername, pass: mailerPassword }
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

export const sendMailSync = async (receiver, subject, templateName, context, attachments) => {
  if (typeof receiver === 'string') {
    receiver = [receiver];
  }

  return transporter.sendMail({
    from: mailerUsername,
    to: receiver,
    subject,
    template: templateName,
    context,
    attachments
  });
};

// need to custom template
export const sendMail = (receiver, subject, title, content) => {
  if (typeof receiver === 'string') {
    receiver = [receiver];
  }

  const mailOptions = {
    from: configs.mailer.user, // sender address
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


export const sendWithOtpTemplate = async (receiver, otp, language = 'vi') => {
  let subject;
  let templateName = 'otp' + '.' + language;
  if (language === 'en') {
    subject = `Email verification code: ${otp}`;
  } else {
    subject = `Mã xác minh của bạn là: ${otp}`;
  }

  return sendMailSync(receiver, subject, templateName, {
    logoHref: 'https://mern-ecommerce-b848d.web.app/',
    otpCode: otp,
  }, [
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
  ]);
}

