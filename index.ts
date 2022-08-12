#! /usr/bin/env node

import { program } from 'commander';
import { handleOauthCallback } from './callback';
import { completeOauthChallenge, generateOauthChallenge } from './challenge';

const main = async () => {
  program
    .name('twitter-auth-cli')
    .version('1.0.0')
    .description('Utility that helps retrieve access token and secret for use with Twitter API.')
    .showHelpAfterError()
    .requiredOption(
      '--apiKey <key>',
      'API key generated for your application. Also sometimes known as app key or consumer key.'
    )
    .requiredOption(
      '--apiSecret <secret>',
      'API secret generated for your application. Also sometimes known as app secret or consumer secret.'
    )
    .option('--port <port>', 'Port to run the OAuth callback server on. Defaults to 3000.', '3000')
    .parse(process.argv);

  const apiKey = String(program.opts().apiKey);
  const apiSecret = String(program.opts().apiSecret);
  const port = Number(program.opts().port);

  const endpoint = '/';
  const callbackUrl = new URL(endpoint, `http://localhost:${port}`).toString();

  console.log('-- Step 1: Enable OAuth 1.0a --');
  console.log('Go to https://developer.twitter.com/apps and enable OAuth 1.0a for your app.');
  console.log();

  console.log('-- Step 2: Add callback URL --');
  console.log('Add the following callback URL in the OAuth 1.0a settings of your app:');
  console.log(callbackUrl);
  console.log();

  const oauth = await generateOauthChallenge({ apiKey, apiSecret, callbackUrl });
  console.log('-- Step 3: Authorize the app --');
  console.log('Open the following URL in your browser to authorize the app:');
  console.log(oauth.url);
  console.log();

  const { verifier } = await handleOauthCallback({ port, endpoint });
  const { accessToken, accessSecret } = await completeOauthChallenge({ ...oauth, verifier });
  console.log('-- Authorization successful --');
  console.log('Use the following credentials to access Twitter API on behalf of your account:');
  console.log('Access token:', accessToken);
  console.log('Access secret:', accessSecret);

  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
