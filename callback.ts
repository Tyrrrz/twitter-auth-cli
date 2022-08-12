import express from 'express';

type HandleOauthCallbackOptions = {
  port: number;
  endpoint: string;
};

type HandleOauthCallbackResult = {
  verifier: string;
};

export const handleOauthCallback = ({ port, endpoint }: HandleOauthCallbackOptions) => {
  return new Promise<HandleOauthCallbackResult>((resolve, reject) => {
    const app = express();

    app.get(endpoint, (req, res) => {
      const verifier = req.query.oauth_verifier?.toString();

      if (verifier) {
        resolve({ verifier });
      } else {
        reject(new Error(`Could not retrieve 'oauth_verifier' from query`));
      }

      res.end('Callback processed. You can now return to the terminal.');
    });

    app.listen(port);
  });
};
