import { AuthCtx } from '@app/context/Auth';
import { useContext } from 'react';

export const useAuthCtx = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('Outside context wrapper , cant access');
  return ctx;
};
