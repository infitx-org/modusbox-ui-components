# Button

Renders a button.

### Proptypes

|    Name   |   Type   |                    Description                    | Optional |                                 Values                                |   Default   |
|-----------|----------|---------------------------------------------------|----------|-----------------------------------------------------------------------|-------------|
| classname | `string` | defines the HTML classname                        | x        |                                                                       | `undefined` |
| id        | `string` | defines the HTML id                               | x        |                                                                       | `undefined` |
| style     | `object` | defines the HTML style                            | x        |                                                                       | `undefined` |
| kind      | `string` | defines the apperance                             |          | _primary, secondary, tertiary, success, danger, warning, dark, light_ | `primary`   |
| size      | `string` | defines the size                                  |          | _s, l, m_                                                             | `l`         |
| label     | `string` | defines the text content                          |          |                                                                       | `undefined` |
| icon      | `string` | defines the icon name to use                      | x        |                                                                       | `undefined` |
| noFill    | `bool`   | defines whether to use the transparent background | x        |                                                                       | `false`       |
| disabled  | `bool`   | defines if the button should be disabled          | x        |                                                                       | `false`            |
| pending   | `bool`   | defines if the button should show the spinner     | x        |                                                                       | `false`            |
| onClick   | `func`   | defines the input _onclick_ function              |          |                                                                       | `undefined`            |
| tooltip   | `string` | defines the tooltip text content                  |          |                                                                       | `undefined`            |
