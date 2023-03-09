import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';

export const authConfig = () => ({
  appInfo: {
    appName: 'kseb',
    apiDomain: 'http://localhost:8000',
    websiteDomain: 'http://localhost:3000',
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
