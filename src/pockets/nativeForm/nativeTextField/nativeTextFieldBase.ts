import classnames from 'classnames';

const componentName = 'native-textField';

export const PartsVisualStates = {
  helpInfo: `${componentName}__helpInfo`,
};

export function getVisualStates() {
  const visualStates = classnames(componentName);

  return visualStates;
}
