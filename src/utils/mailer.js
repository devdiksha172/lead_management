const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
	process.env.OAUTH_CLIENT_ID,
	process.env.OAUTH_CLIENT_SECRET,
	"https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

async function sendMail(to, subject, html) {
	const accessToken = await oAuth2Client.getAccessToken();

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: process.env.MAIL_USER,
			clientId: process.env.OAUTH_CLIENT_ID,
			clientSecret: process.env.OAUTH_CLIENT_SECRET,
			refreshToken: process.env.OAUTH_REFRESH_TOKEN,
			accessToken: accessToken.token || accessToken,
		},
	});

	const mailOptions = {
		from: `"My App" <${process.env.MAIL_USER}>`,
		to,
		subject,
		html,
	};

	await transporter.sendMail(mailOptions);
	console.log("✅ Mail sent successfully!");
}

module.exports = sendMail;
