# Modal

Renders a Modal.

### Proptypes

|       Name      |   Type   |               Description               | Optional |           Values           |   Default   |
|-----------------|----------|-----------------------------------------|----------|----------------------------|-------------|
| kind            | `string` | defines the apperance                   |          | _danger, warning, primary_ | `primary`   |
| isSubmitPending | `bool`   | defines if the submit button is pending |          |                            | `false`     |
| isCloseEnabled  | `bool`   | defines if the close button is enabled  |          |                            | `true`      |
| isCancelEnabled | `bool`   | defines if the cancel button is enabled |          |                            | `false`     |
| isSubmitEnabled | `bool`   | defines if the submit button is enabled |          |                            | `undefined` |
| isUndoEnabled   | `bool`   | defines if the undo button is enabled   |          |                            | `undefined` |
| allowClose      | `bool`   | defines if the close button is visible  |          |                            | `true`      |
| allowCancel     | `bool`   | defines if the cancel button is visible |          |                            | `false`     |
| allowSubmit     | `bool`   | defines if the submit button is visible |          |                            | `undefined` |
| allowUndo       | `bool`   | defines if the undo button is visible   |          |                            | `undefined` |
| noFooter        | `bool`   | defines if the footer is visible        |          |                            | `false`     |
| onClose         | `func`   | defines the close function              |          |                            | `undefined` |
| onUndo          | `func`   | defines the undo function               |          |                            | `undefined` |
| onCancel        | `func`   | defines the cancel function             |          |                            | `undefined` |
| onSubmit        | `func`   | defines the submit function             |          |                            | `undefined` |
| primaryAction   | `string` | defines submit button label             |          |                            | `Submit`    |
| flex            | `bool`   | defines whether display in flexbox      |          |                            | `false`     |
| tabbed          | `bool`   | defines whether has the tabs menu       |          |                            | `false`     |
| maximise        | `bool`   | defines if should get the whole height  |          |                            | `false`     |
| children        | `node`   | defines the content                     |          |                            | `undefined` |
| width           | `string` | defines the width                       |          |                            | `600`       |
| title           | `string` | defines the title                       |          |                            | `''`        |
| submitButtonId  | `string` | defines the submit button id            |          |                            | `''`        |
