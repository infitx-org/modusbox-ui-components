# Button

Renders a button.

### Proptypes

|       Name      |   Type   |               Description                | Optional |                                 Values                                |   Default   |
|-----------------|----------|------------------------------------------|----------|-----------------------------------------------------------------------|-------------|
| classname       | `string` | defines the HTML classname               | x        |                                                                       | `undefined` |
| style           | `object` | defines the HTML style                   | x        |                                                                       | `undefined` |
| kind            | `string` | defines the apperance                    | x        | _primary, secondary, tertiary, success, danger, warning, dark, light_ | `undefined`   |
| size            | `number` | defines the size                         |          |                                                                       | 24          |
| icon            | `string` | defines the icon name to use             | x        |                                                                       | `undefined` |
| disabled        | `bool`   | defines if the button should be disabled | x        |                                                                       | `false`     |
| onClick         | `func`   | defines the input _onclick_ function     |          |                                                                       | `undefined` |
| tooltip         | `string` | defines the tooltip text content         |          |                                                                       | `undefined` |
| tooltipPosition | `string` | defines the tooltip positition           |          |                                                                       | `undefined` |
