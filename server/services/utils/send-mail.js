import nodemailer from 'nodemailer';
import { google } from 'googleapis';
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    ADMIN_EMAIL,
} = process.env;

const oauth2Client = new OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
);

export const sendActivationEmail = (to, url) => {
    oauth2Client.setCredentials({
        refresh_token: GOOGLE_REFRESH_TOKEN,
    });

    const accessToken = oauth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: ADMIN_EMAIL,
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            refreshToken: GOOGLE_REFRESH_TOKEN,
            accessToken,
        },
    });

    const mailOptions = {
        from: 'Dev Abu Hasan',
        to,
        subject: 'Find your car || Account Activation',
        html: `
          <div
            style="max-width: 700px; margin:auto;  border-radius: 10px; border:3px solid #929292; padding: 30px 20px; font-size: 110%;">
            <div style="text-align: center">
              <h1 style="color: #f36e16;">Find Your🥰Car</h1>
            </div>
            <h1 style="text-align: center; text-transform: uppercase;color: #4E4E4E;">Just one more step...</h1>
            <h4 style="text-align: center;">Congratulations! Just click the button below to verify your Account🥰🥰</h4>
            <div div style="text-align: center;">
              <a href="${url}"
                  style="background: #00bbae; border-radius: 5px; text-decoration: none; color: white; padding: 10px 20px; margin: 10px auto; display: inline-block;">
                  Activate Account
              </a>
            </div>
          </div>
        `,
    };

    const emailSend = transporter.sendMail(mailOptions);
    if (!emailSend) {
        res.status(400);
        throw new Error('Something went wrong');
    }
};
