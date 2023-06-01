import Router, { useRouter } from 'next/router';
import React, { createContext, useState, useMemo, useEffect } from 'react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { Child } from '@app/types';
import { surakshaAPI } from '@app/config';

interface IAuth {
  isUserLoading: boolean;
  data: Record<string, any> | null;
  setUserData: React.Dispatch<Record<string, any> | null>;
}

export const AuthCtx = createContext({} as IAuth);

export const AuthCtxWrapper = ({ children }: Child) => {
  const [isUserLoading, setUserLoading] = useState<boolean>(false);
  const [data, setUserData] = useState<Record<string, any> | null>(null);
  const session = useSessionContext();
  const router = useRouter();
  const { doesSessionExist } = session as any;

  // listening for route change events
  Router.events.on('routeChangeStart', () => {
    // when route change loading screen popup
    setUserLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setUserLoading(false);
  });

  const getData = async () => {
    try {
      setUserLoading(true);
      const { data: response } = await surakshaAPI.get('/users/profile');
      if (!response.success) {
        throw new Error();
      }

      if (response.success && response.data === null) {
        localStorage.removeItem('isWizardCompleted');
        router.push('/wizard');
      }
      if (response.success && response.data) {
        // setting the info about the wizard in localstorage so that we can access it in supertokens redirection
        setUserData(response.data);
        localStorage.setItem('isWizardCompleted', 'YES');
        router.push('/profile');
      }
    } catch {
      router.push('/');
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    if (doesSessionExist) {
      getData();
    } else {
      setUserLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doesSessionExist]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const values = useMemo(() => ({ isUserLoading, data, setUserData }), [isUserLoading]);

  return <AuthCtx.Provider value={values}>{children}</AuthCtx.Provider>;
};
