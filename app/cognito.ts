'use client';

import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { CookieStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

const authConfig: ResourcesConfig['Auth'] = {
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID),
  },
};

Amplify.configure({
  Auth: authConfig,
});

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());

export default function CognitoInit() {
  return null;
}
