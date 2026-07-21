import type { UserControlProps } from 'litten-hooks/dist/control/userControl/userControl.types';

export interface MounterProps extends UserControlProps {
  onDidMount: () => void;
}
