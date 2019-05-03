# Select 

Renders a Select

### Proptypes

|        Name       |               Type               |                          Description                           | Optional |          Values          |   Default   |
|-------------------|----------------------------------|----------------------------------------------------------------|----------|--------------------------|-------------|
| `style`           | `object`                         | defines the HTML style                                         |          |                          | `{}`        |
| `id`              | `string`                         | defines the HTML id                                            |          |                          | `undefined` |
| `className`       | `string`                         | defines the HTML classname                                     |          |                          | `undefined` |
| `size`            | `string`                         | defines the size                                               |          | _s, m, l_                | `'l'`       |
| `placeholder`     | `string`                         | defines the placeholder                                        |          |                          | `undefined` |
| `value`           | `string`,`number`, `bool`        | defines the selected option by its value`                      |          |                          | `undefined` |
| `onClear`         | `func`                           | defines the callback function when clicking the _clear_ option |          |                          | `undefined` |
| `onChange`        | `func`                           | defines the _onchange_ function                                |          |                          | `undefined` |
| `onBlur`          | `func`                           | defines the _onblur_ function                                  |          |                          | `undefined` |
| `onFocus`         | `func`                           | defines the _onfocus_ function                                 |          |                          | `undefined` |
| `pending`         | `bool`                           | defines if the spinner should be visible                       |          |                          | `false`     |
| `required`        | `bool`                           | defines if the required style should be applied                |          |                          | `false`     |
| `invalid`         | `bool`                           | defines if the invalid style should be applied                 |          |                          | `false`     |
| `invalidMessages` | []()                             | defines the validation messages and state                      |          |                          | `[]`        |
| `disabled`        | `bool`                           | defines the HTML `disabled` attribute                          |          |                          | `false`     |
| `sortBy`          | `string`                         | defines the key to sort the options by                         |          | _label, value, disabled_ | `undefined` |
| `sortAsc`         | `bool`                           | defines the sorting direction                                  |          |                          | `undefined` |
| `sortAsc`         | `bool`                           | defines the sorting direction                                  |          |                          | `undefined` |
| `options`         | [see options](#options-proptypes) | defines the options                                            |          |                          | `undefined` |

### Options Proptypes

|   Name   |     Type    |                  Description                  | Optional | Values |   Default   |
|----------|-------------|-----------------------------------------------|----------|--------|-------------|
| disabled | `bool`      | defines whether the option should be disabled |          |        | `false`     |
| label    | `string`    | defines the option label                      |          |        | `undefined` |
| icon     | `string`    | defines the icon to render by its name        |          |        | `undefined` |
| value    | `undefined` | defines the option value                      |          |        | `undefined` |
