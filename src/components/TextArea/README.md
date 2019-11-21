# TextArea 

Renders a TextArea - input type `text`.

### Proptypes


|        Name       |   Type   |                   Description                   | Optional |       Values      |   Default   |
|-------------------|----------|-------------------------------------------------|----------|-------------------|-------------|
| `autofocus`       | `bool`   | defines if should automatically get the focus   |          |                   | `false`     |
| `style`           | `object` | defines the HTML style                          |          |                   | `{}`        |
| `id`              | `string` | defines the HTML id                             |          |                   | `undefined` |
| `className`       | `string` | defines the HTML classname                      |          |                   | `undefined` |
| `size`            | `string` | defines the size                                |          | _s, m, l_         | `'l'`       |
| `placeholder`     | `string` | defines the placeholder                         |          |                   | `undefined` |
| `value`           | `string` | defines the value                               |          |                   | `undefined` |
| `buttonText`      | `string` | defines the inner button text content           |          |                   | `undefined` |
| `buttonKind`      | `string` | defines the inner button kind                   |          |                   | `undefined` |
| `buttonDisabled`  | `bool`   | defines the inner button disabled attribute     |          |                   | `false`     |
| `onButtonClick`   | `func`   | defines the inner button _onclick_ function     |          |                   | `undefined` |
| `onClick`         | `func`   | defines the _onclick_ function                  |          |                   | `undefined` |
| `onChange`        | `func`   | defines the _onchange_ function                 |          |                   | `undefined` |
| `onBlur`          | `func`   | defines the _onblur_ function                   |          |                   | `undefined` |
| `onFocus`         | `func`   | defines the _onfocus_ function                  |          |                   | `undefined` |
| `onKeyPress`      | `func`   | defines the _onkeypress_ function               |          |                   | `undefined` |
| `icon`            | `string` | defines the icon name to                        |          |                   | `undefined` |
| `pending`         | `bool`   | defines if the spinner should be visible        |          |                   | `false`     |
| `required`        | `bool`   | defines if the required style should be applied |          |                   | `false`     |
| `invalid`         | `bool`   | defines if the invalid style should be applied  |          |                   | `false`     |
| `invalidMessages` | []()     | defines the validation messages and state       |          |                   | `[]`        |
| `disabled`        | `bool`   | defines the HTML `disabled` attribute           |          |                   | `false`     |
