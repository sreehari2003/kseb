import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';
import { ENV } from '@app/config';

export const authConfig = () => ({
  appInfo: {
    appName: 'kseb',
    apiDomain: ENV.api_base_path,
    websiteDomain: ENV.website_base_path,
    apiBasePath: '/otp',
    websiteBasePath: '/auth',
  },
  recipeList: [
    Passwordless.init({
      contactMethod: 'PHONE',
    }),
    Session.init(),
  ],
});
