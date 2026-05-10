import type { Preview } from '@storybook/react-vite';

import { initLittenForm } from '../src/components/inject';
import {
  commonValidationAssert,
  getDefaultHelperInfo,
} from '../src/pockets/form/validation';

import 'litten/dist/assets/button.css';
import 'litten/dist/assets/checkbox.css';
import 'litten/dist/assets/formLabel.css';
import 'litten/dist/assets/ripple.css';
import 'litten/dist/assets/stackPanel.css';
import 'litten/dist/assets/textField.css';

initLittenForm({
  commonValidationAssert: commonValidationAssert,
  getDefaultHelperInfo: getDefaultHelperInfo,
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
