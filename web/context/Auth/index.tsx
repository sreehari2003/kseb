import { useRouter } from 'next/router';
import React, { createContext, useState, useMemo, useEffect } from 'react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { Child } from '@app/types';
import { surakshaAPI } from '@app/config';

interface IAuth {
  data: Record<string, any> | null;
  setUserData: React.Dispatch<Record<string, any> | null>;
  isAuth: boolean;
}

export const AuthCtx = createContext({} as IAuth);

const UN_PROTECTED_PATH = '/dashboard/profile';

export const AuthCtxWrapper = ({ children }: Child) => {
  const [data, setUserData] = useState<Record<string, any> | null>(null);
  const session = useSessionContext();
  const router = useRouter();
  const { doesSessionExist } = session as any;

  // derived type
  const isAuth = !!data;

  const getData = async () => {
    try {
      const { data: response } = await surakshaAPI.get('/officials');
      if (!response.ok) {
        throw new Error();
      }

      if (response.ok && response.data.length === 0) {
        localStorage.removeItem('isWizardCompleted');
        router.push('/dashboard/profile');
      }
      if (response.ok && response.data) {
        // setting the info about the wizard in localstorage so that we can access it in supertokens redirection
        setUserData(response.data);
        localStorage.setItem('isWizardCompleted', 'YES');
        router.push('/dashboard');
      }
    } catch {
      router.push('/auth');
    }
  };

  useEffect(() => {
    if (doesSessionExist) {
      getData();
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doesSessionExist]);
  useEffect(() => {
    const path = router.pathname;
    if (doesSessionExist && !isAuth && path !== UN_PROTECTED_PATH) {
      router.push('/dashboard/profile');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, router.pathname]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const values = useMemo(() => ({ data, setUserData, isAuth }), [data]);

  return <AuthCtx.Provider value={values}>{children}</AuthCtx.Provider>;
};
