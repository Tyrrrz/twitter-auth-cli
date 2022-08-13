import { TwitterApi } from 'twitter-api-v2';

type GenerateOauthChallengeOptions = {
  apiKey: string;
  apiSecret: string;
  callbackUrl: string;
};

type GenerateOauthChallengeResult = {
  url: string;
  requestApiKey: string;
  requestApiSecret: string;
  requestAccessToken: string;
  requestAccessSecret: string;
};

export const generateOauthChallenge = async ({
  apiKey,
  apiSecret,
  callbackUrl
}: GenerateOauthChallengeOptions) => {
  try {
    const authLink = await new TwitterApi({
      appKey: apiKey,
      appSecret: apiSecret
    }).generateAuthLink(callbackUrl);

    const result: GenerateOauthChallengeResult = {
      url: authLink.url,
      requestApiKey: apiKey,
      requestApiSecret: apiSecret,
      requestAccessToken: authLink.oauth_token,
      requestAccessSecret: authLink.oauth_token_secret
    };

    return result;
  } catch (err: any) {
    const code = typeof err.code === 'number' ? err.code : -1;

    if (code === 401) {
      throw new Error(
        `Failed to generate OAuth challenge. Make sure the provided API key and secret are correct.`
      );
    }

    if (code === 403) {
      throw new Error(
        `Failed to generate OAuth challenge. Make sure '${callbackUrl}' is added as a callback URL in your app settings.`
      );
    }

    throw new Error(`Failed to generate OAuth challenge`);
  }
};

type CompleteOauthChallengeOptions = {
  requestApiKey: string;
  requestApiSecret: string;
  requestAccessToken: string;
  requestAccessSecret: string;
  verifier: string;
};

type CompleteOauthChallengeResult = {
  accessToken: string;
  accessSecret: string;
};

export const completeOauthChallenge = async ({
  requestApiKey,
  requestApiSecret,
  requestAccessToken,
  requestAccessSecret,
  verifier
}: CompleteOauthChallengeOptions) => {
  try {
    const { accessToken, accessSecret } = await new TwitterApi({
      appKey: requestApiKey,
      appSecret: requestApiSecret,
      accessToken: requestAccessToken,
      accessSecret: requestAccessSecret
    }).login(verifier);

    const result: CompleteOauthChallengeResult = {
      accessToken,
      accessSecret
    };

    return result;
  } catch (err) {
    throw new Error(`Failed to complete OAuth challenge`);
  }
};
