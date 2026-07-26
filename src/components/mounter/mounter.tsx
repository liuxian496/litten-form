import { useEffect } from 'react';

import type { MounterProps } from './mounter.types';

export const Mounter = ({ onDidMount }: MounterProps) => {
  useEffect(() => {
    onDidMount?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
