import express from 'express';
import { TwitterApi } from 'twitter-api-v2';

const port = 3000;

const appKey = process.env.TWITTER_APP_KEY;
if (!appKey) {
  throw new Error(`Environment variable 'TWITTER_APP_KEY' is not defined`);
}

const appSecret = process.env.TWITTER_APP_SECRET;
if (!appSecret) {
  throw new Error(`Environment variable 'TWITTER_APP_SECRET' is not defined`);
}

const main = async () => {
  const callbackUrl = new URL('/callback', `http://localhost:${port}`).toString();
  console.log(`Callback URL: ${callbackUrl}. Make sure this URL is added to your app settings.`);

  const authLink = await new TwitterApi({
    appKey: appKey,
    appSecret: appSecret
  }).generateAuthLink(callbackUrl);

  console.log(
    `Authorization URL: ${authLink.url}. Open this link in your browser and authorize the app with your account.`
  );

  const app = express();

  app.get('/callback', async (req, res) => {
    const token = req.query.oauth_token;
    if (!token) {
      throw new Error(`Could not retrieve 'oauth_token' from query`);
    }

    const verifier = req.query.oauth_verifier;
    if (!verifier) {
      throw new Error(`Could not retrieve 'oauth_verifier' from query`);
    }

    const { accessToken, accessSecret } = await new TwitterApi({
      appKey: appKey,
      appSecret: appSecret,
      accessToken: authLink.oauth_token,
      accessSecret: authLink.oauth_token_secret
    }).login(verifier.toString());

    console.log(`Retrieved access token: ${accessToken}`);
    console.log(`Retrieved access secret: ${accessSecret}`);

    res.status(200).json({ appKey, appSecret, accessToken, accessSecret }).end();
    process.exit(0);
  });

  app.listen(port);
};

main().catch((err) => console.error(err));
