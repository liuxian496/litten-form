import { type HelpTextProps } from './helpText.types';
import { getVisualStates } from './helpTextBase';

export const HelpText = ({ id, text }: HelpTextProps) => {
  return (
    <p id={id} className={getVisualStates()}>
      {text}
    </p>
  );
};
