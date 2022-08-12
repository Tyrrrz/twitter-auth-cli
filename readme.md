# twitter-auth-cli

[![Made in Ukraine](https://img.shields.io/badge/made_in-ukraine-ffd700.svg?labelColor=0057b7)](https://vshymanskyy.github.io/StandWithUkraine)
[![Build](https://img.shields.io/github/workflow/status/Tyrrrz/twitter-auth-cli/main/master)](https://github.com/Tyrrrz/twitter-auth-cli/actions)
[![Version](https://img.shields.io/npm/v/twitter-auth-cli.svg)](http://npmjs.com/package/twitter-auth-cli)
[![Downloads](https://img.shields.io/npm/dm/twitter-auth-cli.svg)](http://npmjs.com/package/twitter-auth-cli)
[![Discord](https://img.shields.io/discord/869237470565392384?label=discord)](https://discord.gg/2SUWKFnHSm)
[![Donate](https://img.shields.io/badge/donate-$$$-8a2be2.svg)](https://tyrrrz.me/donate)
[![Fuck Russia](https://img.shields.io/badge/fuck-russia-e4181c.svg?labelColor=000000)](https://twitter.com/tyrrrz/status/1495972128977571848)

> 🟢 **Project status**: active<sup>[[?]](https://github.com/Tyrrrz/.github/blob/master/docs/project-status.md)</sup>

Simple command line utility that lets you quickly authorize an app with a Twitter account, and get the corresponding access token and secret.
Works by starting a local HTTP server that handles the OAuth callback.

This is a NodeJS-based alternative to [twitter/twurl](https://github.com/twitter/twurl) and [k0kubun/twitter-auth](https://github.com/k0kubun/twitter-auth).

## Install

- 📦 [npm](http://npmjs.com/package/twitter-auth-cli): `npm i -g twitter-auth-cli`

## Usage

In order to use this tool, you need your app's API key and secret.
You can get them from Twitter's [developer portal](https://developer.twitter.com/apps).

Then, run the tool with the following command:

```yml
twitter-auth-cli --apiKey XXXX --apiSecret YYYY
```

> **Note**:
> You can run the tool without installing it by using `npx twitter-auth-cli ...`.

This should guide you through the next steps:

```yml
-- Step 1: Enable OAuth 1.0a --
Go to https://developer.twitter.com/apps and enable OAuth 1.0a for your app.

-- Step 2: Add callback URL --
Add the following callback URL in the OAuth 1.0a settings of your app:
http://localhost:3000/

-- Step 3: Authorize the app --
Open the following URL in your browser to authorize the app:
https://api.twitter.com/oauth/authenticate?oauth_token=XXXXXXXXX
```

Open the OAuth challenge in your browser and authorize the app with your account.
After that's done, you should see the following output in the terminal:

```yml
-- Authorization successful --
Use the following credentials to access Twitter API on behalf of your account:
Access token: XXXXXXX
Access secret: YYYYYYY
```

> **Note**:
> You need to add the callback URL to your app's OAuth settings in order for this tool to work.
> If you need to change the port on which the callback server runs, you can do so with the `--port <value>` option.
