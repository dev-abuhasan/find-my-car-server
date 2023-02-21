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


export const sendCarCreateEmail = (to, data) => {
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
    subject: 'Find your car || Car Create Success!',
    html: `
    <div
    style="max-width: 700px; margin:auto;  border-radius: 10px; border:3px solid #929292; padding: 30px 20px; font-size: 110%;">
    <div style="text-align: center">
      <h1 style="color: #f36e16;">Find Your🥰Car</h1>
      <h4 style="text-align: center;">Congratulations! Car Create Success</h4>
    </div>
    <div div style="text-align: center;">
      <div style="max-width: 100%;">
        <table
            style="border-collapse:collapse;width:100%;border-top:1px solid #dddddd;border-left:1px solid #dddddd;margin-bottom:20px">
            <thead>
                <tr>
                    <td
                        style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222">
                        Car</td>
                    <td
                        style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222">
                        Brand</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td
                        style='font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px'>
                        <img style='width:40px;' src='${data.image}' alt='' />
                    </td>
                    <td
                        style='font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px'>
                        ${data.brand}
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px"
                        colspan="1"><b>Model</b></td>
                    <td
                        style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px">
                        ${data?.model}
                    </td>
                </tr>
                <tr>
                  <td style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px"
                      colspan="1"><b>Year</b></td>
                  <td
                      style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px">
                      ${data?.year}
                      </br>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px"
                      colspan="1"><b>Price</b></td>
                  <td
                      style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px">
                      ${data?.price}
                      </br>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px"
                      colspan="1"><b>Seats</b></td>
                  <td
                      style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px">
                      ${data?.seats}
                      </br>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px"
                      colspan="1"><b>Categories</b></td>
                  <td
                      style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px">
                      ${data?.categories}
                      </br>
                  </td>
                </tr>
            </tfoot>
        </table>
      </div>
    </div>
  </div> `,
  };

  const emailSend = transporter.sendMail(mailOptions);
  if (!emailSend) {
    res.status(400);
    throw new Error('Something went wrong');
  }
};

export const sendCarUpdateEmail = (to, data) => {
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
    subject: 'Find your car || Car Update Success!',
    html: `
    <div
    style="max-width: 700px; margin:auto;  border-radius: 10px; border:3px solid #929292; padding: 30px 20px; font-size: 110%;">
    <div style="text-align: center">
      <h1 style="color: #f36e16;">Find Your🥰Car</h1>
      <h4 style="text-align: center;">Congratulations! Car Update Success</h4>
    </div>
    <div div style="text-align: center;">
      <div style="max-width: 100%;">
        <table
            style="border-collapse:collapse;width:100%;border-top:1px solid #dddddd;border-left:1px solid #dddddd;margin-bottom:20px">
            <thead>
                <tr>
                    <td
                        style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222">
                        Car</td>
                    <td
                        style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;background-color:#efefef;font-weight:bold;text-align:center;padding:7px;color:#222222">
                        Brand</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td
                        style='font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px'>
                        <img style='width:40px;' src='${data.image}' alt='' />
                    </td>
                    <td
                        style='font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px'>
                        ${data.brand}
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px"
                        colspan="1"><b>Model</b></td>
                    <td
                        style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px">
                        ${data?.model}
                    </td>
                </tr>
                <tr>
                  <td style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px"
                      colspan="1"><b>Year</b></td>
                  <td
                      style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px">
                      ${data?.year}
                      </br>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px"
                      colspan="1"><b>Price</b></td>
                  <td
                      style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px">
                      ${data?.price}
                      </br>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px"
                      colspan="1"><b>Seats</b></td>
                  <td
                      style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px">
                      ${data?.seats}
                      </br>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px"
                      colspan="1"><b>Categories</b></td>
                  <td
                      style="font-size:12px;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;text-align:left;padding:7px">
                      ${data?.categories}
                      </br>
                  </td>
                </tr>
            </tfoot>
        </table>
      </div>
    </div>
  </div> `,
  };

  const emailSend = transporter.sendMail(mailOptions);
  if (!emailSend) {
    res.status(400);
    throw new Error('Something went wrong');
  }
};

export const sendCarDeleteEmail = (to, data) => {
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
    subject: 'Find your car || Car Delete Success!',
    html: `
    <div
    style="max-width: 700px; margin:auto;  border-radius: 10px; border:3px solid #929292; padding: 30px 20px; font-size: 110%;">
    <div style="text-align: center">
      <h1 style="color: #f36e16;">Find Your🥰Car</h1>
      <h4 style="text-align: center;">Congratulations! Car Delete Success</h4>
    </div>
    <div div style="text-align: center;">
      <div style="max-width: 100%;">
        <h3> ID: ${data}</h3>
      </div>
    </div>
  </div> `,
  };

  const emailSend = transporter.sendMail(mailOptions);
  if (!emailSend) {
    res.status(400);
    throw new Error('Something went wrong');
  }
};