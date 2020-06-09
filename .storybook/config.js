import { addDecorator, addParameters } from '@storybook/react';
import { withConsole, setConsoleOptions } from '@storybook/addon-console';

setConsoleOptions({
  panelExclude: [],
});

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
