import type { Preview } from "@storybook/react";

import "litten/dist/assets/button.css";
import "litten/dist/assets/checkbox.css";
import "litten/dist/assets/formLabel.css";
import "litten/dist/assets/ripple.css";
import "litten/dist/assets/stackPanel.css";
import "litten/dist/assets/textField.css";
import "exception-boundary/dist/assets/exceptionBoundary.css";

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
